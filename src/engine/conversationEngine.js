/**
 * SOKRABOT Socratic Conversation & Decision Tree Engine
 * Sesuai Dokumen GBPM: "GBPM CHATBOT SOCRATIC BERBASIS GAME.docx"
 * Memadukan Percakapan Bercabang GBPM + Analisis Penalaran Siswa oleh Live Gemini AI
 */

import { getMissionById } from "../data/missions";
import { getNode, getTreeByMissionId } from "../data/decisionTreeSawah";
import { soundManager } from "./audioEffects";
import { storage } from "../utils/storage";
import { studentSession } from "../utils/studentSession";
import {
  markMissionStarted,
  recordHintUsage,
  recordMisconception,
  completeMission,
  calculateStarsEarned
} from "../utils/sokrabotProgress";
import { sendConversationalMessage } from "../services/api";

// ─── State Awal Session ────────────────────────────────────────────────────────
export function createInitialSession(missionId) {
  const tree = getTreeByMissionId(missionId);
  const startNode = getNode(missionId, tree.startNodeId);

  return {
    missionId,
    currentNodeId: tree.startNodeId,
    messages: [],
    isBotTyping: false,
    currentOptions: startNode.options || [],
    optionsDisabled: false,
    isOpenEnded: Boolean(startNode.isOpenEnded),
    inputPlaceholder: startNode.placeholder || "Ketik analisismu di sini...",
    activeVisualHint: null,
    currentConceptH3: startNode.hintLevel3 || null,
    stats: {
      totalMainQuestions: tree.totalMainQuestions || 2,
      currentMainIndex: startNode.mainIndex || 1,
      hintsOpened: [],
      hintsUsed: 0,
      wrongAnswersCount: 0,
      currentStars: 3,
      scaffoldVisits: 0,
      misconceptionsTriggered: [],
      totalAttempts: 0
    },
    isFinished: false,
    completedRecord: null,
    startedAt: new Date().toISOString()
  };
}

// ─── Controller Percakapan Bercabang + AI Socratic ─────────────────────────────
export class BranchingSessionController {
  constructor(missionId, onStateChange) {
    this.missionId = missionId;
    this.onStateChange = onStateChange;
    this.mission = getMissionById(missionId);
    this.tree = getTreeByMissionId(missionId);
    this.timeoutIds = [];
    this.state = createInitialSession(missionId);
  }

  cleanup() {
    this.timeoutIds.forEach(clearTimeout);
    this.timeoutIds = [];
  }

  emit() {
    this.state.stats.currentStars = calculateStarsEarned({
      wrongAnswersCount: this.state.stats.wrongAnswersCount,
      hintsOpened: this.state.stats.hintsOpened,
      scaffoldVisits: this.state.stats.scaffoldVisits
    });

    const currentNode = getNode(this.missionId, this.state.currentNodeId);
    this.state.currentConceptH3 = currentNode?.hintLevel3 || null;

    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
    storage.saveMissionState(this.missionId, this.state);
  }

  getCurrentNode() {
    return getNode(this.missionId, this.state.currentNodeId);
  }

  // ── Mulai atau Lanjutkan Session ──────────────────────────────────────────
  startOrResume(forceRestart = false) {
    this.cleanup();
    markMissionStarted(this.missionId);

    const saved = !forceRestart ? storage.getMissionState(this.missionId) : null;
    const isValidSaved = saved && saved.currentNodeId && Array.isArray(saved.messages) && saved.messages.length > 0 && !saved.isFinished;

    if (isValidSaved) {
      this.state = saved;
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      const node = this.getCurrentNode();
      this.state.currentOptions = node.options || [];
      this.state.isOpenEnded = Boolean(node.isOpenEnded);
      this.state.inputPlaceholder = node.placeholder || "Ketik analisismu di sini...";
      this.emit();
    } else {
      storage.clearMissionState(this.missionId);
      this.state = createInitialSession(this.missionId);
      this.emit();
      this._presentNode(this.tree.startNodeId, true);
    }
  }

  restartSession() {
    this.cleanup();
    storage.clearMissionState(this.missionId);
    this.state = createInitialSession(this.missionId);
    this.emit();
    this._presentNode(this.tree.startNodeId, true);
  }

  // ── Menampilkan Node Percakapan ke Chat ───────────────────────────────────
  _presentNode(nodeId, isFirstLoad = false) {
    const node = getNode(this.missionId, nodeId);
    if (!node) return;

    this.state.currentNodeId = nodeId;
    if (node.mainIndex) {
      this.state.stats.currentMainIndex = node.mainIndex;
    }
    this.state.optionsDisabled = true;
    this.state.currentOptions = [];

    const speeches = [];
    if (node.introSpeech && Array.isArray(node.introSpeech)) {
      speeches.push(...node.introSpeech);
    }
    if (node.question) {
      speeches.push(node.question);
    }

    const initialDelay = isFirstLoad ? 400 : 600;

    this._deliverSpeechQueue(speeches, 0, () => {
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      this.state.currentOptions = node.options || [];
      this.state.isOpenEnded = Boolean(node.isOpenEnded);
      this.state.inputPlaceholder = node.placeholder || (node.isOpenEnded ? "Ketik alasanmu di sini, Detektif..." : "Ketik jawabanmu...");
      this.emit();

      if (node.isConceptCompleted) {
        soundManager.playCorrect();
      }
    }, initialDelay, node);
  }

  // ── Antrean Pengiriman Balon Chat dengan Delay Natural ────────────────────
  _deliverSpeechQueue(speeches, index, onComplete, initialDelay = 550, node = null) {
    if (index >= speeches.length) {
      if (onComplete) onComplete();
      return;
    }

    this.state.isBotTyping = true;
    this.emit();

    const timer = setTimeout(() => {
      const item = speeches[index];
      const isObj = typeof item === "object" && item !== null;
      const text = isObj ? item.text : item;
      const image = (isObj ? item.image : null) || (index === 0 && node ? node.image : null);
      const imageAlt = (isObj ? item.imageAlt : null) || (index === 0 && node ? node.imageAlt : null);
      const imageCaption = (isObj ? item.imageCaption : null) || (index === 0 && node ? node.imageCaption : null);

      const botMsg = {
        id: `bot_${Date.now()}_${index}`,
        sender: "bot",
        text: text || "",
        image: image || null,
        imageAlt: imageAlt || null,
        imageCaption: imageCaption || null,
        isAIGenerated: false,
        source: "curriculum",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      this.state.messages = [...this.state.messages, botMsg];
      this.state.isBotTyping = index + 1 < speeches.length;
      this.emit();

      const textLen = (text || "").length;
      const nextDelay = Math.min(1100, Math.max(500, textLen * 16));
      this._deliverSpeechQueue(speeches, index + 1, onComplete, nextDelay, node);
    }, initialDelay);

    this.timeoutIds.push(timer);
  }

  // ── Siswa Memilih Pilihan Opsi (A, B, C / Iya / Tidak) ───────────────────
  chooseOption(option) {
    if (this.state.optionsDisabled || this.state.isBotTyping) return;

    soundManager.playClick();
    this.state.optionsDisabled = true;
    this.state.stats.totalAttempts += 1;

    // Tampilkan pilihan siswa sebagai pesan chat
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: option.text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };
    this.state.messages = [...this.state.messages, userMsg];
    this.state.isBotTyping = true;
    this.emit();

    // Catat miskonsepsi jika opsi ini memicu miskonsepsi
    if (option.misconceptionTriggered) {
      recordMisconception(this.missionId, option.misconceptionTriggered);
      if (!this.state.stats.misconceptionsTriggered.includes(option.misconceptionTriggered)) {
        this.state.stats.misconceptionsTriggered.push(option.misconceptionTriggered);
      }
      this.state.stats.wrongAnswersCount += 1;
    }

    // Navigasi ke node berikutnya
    const nextId = option.next;

    if (nextId === "END") {
      const t = setTimeout(() => {
        this._finishMission();
      }, 700);
      this.timeoutIds.push(t);
      return;
    }

    const t = setTimeout(() => {
      this._presentNode(nextId);
    }, 700);
    this.timeoutIds.push(t);
  }

  // ── Siswa Mengetik Jawaban Terbuka (Dievaluasi oleh Gemini AI) ─────────────
  async submitFreeText(text) {
    if (!text || !text.trim() || this.state.optionsDisabled || this.state.isBotTyping) return;

    soundManager.playClick();
    this.state.optionsDisabled = true;
    this.state.stats.totalAttempts += 1;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };
    this.state.messages = [...this.state.messages, userMsg];
    this.state.isBotTyping = true;
    this.emit();

    const currentNode = this.getCurrentNode();
    const activeStudent = studentSession.getActiveStudent();
    const studentName = activeStudent ? activeStudent.name : "Detektif Cilik";

    // KASUS 1: Node adalah pertanyaan terbuka (isOpenEnded) -> Panggil LIVE GEMINI AI
    if (currentNode.isOpenEnded) {
      try {
        const conceptCtx = currentNode.conceptContext || {};
        const response = await Promise.race([
          sendConversationalMessage({
            missionId: this.missionId,
            conceptId: currentNode.id,
            conceptTitle: currentNode.title,
            targetUnderstanding: conceptCtx.concept || currentNode.question,
            misconceptions: (conceptCtx.misconceptions || []).map((m) => ({ id: m, keywords: [m] })),
            confirmationKeywords: conceptCtx.keywords || [],
            studentAnswer: text.trim(),
            studentName,
            conversationHistory: this.state.messages.slice(-8)
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 45000))
        ]);


        // Balasan Socratic AI Gemini
        const isAligned = Boolean(response.isConceptAligned ?? (response.status === "correct"));

        const botAIMsg = {
          id: `bot_gemini_${Date.now()}`,
          sender: "bot",
          text: response.message,
          isAIGenerated: true,
          source: "gemini_ai",
          isFeedback: true,
          isCorrect: isAligned,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };


        this.state.messages = [...this.state.messages, botAIMsg];
        this.state.isBotTyping = false;
        this.emit();

        if (isAligned) {
          soundManager.playCorrect();
        } else {
          this.state.stats.scaffoldVisits += 1;
          soundManager.playHint();
        }

        // Tentukan cabang berikutnya berdasarkan hasil evaluasi Gemini
        const nextNodeId = isAligned
          ? (currentNode.nextOnAligned || currentNode.next)
          : (currentNode.nextOnMisconception || currentNode.next);

        if (nextNodeId && nextNodeId !== "END") {
          const t = setTimeout(() => {
            this._presentNode(nextNodeId);
          }, 1200);
          this.timeoutIds.push(t);
        } else if (nextNodeId === "END") {
          const t = setTimeout(() => {
            this._finishMission();
          }, 1000);
          this.timeoutIds.push(t);
        } else {
          this.state.optionsDisabled = false;
          this.emit();
        }

      } catch (err) {
        console.error("[ConversationEngine] Gemini AI Call failed:", err);
        this.state.isBotTyping = false;
        this.state.optionsDisabled = false;

        // Fallback cerdas: periksa kata kunci
        const norm = text.toLowerCase();
        const keywords = currentNode.conceptContext?.keywords || ["fotosintesis", "sendiri", "matahari"];
        const matched = keywords.some((k) => norm.includes(k));

        const fallbackMsg = {
          id: `bot_fb_${Date.now()}`,
          sender: "bot",
          text: matched
            ? `Bagus sekali, Detektif ${studentName}! 🌟 Penjelasanmu sudah mengarah ke konsep yang tepat.`
            : `Terima kasih penjelasannya, Detektif ${studentName}! 🤔 Mari kita selidiki buktinya bersama ya!`,
          isAIGenerated: false,
          source: "curriculum_fallback",
          isFeedback: true,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };
        this.state.messages = [...this.state.messages, fallbackMsg];
        this.emit();

        const nextNodeId = matched
          ? (currentNode.nextOnAligned || currentNode.next)
          : (currentNode.nextOnMisconception || currentNode.next);

        if (nextNodeId && nextNodeId !== "END") {
          setTimeout(() => this._presentNode(nextNodeId), 1000);
        }
      }
      return;
    }

    // KASUS 2: Node memiliki pilihan opsi (A, B, C), tapi siswa mengetik
    const options = currentNode.options || [];
    const normalizedText = text.trim().toLowerCase();

    // Coba cocokkan dengan huruf A, B, C atau isi teks opsi
    const matchedOpt = options.find((opt) => {
      const optId = opt.id.toLowerCase();
      const optText = opt.text.toLowerCase();
      return (
        normalizedText === optId ||
        normalizedText.startsWith(`opsi ${optId}`) ||
        normalizedText.startsWith(`pilihan ${optId}`) ||
        optText.includes(normalizedText) ||
        normalizedText.includes(optText.substring(0, 15))
      );
    });

    if (matchedOpt) {
      this.state.isBotTyping = false;
      this.chooseOption(matchedOpt);
      return;
    }

    // Jika siswa bertanya sesuatu yang bebas di luar opsi: Gemini AI menjawab ramah dan mengarahkan kembali ke opsi
    try {
      const response = await sendConversationalMessage({
        missionId: this.missionId,
        conceptId: currentNode.id,
        conceptTitle: currentNode.title,
        targetUnderstanding: currentNode.question,
        misconceptions: [],
        confirmationKeywords: [],
        studentAnswer: text.trim(),
        studentName,
        conversationHistory: this.state.messages.slice(-6)
      });

      const guideMsg = {
        id: `bot_gemini_guide_${Date.now()}`,
        sender: "bot",
        text: `${response.message}\n\nSekarang, coba pilih salah satu jawaban di bawah ini ya, Detektif! 👇`,
        isAIGenerated: true,
        source: "gemini_ai",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };
      this.state.messages = [...this.state.messages, guideMsg];
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      this.emit();
    } catch {
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      this.emit();
    }
  }

  // ── Minta Petunjuk H1 / H2 / H3 ──────────────────────────────────────────
  requestHint(hintLevel = "h1") {
    const currentNode = this.getCurrentNode();
    if (!currentNode) return;

    recordHintUsage(this.missionId, hintLevel);
    if (!this.state.stats.hintsOpened.includes(hintLevel)) {
      this.state.stats.hintsOpened.push(hintLevel);
    }
    this.state.stats.hintsUsed += 1;
    soundManager.playHint();

    let hintText = "";
    if (hintLevel === "h1") {
      hintText = currentNode.hintLevel1 || "Perhatikan hubungan makhluk hidup dan dari mana energinya berasal.";
    } else if (hintLevel === "h2") {
      hintText = currentNode.hintLevel2 || "Perhatikan ciri khusus dan bentuk organ tubuh makhluk ini secara teliti.";
    } else if (hintLevel === "h3") {
      const h3 = currentNode.hintLevel3;
      if (h3 && typeof h3 === "object") {
        hintText = `🔍 [Diagram Visual Terbuka]: ${h3.text || h3.label}`;
        this.state.activeVisualHint = h3;
      } else {
        hintText = "Buka bagan visual ekosistem sawah untuk menemukan polanya.";
      }
    }

    const hintMsg = {
      id: `hint_${Date.now()}`,
      sender: "bot",
      isHint: true,
      isAIGenerated: false,
      source: "hint",
      hintLevel,
      text: `💡 Petunjuk ${hintLevel.toUpperCase()} SOKRABOT:\n${hintText}`,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };


    this.state.messages = [...this.state.messages, hintMsg];
    this.emit();
  }

  closeVisualHint() {
    this.state.activeVisualHint = null;
    this.emit();
  }

  // ── Selesaikan Misi ───────────────────────────────────────────────────────
  _finishMission() {
    const closingMsg = {
      id: `closing_${Date.now()}`,
      sender: "bot",
      text: "🎉 Luar biasa, Detektif Cilik! Kamu telah berhasil menuntaskan seluruh investigasi misi ini bersama SOKRABOT! Bintangmu siap dihitung...",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };
    this.state.messages = [...this.state.messages, closingMsg];
    this.emit();

    setTimeout(() => {
      soundManager.playFanfare();
      this.state.isFinished = true;
      this.state.optionsDisabled = true;

      const record = completeMission(this.missionId, {
        wrongAnswersCount: this.state.stats.wrongAnswersCount,
        hintsOpened: this.state.stats.hintsOpened,
        scaffoldVisits: this.state.stats.scaffoldVisits
      });

      this.state.completedRecord = record;

      storage.saveCompletedMission(this.missionId, {
        completedMainCount: this.tree.totalMainQuestions || 2,
        hintsUsed: this.state.stats.hintsUsed,
        totalAttempts: this.state.stats.totalAttempts || 0,
        starsEarned: record?.stars_earned || 3,
        badgeEarned: this.mission.badgeReward?.name || "Detektif Sawah"
      });

      this.emit();
    }, 800);
  }

  finishMission() {
    this._finishMission();
  }
}
