/**
 * API Client Service
 * Menangani komunikasi antara Frontend React dan Backend Express (/api)
 */

const API_BASE_URL = '/api';

export async function fetchMissions() {
  try {
    const res = await fetch(`${API_BASE_URL}/missions`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.missions || [];
  } catch (error) {
    console.error('[API Client] Gagal memuat daftar misi:', error);
    return [];
  }
}

export async function fetchMissionDetail(missionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/missions/${missionId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.mission || null;
  } catch (error) {
    console.error(`[API Client] Gagal memuat misi ${missionId}:`, error);
    return null;
  }
}

/**
 * Kirim jawaban bebas siswa ke backend Socratic AI
 * Digunakan oleh conversationEngine.js (mode percakapan terbuka)
 */
export async function sendConversationalMessage({
  missionId,
  conceptId,
  conceptTitle,
  targetUnderstanding,
  misconceptions = [],
  confirmationKeywords = [],
  studentAnswer,
  studentName = 'Detektif Cilik',
  conversationHistory = [],
  wrongCountForConcept = 0,
  hintsGiven = []
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        missionId,
        conceptId,
        conceptTitle,
        targetUnderstanding,
        misconceptions,
        confirmationKeywords,
        studentAnswer,
        studentName,
        conversationHistory,
        wrongCountForConcept,
        hintsGiven
      })
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[API Client] sendConversationalMessage error:', error);
    return {
      success: true,
      status: 'wrong',
      message: 'Hmm, SOKRABOT sedang mengalami gangguan koneksi. Coba kirim ulang jawabanmu ya! 😊',
      isConceptAligned: false,
      isConceptConfirmed: false,
      suggestedHintLevel: 0
    };
  }
}

/**
 * Legacy: Kirim pesan chat (mode lama — tetap ada untuk kompatibilitas)
 */
export async function sendChatMessage({ missionId, questionId, studentAnswer, studentName = 'Detektif Cilik', conversationHistory = [] }) {
  return sendConversationalMessage({
    missionId,
    conceptId: questionId,
    conceptTitle: 'Pertanyaan Sains',
    targetUnderstanding: '',
    studentAnswer,
    studentName,
    conversationHistory
  });
}

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

