export function validateChatInput(body) {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Payload tidak valid atau kosong.' };
  }

  const { missionId, questionId, studentAnswer, conversationHistory } = body;

  if (!missionId || typeof missionId !== 'string' || missionId.trim().length === 0) {
    return { isValid: false, error: 'missionId wajib diisi.' };
  }

  const sanitizedAnswer = (studentAnswer || '').trim().slice(0, 500);
  let sanitizedHistory = [];
  if (Array.isArray(conversationHistory)) {
    sanitizedHistory = conversationHistory
      .filter(item => item && typeof item.text === 'string' && (item.sender === 'bot' || item.sender === 'user'))
      .slice(-8)
      .map(item => ({ sender: item.sender, text: String(item.text).slice(0, 500) }));
  }

  const studentName = body.studentName && typeof body.studentName === 'string'
    ? body.studentName.trim().slice(0, 50)
    : 'Detektif Cilik';

  return {
    isValid: true,
    data: {
      missionId: missionId.trim(),
      questionId: (questionId || '').trim(),
      studentAnswer: sanitizedAnswer,
      studentName,
      conversationHistory: sanitizedHistory
    }
  };
}

/**
 * Validator untuk mode percakapan Socratic terbuka (free-text)
 */
export function validateConversationalInput(body) {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Payload tidak valid.' };
  }

  const { missionId, studentAnswer } = body;

  if (!missionId || typeof missionId !== 'string' || missionId.trim().length === 0) {
    return { isValid: false, error: 'missionId wajib diisi.' };
  }

  if (!studentAnswer || typeof studentAnswer !== 'string' || studentAnswer.trim().length === 0) {
    return { isValid: false, error: 'studentAnswer tidak boleh kosong.' };
  }

  const studentName = body.studentName && typeof body.studentName === 'string'
    ? body.studentName.trim().slice(0, 50)
    : 'Detektif Cilik';

  let conversationHistory = [];
  if (Array.isArray(body.conversationHistory)) {
    conversationHistory = body.conversationHistory
      .filter(item => item && typeof item.text === 'string')
      .slice(-8)
      .map(item => ({ sender: item.sender || 'user', text: String(item.text).slice(0, 400) }));
  }

  let misconceptions = [];
  if (Array.isArray(body.misconceptions)) {
    misconceptions = body.misconceptions.slice(0, 10);
  }

  let confirmationKeywords = [];
  if (Array.isArray(body.confirmationKeywords)) {
    confirmationKeywords = body.confirmationKeywords.slice(0, 20);
  }

  let hintsGiven = [];
  if (Array.isArray(body.hintsGiven)) {
    hintsGiven = body.hintsGiven.slice(0, 5);
  }

  return {
    isValid: true,
    data: {
      missionId: missionId.trim(),
      conceptId: (body.conceptId || 'concept_1').trim(),
      conceptTitle: (body.conceptTitle || 'Konsep Sains').trim().slice(0, 100),
      targetUnderstanding: (body.targetUnderstanding || '').trim().slice(0, 600),
      misconceptions,
      confirmationKeywords,
      studentAnswer: studentAnswer.trim().slice(0, 500),
      studentName,
      conversationHistory,
      wrongCountForConcept: Math.min(Number(body.wrongCountForConcept) || 0, 10),
      hintsGiven
    }
  };
}

export function validateGeminiResponse(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;

  const status = ['correct', 'partial', 'wrong', 'misconception'].includes(parsed.status)
    ? parsed.status : 'wrong';
  const message = typeof parsed.message === 'string' && parsed.message.trim().length > 0
    ? parsed.message.trim()
    : 'Hmm, coba kita pikirkan lagi bersama ya. 🤔';

  return {
    status,
    message,
    isConceptConfirmed: Boolean(parsed.isConceptConfirmed),
    suggestedHintLevel: Number(parsed.suggestedHintLevel) || 0
  };
}

