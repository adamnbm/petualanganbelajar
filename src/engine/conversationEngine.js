/**
 * Conversation Engine
 * Mengelola state mesin percakapan bercabang (Decision Tree / Socratic branching)
 * Murni deterministik tanpa API AI eksternal, sesuai data JSON.
 */

import { DECISION_TREE_SAWAH, getNode } from "../data/decisionTreeSawah";
import { soundManager } from "./audioEffects";
import { storage } from "../utils/storage";

export function createInitialSession(missionId = "sawah-pak-budi") {
  const tree = DECISION_TREE_SAWAH;
  const startNode = getNode(tree.startNodeId);

  return {
    missionId,
    currentNodeId: tree.startNodeId,
    messages: [], // { id, sender: 'bot' | 'user', text, isFeedback?: boolean, isCorrect?: boolean, timestamp }
    isBotTyping: false,
    currentOptions: [], // Available options for student
    optionsDisabled: false,
    stats: {
      totalMainQuestions: tree.totalMainQuestions,
      currentMainIndex: 1,
      completedMainCount: 0,
      hintsUsed: 0,
      firstTryCorrectCount: 0,
      totalAttempts: 0,
      scaffoldVisits: 0
    },
    isFinished: false,
    startedAt: new Date().toISOString()
  };
}

export class BranchingSessionController {
  constructor(missionId, onStateChange) {
    this.missionId = missionId;
    this.onStateChange = onStateChange;
    this.tree = DECISION_TREE_SAWAH;
    this.timeoutIds = [];
    this.state = createInitialSession(missionId);
  }

  // Bersihkan timer async jika unmount
  cleanup() {
    this.timeoutIds.forEach(clearTimeout);
    this.timeoutIds = [];
  }

  emit() {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
    storage.saveMissionState(this.missionId, this.state);
  }

  // Mulai atau pulihkan percakapan
  startOrResume(forceRestart = false) {
    this.cleanup();
    const saved = !forceRestart ? storage.getMissionState(this.missionId) : null;

    if (saved && saved.messages && saved.messages.length > 0 && !saved.isFinished) {
      // Pulihkan state yang tersimpan
      this.state = saved;
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      this.emit();
    } else {
      // Mulai baru
      storage.clearMissionState(this.missionId);
      this.state = createInitialSession(this.missionId);
      this.emit();
      this.presentNode(this.tree.startNodeId, true);
    }
  }

  // Menampilkan konten dari suatu node (pesan pembuka, pertanyaan, dan opsi pilihan)
  presentNode(nodeId, isFirst = false) {
    const node = getNode(nodeId);
    if (!node) return;

    this.state.currentNodeId = nodeId;
    this.state.optionsDisabled = true;
    this.state.currentOptions = [];

    // Perbarui penunjuk pertanyaan utama jika node adalah pertanyaan utama
    if (node.isMain && node.mainIndex) {
      this.state.stats.currentMainIndex = node.mainIndex;
    } else if (!node.isMain && !node.isEnd) {
      this.state.stats.scaffoldVisits += 1;
    }

    const speechesToDeliver = [];
    if (node.introSpeech && node.introSpeech.length > 0) {
      speechesToDeliver.push(...node.introSpeech);
    }
    speechesToDeliver.push(node.question);

    // Kirim pesan satu per satu dengan simulasi mengetik
    this.deliverSpeechQueue(speechesToDeliver, 0, () => {
      // Setelah semua teks selesai diucapkan bot, buka opsi jawaban
      this.state.currentOptions = node.options || [];
      this.state.optionsDisabled = false;
      this.state.isBotTyping = false;
      this.emit();
    }, isFirst ? 500 : 700);
  }

  // Mengalirkan serangkaian pesan bot dengan typing indicator yang natural
  deliverSpeechQueue(speeches, index, onComplete, initialDelay = 700) {
    if (index >= speeches.length) {
      if (onComplete) onComplete();
      return;
    }

    this.state.isBotTyping = true;
    this.emit();

    const timer = setTimeout(() => {
      const text = speeches[index];
      const botMsg = {
        id: `bot_${Date.now()}_${index}`,
        sender: "bot",
        text,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      this.state.messages = [...this.state.messages, botMsg];
      this.state.isBotTyping = index + 1 < speeches.length;
      this.emit();

      // Delay sebelum pesan berikutnya
      const nextDelay = Math.min(1200, Math.max(700, text.length * 20));
      this.deliverSpeechQueue(speeches, index + 1, onComplete, nextDelay);
    }, initialDelay);

    this.timeoutIds.push(timer);
  }

  // Ketika siswa mengklik salah satu tombol opsi (A, B, C, atau D)
  chooseOption(option) {
    if (this.state.optionsDisabled || this.state.isBotTyping) return;

    soundManager.playClick();

    // 1. Kunci tombol agar tidak bisa diklik dua kali
    this.state.optionsDisabled = true;
    this.state.stats.totalAttempts += 1;

    // 2. Tambahkan jawaban siswa ke dalam bubble obrolan sebelah kanan
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      optionId: option.id,
      text: `${option.id}. ${option.text}`,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };
    this.state.messages = [...this.state.messages, userMsg];

    // Cek currentNode
    const currentNode = getNode(this.state.currentNodeId);
    const isMainQuestion = currentNode && currentNode.isMain;

    if (option.correct) {
      if (isMainQuestion) {
        this.state.stats.completedMainCount = Math.max(
          this.state.stats.completedMainCount,
          currentNode.mainIndex
        );
        // Jika belum pernah mengunjungi scaffold untuk pertanyaan ini, hitung first-try
        if (this.state.stats.scaffoldVisits === 0 || this.state.currentNodeId === "q1_main") {
          this.state.stats.firstTryCorrectCount += 1;
        }
      }
    } else {
      this.state.stats.hintsUsed += 1;
    }

    this.emit();

    // 3. Tampilkan efek typing chatbot
    this.state.isBotTyping = true;
    this.emit();

    const feedbackDelay = 750;
    const timer = setTimeout(() => {
      // Mainkan suara sesuai benar / petunjuk
      if (option.correct) {
        soundManager.playCorrect();
      } else {
        soundManager.playHint();
      }

      // Balon feedback chatbot
      const feedbackMsg = {
        id: `feedback_${Date.now()}`,
        sender: "bot",
        text: option.feedback,
        isFeedback: true,
        isCorrect: option.correct,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };
      this.state.messages = [...this.state.messages, feedbackMsg];
      this.state.isBotTyping = false;
      this.emit();

      // 4. Lanjut ke alur berikutnya
      if (option.next === "VIEW_RESULT") {
        this.finishMission();
      } else {
        const transitionDelay = 900;
        const nextTimer = setTimeout(() => {
          this.presentNode(option.next);
        }, transitionDelay);
        this.timeoutIds.push(nextTimer);
      }
    }, feedbackDelay);

    this.timeoutIds.push(timer);
  }

  finishMission() {
    soundManager.playFanfare();
    this.state.isFinished = true;
    this.state.optionsDisabled = true;

    // Simpan ke storage bahwa misi sudah tuntas
    storage.saveCompletedMission(this.missionId, {
      completedMainCount: this.tree.totalMainQuestions,
      hintsUsed: this.state.stats.hintsUsed,
      firstTryCorrectCount: this.state.stats.firstTryCorrectCount,
      totalAttempts: this.state.stats.totalAttempts,
      badgeEarned: "Penjelajah Rantai Makanan"
    });

    this.emit();
  }
}
