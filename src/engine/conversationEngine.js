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

function formatAITextWithoutQuestionMark(text) {
  if (!text) return "";
  let cleaned = text.trim();
  cleaned = cleaned.replace(/\?+/g, ".");
  cleaned = cleaned.replace(/\.{2,}/g, ".");
  return cleaned;
}

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
    pilihan_awal: null,
    jalur: null, // "benar" | "miskonsepsi"
    nodeAttempts: {}, // { [nodeId]: number }
    dibantu: false,
    miskonsepsi_teratasi: false,
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
    isEnd: Boolean(startNode.isEnd),
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
      if (this.missionId === "misi_1" && Array.isArray(this.state.messages)) {
        this.state.messages = this.state.messages.map((m) => {
          if (m.imageCaption && (m.imageCaption.includes("sinar matahari") || m.imageCaption.includes("fotosintesis") || m.imageCaption.includes("subur") || m.imageCaption.includes("bingung"))) {
            return { ...m, imageCaption: null, image: m.image || "/visual_sawah_pak_budi.jpg" };
          }
          return m;
        });
      }
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      const node = this.getCurrentNode();
      this.state.currentOptions = node.options || [];
      this.state.isOpenEnded = Boolean(node.isOpenEnded);
      this.state.inputPlaceholder = node.placeholder || "Ketik analisismu di sini...";
      this.state.isEnd = Boolean(node?.isEnd);
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
    this.state.isEnd = Boolean(node.isEnd);
    if (node.mainIndex) {
      this.state.stats.currentMainIndex = node.mainIndex;
    }
    this.state.optionsDisabled = true;
    this.state.currentOptions = [];

    // Teks pertanyaan dan opsi dinamis untuk Misi 1
    let questionText = node.question;
    let resolvedOptions = node.options || [];

    if (this.missionId === "misi_1") {
      if (node.id === "m0_n3b") {
        const summary = this.state.pilihan_awal === "C"
          ? "padi memakan makhluk hidup lain"
          : "padi mendapat makanan jadi dari tanah";
        questionText = `Kamu memilih bahwa ${summary}. Mengapa kamu berpikir begitu?`;
      } else if (node.id === "m0_n6") {
        // Sesuai Diagram GBPM: jika jalur miskonsepsi, siswa jawab 'Tidak' langsung meninjau kembali pertanyaan awal (N8)
        if (this.state.jalur === "miskonsepsi") {
          resolvedOptions = [
            {
              id: "Tidak",
              text: "Tidak",
              isCorrect: true,
              next: "m0_n8"
            },
            {
              id: "Ya",
              text: "Ya",
              isWrong: true,
              next: "m0_klarifikasi_2_from_n6"
            }
          ];
        }
      } else if (node.id === "m0_n7") {
        // Konfirmasi Akhir Produsen (bisa dicapai dari Jalur Benar maupun Jalur Miskonsepsi N8)
        if (this.state.jalur === "miskonsepsi" && this.state.miskonsepsi_teratasi) {
          questionText = "Tepat sekali! Padi dapat membuat makanannya sendiri dengan bantuan cahaya matahari. Akar membantu menyerap air dan mineral dari tanah. Makhluk hidup yang dapat membuat makanannya sendiri disebut PRODUSEN. Kamu menemukan konsep pertama: PRODUSEN.";
        }
        resolvedOptions = [
          {
            id: "SELESAI",
            text: "Lihat Hasil Misi 1 & Lanjut ke Misi 2! 🏆🚀",
            next: "END"
          }
        ];
      }
    }

    const speeches = [];
    if (node.introSpeech && Array.isArray(node.introSpeech)) {
      speeches.push(...node.introSpeech);
    }
    if (questionText) {
      speeches.push(questionText);
    }

    const initialDelay = isFirstLoad ? 400 : 600;

    this._deliverSpeechQueue(speeches, 0, () => {
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      this.state.currentOptions = resolvedOptions;
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

    // Simpan pilihan awal dan jalur untuk Misi 1 jika berada di node stimulus N1
    if (this.missionId === "misi_1") {
      if (this.state.currentNodeId === "m0_start") {
        this.state.pilihan_awal = option.id;
        this.state.jalur = option.id === "A" ? "benar" : "miskonsepsi";
      } else if (this.state.currentNodeId === "m0_n8" && option.id === "A") {
        this.state.miskonsepsi_teratasi = true;
      }
    }

    // Tampilkan pilihan siswa sebagai pesan chat
    const hasMisconception = Boolean(option.misconceptionTriggered);
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: option.text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      isCorrect: !hasMisconception,
      ...(hasMisconception ? { misconceptionTriggered: option.misconceptionTriggered } : {})
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

    // Batas pengulangan (Repeat Limit) Misi 1: jika salah 2 kali di node yang sama
    const isIncorrectChoice = Boolean(option.isWrong || option.misconceptionTriggered);
    if (this.missionId === "misi_1" && this.state.currentNodeId !== "m0_start" && isIncorrectChoice) {
      const prevAttempts = this.state.nodeAttempts[this.state.currentNodeId] || 0;
      const currentAttempts = prevAttempts + 1;
      this.state.nodeAttempts[this.state.currentNodeId] = currentAttempts;

      if (currentAttempts >= 2) {
        this.state.dibantu = true;

        let advanceTarget = "m0_n6";
        if (this.state.currentNodeId === "m0_n3a" || this.state.currentNodeId === "m0_n4a" || this.state.currentNodeId === "m0_n4a_sub") {
          advanceTarget = "m0_n6";
        } else if (this.state.currentNodeId === "m0_n4b") {
          advanceTarget = "m0_n5";
        } else if (this.state.currentNodeId === "m0_n5") {
          advanceTarget = "m0_n6";
        } else if (this.state.currentNodeId === "m0_n6") {
          advanceTarget = this.state.jalur === "miskonsepsi" ? "m0_n8" : "m0_n7";
        } else if (this.state.currentNodeId === "m0_n8") {
          this.state.miskonsepsi_teratasi = true;
          advanceTarget = "m0_selesai_n8";
        }

        const strongHintMsg = {
          id: `bot_strong_hint_${Date.now()}`,
          sender: "bot",
          isHint: true,
          isAIGenerated: false,
          source: "strong_hint",
          text: "💡 [Petunjuk Kuat SOKRABOT]\nPerhatikan hubungan penting ini:\n☀️ Cahaya matahari ➔ Daun padi membuat makanannya sendiri (fotosintesis).\n🌱 Akar padi ➔ Menyerap air dan mineral dari tanah (bukan makanan jadi).\n\nKamu sudah mencoba 2 kali di langkah ini. SOKRABOT membantumu agar dapat lanjut ke langkah berikutnya! 👇",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };

        const t = setTimeout(() => {
          this.state.messages = [...this.state.messages, strongHintMsg];
          this.state.isBotTyping = false;
          this.state.optionsDisabled = false;
          this.state.currentOptions = [
            {
              id: "LANJUT_DIBANTU",
              text: "Lanjut ke Langkah Berikutnya ➡️",
              next: advanceTarget
            }
          ];
          this.emit();
        }, 700);
        this.timeoutIds.push(t);
        return;
      }
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

  _resolveOpenEndedNextNode(currentNode, isAligned) {
    if (this.missionId === "misi_1") {
      if (currentNode.id === "m0_n2") {
        return this.state.jalur === "benar" ? "m0_n3a" : "m0_n3b";
      }
      if (currentNode.id === "m0_n3b") {
        return "m0_n4b";
      }
      if (currentNode.id === "m0_pbl4_penutup") {
        return "m0_pbl5_refleksi";
      }
      if (currentNode.id === "m0_pbl5_refleksi") {
        return "m0_selesai_akhir";
      }
      return currentNode.next || (isAligned ? currentNode.nextOnAligned : currentNode.nextOnMisconception);
    }
    return isAligned
      ? (currentNode.nextOnAligned || currentNode.next)
      : (currentNode.nextOnMisconception || currentNode.next);
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

      // ── Deteksi apakah node ini adalah pertanyaan refleksi ──
      const isReflectionNode = Boolean(
        currentNode.isReflection ||
        (currentNode.title && currentNode.title.toLowerCase().includes("refleksi")) ||
        (currentNode.nextOnAligned && currentNode.nextOnMisconception && currentNode.nextOnAligned === currentNode.nextOnMisconception)
      );

      // ── Deteksi jawaban off-topic / terlalu pendek / tidak relevan ──
      const trimmedText = text.trim();
      const isOffTopic = !isReflectionNode && (
        trimmedText.length < 5 ||
        /^[^a-zA-Z0-9]+$/.test(trimmedText) ||
        /^(gak|ga|g|nggak|engga|gatau|gak tau|gk|gktau|tidak tahu|nggak tahu|idk|no|ya|iya|oke|ok)$/i.test(trimmedText)
      );

      if (isOffTopic) {
        // Jawaban tidak dikenali / di luar topik → minta ulangi dengan petunjuk
        const retryMsg = {
          id: `bot_retry_${Date.now()}`,
          sender: "bot",
          text: `Hmm, sepertinya jawabanmu masih terlalu singkat, Detektif ${studentName}! 😊\n\nCoba jelaskan dengan lebih detail ya. Perhatikan pertanyaannya dan gunakan petunjuk yang sudah ada. SOKRABOT yakin kamu bisa! 💡`,
          isAIGenerated: false,
          source: "curriculum",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };
        this.state.messages = [...this.state.messages, retryMsg];
        this.state.isBotTyping = false;
        this.state.optionsDisabled = false;
        this.emit();
        return;
      }

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
            studentAnswer: trimmedText,
            studentName,
            conversationHistory: this.state.messages.slice(-8),
            isReflection: isReflectionNode
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 45000))
        ]);

        // Balasan Socratic AI Gemini
        const isAligned = isReflectionNode
          ? true  // Refleksi selalu dianggap aligned (tidak ada benar/salah)
          : Boolean(response.isConceptAligned ?? (response.status === "correct"));

        // Perbarui status pesan jawaban siswa sebelumnya dengan hasil evaluasi AI
        if (isReflectionNode) {
          // Refleksi: tidak diberi label benar/salah
          userMsg.isCorrect = true;
          userMsg.isReflection = true;
        } else {
          userMsg.isCorrect = isAligned;
          if (!isAligned) {
            userMsg.misconceptionTriggered = response.status || "alasan_belum_tepat";
          }
        }

        const botAIMsg = {
          id: `bot_gemini_${Date.now()}`,
          sender: "bot",
          text: formatAITextWithoutQuestionMark(response.message),
          isAIGenerated: true,
          source: "gemini_ai",
          isFeedback: true,
          isCorrect: isAligned,
          isReflection: isReflectionNode,
          status: response.status,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };

        this.state.messages = [...this.state.messages, botAIMsg];
        this.state.isBotTyping = false;
        this.emit();

        if (isAligned || isReflectionNode) {
          soundManager.playCorrect();
        } else {
          this.state.stats.scaffoldVisits += 1;
          soundManager.playHint();
        }

        // Tentukan cabang berikutnya (Untuk Misi 1 tidak pernah ditentukan oleh evaluasi Gemini)
        const nextNodeId = this._resolveOpenEndedNextNode(currentNode, isAligned);

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

        // Fallback cerdas: periksa kata kunci (atau refleksi selalu positif)
        const norm = text.toLowerCase();
        const keywords = currentNode.conceptContext?.keywords || ["fotosintesis", "sendiri", "matahari"];
        const matched = isReflectionNode ? true : keywords.some((k) => norm.includes(k));

        if (isReflectionNode) {
          userMsg.isCorrect = true;
          userMsg.isReflection = true;
        } else {
          userMsg.isCorrect = matched;
          if (!matched) {
            userMsg.misconceptionTriggered = "alasan_belum_tepat";
          }
        }

        const fallbackMsg = {
          id: `bot_fb_${Date.now()}`,
          sender: "bot",
          text: isReflectionNode
            ? `Terima kasih sudah berbagi pemikiranmu, Detektif ${studentName}! 🌟 Refleksimu sangat berharga. Terus semangat belajar! ✨`
            : matched
              ? `Bagus sekali, Detektif ${studentName}! 🌟 Penjelasanmu sudah mengarah ke konsep yang tepat.`
              : `Coba pikirkan lagi ya, Detektif ${studentName}! 🤔 Perhatikan petunjuk yang sudah ada. Apa hubungan antara makhluk hidup yang satu dengan yang lainnya?`,
          isAIGenerated: false,
          source: "curriculum_fallback",
          isFeedback: true,
          isCorrect: matched,
          isReflection: isReflectionNode,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };
        this.state.messages = [...this.state.messages, fallbackMsg];
        this.emit();

        const nextNodeId = this._resolveOpenEndedNextNode(currentNode, matched);

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

    // Jika pada Misi 1 siswa mengetik di luar opsi: tidak memicu Gemini, arahkan ke tombol
    if (this.missionId === "misi_1") {
      const guideMsg = {
        id: `bot_guide_${Date.now()}`,
        sender: "bot",
        text: "Silakan pilih salah satu tombol jawaban yang tersedia di bawah ini ya, Detektif! 👇",
        isAIGenerated: false,
        source: "curriculum",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };
      this.state.messages = [...this.state.messages, guideMsg];
      this.state.isBotTyping = false;
      this.state.optionsDisabled = false;
      this.emit();
      return;
    }

    // Jika siswa bertanya sesuatu yang bebas di luar opsi (Misi 2-5): Gemini AI menjawab ramah dan mengarahkan kembali ke opsi
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
        text: `${formatAITextWithoutQuestionMark(response.message)}\n\nSekarang, coba pilih salah satu jawaban di bawah ini ya, Detektif! 👇`,
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
      this.state.isEnd = true;
      this.state.isFinished = true;
      this.state.optionsDisabled = true;

      const record = completeMission(this.missionId, {
        wrongAnswersCount: this.state.stats.wrongAnswersCount,
        hintsOpened: this.state.stats.hintsOpened,
        scaffoldVisits: this.state.stats.scaffoldVisits,
        conversationTranscript: this.state.messages || []
      });

      this.state.completedRecord = record;

      storage.saveCompletedMission(this.missionId, {
        completedMainCount: this.tree.totalMainQuestions || 1,
        hintsUsed: this.state.stats.hintsUsed,
        totalAttempts: this.state.stats.totalAttempts || 0,
        starsEarned: record?.stars_earned || 3,
        badgeEarned: this.mission.badgeReward?.name || "Detektif Sawah",
        pilihan_awal: this.state.pilihan_awal,
        jalur: this.state.jalur,
        dibantu: this.state.dibantu,
        miskonsepsi_teratasi: this.state.miskonsepsi_teratasi
      });

      this.emit();
    }, 800);
  }

  finishMission() {
    this._finishMission();
  }
}
