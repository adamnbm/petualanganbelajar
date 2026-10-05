import { evaluateConversationalAnswer } from '../backend/services/gemini.js';
import { validateConversationalInput } from '../backend/utils/validator.js';

export default async function handler(req, res) {
  // Header CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Metode tidak diizinkan. Gunakan POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseErr) {
        return res.status(400).json({ success: false, error: 'Format JSON tidak valid.' });
      }
    }

    const validation = validateConversationalInput(body || {});
    if (!validation.isValid) {
      return res.status(400).json({ success: false, error: validation.error });
    }

    const {
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
    } = validation.data;

    const result = await evaluateConversationalAnswer({
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
    });

    return res.status(200).json({
      success: true,
      status: result.status,
      message: result.message,
      isConceptAligned: Boolean(result.isConceptAligned ?? (result.status === 'correct')),
      isConceptConfirmed: result.isConceptConfirmed,
      suggestedHintLevel: result.suggestedHintLevel
    });
  } catch (error) {
    console.error('[Vercel Serverless /api/chat error]:', error);
    return res.status(200).json({
      success: true,
      status: 'wrong',
      message: 'Hmm, SOKRABOT sedang berpikir sejenak! Coba kirim ulang jawabanmu ya, Detektif! 😊',
      isConceptConfirmed: false,
      suggestedHintLevel: 0
    });
  }
}
