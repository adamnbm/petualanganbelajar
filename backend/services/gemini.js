/**
 * SOKRABOT Gemini AI Service — Evaluasi Percakapan Socratic
 * Fungsi: evaluasi jawaban bebas siswa dan generate respons Socratic yang tepat.
 */

import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";

function getApiKey() {
  return process.env.GEMINI_API_KEY;
}

function getModelName() {
  return process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
}

let _aiClient = null;
function getGeminiClient() {
  const key = getApiKey();
  if (!key || key === "YOUR_GEMINI_API_KEY_HERE") {
    return null;
  }
  if (!_aiClient) {
    try {
      _aiClient = new GoogleGenAI({ apiKey: key });
    } catch (e) {
      console.warn("[Gemini] SDK init failed:", e.message);
    }
  }
  return _aiClient;
}


// ─── System Instruction Socratic SOKRABOT (Khusus Siswa SD Kelas 5-6) ────────
const SOKRABOT_SYSTEM_INSTRUCTION = `Kamu adalah SOKRABOT, robot sahabat sains (tutor AI Socratic) yang seru, ramah, dan pintar untuk anak SD kelas 5-6 (usia 10-12 tahun) di Indonesia.
Tugas utamamu: Mengapresiasi pemikiran siswa, menganalisis alasan mereka, dan memberikan umpan balik ilmiah yang ramah dan menyenangkan.

PANDUAN BAHASA KHUSUS ANAK SD:
1. Selalu bersikap ceria, hangat, penuh semangat, dan bersahabat seperti kakak pembimbing atau robot kawan bermain yang asyik.
2. Gunakan kata-kata yang mudah dipahami anak-anak. Jangan memakai kalimat yang kaku atau istilah rumit tanpa perumpamaan nyata (misal: bandingkan dengan kompor, baterai, dapur memasak, atau mainan).
3. Sapa anak dengan ramah, misalnya "Wah Detektif [Nama]!", "Hebat sekali, Detektif [Nama]!", "Keren banget!".
4. JANGAN PERNAH berkata ketus atau menyalahkan, seperti: "Salah", "Jawaban kamu keliru", "Bukan begitu".
5. ATURAN SANGAT PENTING TENTANG TANDA TANYA (?):
   - JANGAN PERNAH mengakhiri pesan dengan tanda tanya (?)!
   - JANGAN mengajukan pertanyaan baru di akhir pesan!
   - Selalu akhiri pesanmu dengan kalimat pernyataan, apresiasi, atau penguatan positif yang diakhiri tanda titik (.) atau tanda seru (!).
   - Alasan: Antarmuka aplikasi sudah memiliki alur pertanyaan berikutnya secara otomatis, sehingga pesanmu harus berfungsi sebagai penguat dan penyemangat, bukan penanya.
6. Panjang balasan: Cukup 2-3 kalimat santai dan padat. Gunakan emoji yang ramah (🌾, ☀️, 🔍, 💡, 🦉, ✨).

LOGIKA EVALUASI KONSEP:
- Bila jawaban anak BENAR dan alasannya tepat: Beri pujian antusias dan jelaskan secara singkat mengapa konsepnya tepat. Akhiri dengan tanda seru (!). Set isConceptConfirmed = true.
- Bila jawaban anak SEBAGIAN BENAR: Apresiasi ide baiknya, berikan penegasan konsep yang benar dalam bentuk pernyataan ramah. Set isConceptConfirmed = false.
- Bila anak terkena MISKONSEPSI: Berikan analogi atau fakta sederhana yang meluruskan pemahaman dalam bentuk kalimat berita/penjelasan ramah (tanpa bertanya balik). Set isConceptConfirmed = false.
- Bila anak BINGUNG atau SALAH: Berikan dorongan semangat dan petunjuk singkat dalam bentuk pernyataan. Set isConceptConfirmed = false.`;

// ─── Response Schema ─────────────────────────────────────────────────────────
const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["correct", "partial", "wrong", "misconception"],
      description: "Kualitas jawaban siswa"
    },
    message: {
      type: Type.STRING,
      description: "Respons umpan balik SOKRABOT — maksimal 2-3 kalimat pernyataan/apresiasi/penguatan. DILARANG KERAS menggunakan tanda tanya (?) di akhir pesan!"
    },
    isConceptAligned: {
      type: Type.BOOLEAN,
      description: "true jika alasan/jawaban siswa sudah sesuai dengan konsep ilmiah yang ditanyakan"
    },
    isConceptConfirmed: {
      type: Type.BOOLEAN,
      description: "true jika siswa sudah terbukti memahami konsep ini secara mandiri"
    },
    suggestedHintLevel: {
      type: Type.INTEGER,
      description: "0=tidak perlu, 1=H1, 2=H2, 3=H3 visual (berikan jika siswa tampak sangat kesulitan)"
    }
  },
  required: ["status", "message", "isConceptAligned", "isConceptConfirmed", "suggestedHintLevel"]
};

// ─── Fungsi Utama: Evaluasi Percakapan ───────────────────────────────────────
export async function evaluateConversationalAnswer({
  missionId,
  conceptId,
  conceptTitle,
  targetUnderstanding,
  misconceptions = [],
  confirmationKeywords = [],
  studentAnswer,
  studentName = "Detektif Cilik",
  conversationHistory = [],
  wrongCountForConcept = 0,
  hintsGiven = []
}) {
  const client = getGeminiClient();
  // Fallback jika API key tidak tersedia
  if (!client) {
    return evaluateConversationalFallback({
      conceptTitle,
      targetUnderstanding,
      misconceptions,
      confirmationKeywords,
      studentAnswer,
      studentName,
      wrongCountForConcept
    });
  }

  // Susun riwayat percakapan untuk konteks
  const historyContext = conversationHistory
    .slice(-8)
    .map((m) => `${m.sender === "bot" ? "SOKRABOT" : `Detektif ${studentName}`}: ${m.text}`)
    .join("\n");

  const misconceptionList = misconceptions
    .map((m) => `- Miskonsepsi "${m.id}": jika siswa menyebutkan kata-kata seperti ${m.keywords.slice(0, 3).join(", ")}`)
    .join("\n");

  const userPrompt = `
MISI: ${missionId} | KONSEP SAAT INI: ${conceptTitle}
PEMAHAMAN TARGET: ${targetUnderstanding}
MISKONSEPSI YANG HARUS DIDETEKSI:
${misconceptionList || "Tidak ada miskonsepsi spesifik."}
KATA KUNCI KONFIRMASI: ${confirmationKeywords.join(", ")}

RIWAYAT PERCAKAPAN (8 pesan terakhir):
${historyContext || "(percakapan baru dimulai)"}

JAWABAN TERBARU SISWA (Detektif ${studentName}):
"${studentAnswer}"

INFO TAMBAHAN:
- Jawaban salah untuk konsep ini: ${wrongCountForConcept} kali
- Hint yang sudah diberikan: ${hintsGiven.length > 0 ? hintsGiven.join(", ") : "Belum ada"}

TUGAS: Evaluasi alasan siswa. Hasilkan respons umpan balik yang apresiatif dan menjelaskan konsep.
PENTING: JANGAN PERNAH mengakhiri pesan dengan tanda tanya (?). Berikan apresiasi dan penguatan konsep dalam bentuk kalimat pernyataan positif!
${wrongCountForConcept >= 3 ? "CATATAN: Siswa sudah salah 3+ kali — berikan penjelasan konsep yang lebih gamblang dan menguatkan." : ""}
`;

  // Helper untuk memastikan pesan AI TIDAK diakhiri tanda tanya (?)
  function sanitizeNoQuestionEnding(text) {
    if (!text) return "";
    let cleaned = text.trim();
    cleaned = cleaned.replace(/\?+$/, "!");
    cleaned = cleaned.replace(/\?/g, ".");
    return cleaned;
  }

  // Model fallback cascade: coba model utama (flash-lite) lebih dulu, jika busy (503) otomatis coba alternatif
  const candidateModels = [
    getModelName(),
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash"
  ].filter(Boolean);
  const uniqueModels = [...new Set(candidateModels)];

  for (const modelName of uniqueModels) {
    try {
      const response = await client.models.generateContent({
        model: modelName,
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: SOKRABOT_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.65
        }
      });

      let responseText = "";
      if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        responseText = response.candidates[0].content.parts[0].text;
      } else if (typeof response?.text === "string") {
        responseText = response.text;
      } else if (typeof response?.text === "function") {
        responseText = response.text();
      }

      if (responseText) {
        const parsed = JSON.parse(responseText);
        console.log(`[Gemini] Sukses mengevaluasi via model: ${modelName}`);
        const rawMsg = parsed.message || `Wah, analisismu menarik sekali, Detektif ${studentName}! Penjelasanmu sudah dicatat dengan baik.`;
        return {
          status: parsed.status || "wrong",
          message: sanitizeNoQuestionEnding(rawMsg),
          isConceptAligned: Boolean(parsed.isConceptAligned ?? (parsed.status === "correct")),
          isConceptConfirmed: Boolean(parsed.isConceptConfirmed),
          suggestedHintLevel: parsed.suggestedHintLevel || 0
        };
      }
    } catch (err) {
      console.warn(`[Gemini] model ${modelName} call failed, trying next candidate:`, err.message || err);
    }
  }

  // Fallback ke kurikulum cerdas jika seluruh percobaan API tidak berhasil
  console.warn("[Gemini] Semua model gagal, beralih ke evaluasi fallback lokal");
  return evaluateConversationalFallback({
    conceptTitle,
    targetUnderstanding,
    misconceptions,
    confirmationKeywords,
    studentAnswer,
    studentName,
    wrongCountForConcept
  });
}



// ─── Fallback Berbasis Kata Kunci (Ramah Anak SD) ───────────────────────────
function evaluateConversationalFallback({
  conceptTitle,
  targetUnderstanding,
  misconceptions,
  confirmationKeywords,
  studentAnswer,
  studentName,
  wrongCountForConcept
}) {
  const normalized = (studentAnswer || "").toLowerCase().trim();

  // 1. Deteksi miskonsepsi
  const triggeredMisconception = misconceptions.find((m) =>
    m.keywords.some((kw) => normalized.includes(kw.toLowerCase()))
  );

  // 2. Hitung kata kunci konfirmasi yang cocok
  const matchedKeywords = confirmationKeywords.filter((kw) =>
    normalized.includes(kw.toLowerCase())
  );
  const matchRatio = matchedKeywords.length / Math.max(confirmationKeywords.length, 1);
  const isCorrect = matchRatio >= 0.35 && matchedKeywords.length >= 1;
  const isPartial = !isCorrect && matchedKeywords.length >= 1;
  const hasMisconception = !!triggeredMisconception && !isCorrect;

  const greeting = `Detektif ${studentName}`;

  if (isCorrect) {
    return {
      status: "correct",
      message: `Hebat luar biasa, ${greeting}! 🌟 Penjelasan dan analisismu jitu sekali! Kamu berhasil membuktikan pemahamanmu tentang "${conceptTitle}". Mari kita lanjut ke penyelidikan seru berikutnya! ✨`,
      isConceptConfirmed: true,
      suggestedHintLevel: 0
    };
  }

  if (hasMisconception) {
    const misconceptionResponses = {
      produsen_pemakan_pupuk: `Wah, pemikiran yang menarik, ${greeting}! 😄 Perlu diingat bahwa tanaman padi tidak memiliki mulut untuk mengunyah makanan. Pupuk dan air hanyalah bahan mineral pendukung, sedangkan makanan padi dimasak sendiri di daun melalui fotosintesis! 🌱`,
      pengurai_pemakan_tanah: `Idemu unik sekali, ${greeting}! 🍄 Jamur sebenarnya tidak memakan butiran tanah, melainkan menguraikan sisa jerami dan kayu yang telah mati menjadi nutrisi baru.`,
      panah_mulut_memakan: `Banyak yang mengira begitu juga, ${greeting}! ⚡ Namun di sains, tanda panah (➔) melambangkan perpindahan tenaga atau energi makanan dari tubuh yang dimakan menuju tubuh yang memakannya.`,
      predator_tanpa_spesifisitas: `Keren analisis rasionalmu, ${greeting}! 🦅 Bentuk paruh tajam dan cakar kuat elang memang dirancang khusus untuk memburu dan mencengkeram mangsa di alam.`,
      ular_punah_padi_mati_langsung: `Analisis yang menarik, ${greeting}! 🌾 Ingat bahwa padi dimakan oleh hama tikus, sedangkan ular adalah pemangsa alami yang bertugas mengontrol jumlah tikus agar sawah tetap aman.`,
      racun_solusi_terbaik: `Idemu cepat dipahami, ${greeting}! 🧪 Namun pestisida kimia berlebih dapat memutus rantai makanan alami dan membahayakan hewan bermanfaat lainnya di sawah.`
    };

    const respText =
      misconceptionResponses[triggeredMisconception.id] ||
      `Wah, pemikiran yang menarik, ${greeting}! Mari kita ingat kembali bahwa ${targetUnderstanding.substring(0, 90)}.`;

    return {
      status: "misconception",
      message: respText,
      isConceptConfirmed: false,
      suggestedHintLevel: wrongCountForConcept >= 2 ? 1 : 0
    };
  }

  if (isPartial) {
    const partialResponses = [
      `Jawabanmu sudah keren, ${greeting}! 💡 Kamu sudah menyebutkan "${matchedKeywords[0]}" — itu pemikiran yang tepat dan mengarah pada konsep yang benar.`,
      `Sedikit lagi tepat, ${greeting}! 🔍 Kata "${matchedKeywords[0]}" yang kamu sebutkan itu penting sekali dan membantu membuka rahasia rantai makanan ini.`,
      `Wah, kamu sudah hampir sampai, ${greeting}! 🌱 Ada pemikiran bagus di jawabanmu yang sangat mendekati konsep ilmiahnya.`
    ];
    return {
      status: "partial",
      message: partialResponses[wrongCountForConcept % partialResponses.length],
      isConceptConfirmed: false,
      suggestedHintLevel: wrongCountForConcept >= 3 ? 2 : (wrongCountForConcept >= 1 ? 1 : 0)
    };
  }

  // Jawaban salah / belum tepat
  const wrongResponses = [
    `Usaha yang bagus, ${greeting}! 🌾 Setiap pengamatan dan analisismu membawamu selangkah lebih dekat untuk mengungkap jaring kehidupan di sawah.`,
    `Tebakan yang berani, ${greeting}! 💡 Mempelajari sains memang seru karena kita bisa terus membuktikan fakta-fakta baru di alam sawah.`,
    `Tetap semangat, ${greeting}! 🔍 SOKRABOT sangat menghargai usahamu dalam menganalisis hubungan makhluk hidup ini.`
  ];

  return {
    status: "wrong",
    message: wrongResponses[wrongCountForConcept % wrongResponses.length],
    isConceptConfirmed: false,
    suggestedHintLevel: wrongCountForConcept >= 2 ? 1 : 0
  };
}

export async function checkGeminiHealth() {
  const client = getGeminiClient();
  if (!client) {
    return { mode: "Kurikulum Socratic (Offline)", model: null };
  }
  return { mode: "Live Gemini Socratic AI", model: getModelName() };
}


// ─── Legacy Export (untuk kompatibilitas route lama) ──────────────────────────
export async function evaluateAnswerWithGemini(params) {
  return evaluateConversationalAnswer({
    missionId: params.missionId || "misi_1",
    conceptId: params.conceptId || "fallback",
    conceptTitle: params.conceptTitle || params.question?.substring(0, 40) || "Konsep Sains",
    targetUnderstanding: params.expectedAnswer || params.targetUnderstanding || "",
    misconceptions: [],
    confirmationKeywords: params.acceptableKeywords || [],
    studentAnswer: params.studentAnswer || "",
    studentName: params.studentName || "Detektif",
    conversationHistory: params.conversationHistory || [],
    wrongCountForConcept: 0,
    hintsGiven: []
  });
}

export async function generateConversationalResponse(params) {
  return evaluateConversationalAnswer({
    missionId: "legacy",
    conceptId: "legacy",
    conceptTitle: params.question || "Pertanyaan Sains",
    targetUnderstanding: params.feedbackHint || "",
    misconceptions: [],
    confirmationKeywords: [],
    studentAnswer: params.studentAnswerText || "",
    studentName: params.studentName || "Detektif",
    conversationHistory: params.conversationHistory || [],
    wrongCountForConcept: 0,
    hintsGiven: []
  });
}
