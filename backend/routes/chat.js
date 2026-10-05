import express from 'express';
import { evaluateConversationalAnswer, checkGeminiHealth } from '../services/gemini.js';
import { validateConversationalInput } from '../utils/validator.js';

const router = express.Router();

/**
 * GET /api/health
 * Status koneksi AI engine
 */
router.get('/health', async (req, res) => {
  try {
    const status = await checkGeminiHealth();
    res.json({ success: true, ...status });
  } catch {
    res.json({ success: true, mode: 'Kurikulum Socratic (Offline)', model: null });
  }
});

/**
 * POST /api/chat
 * Evaluasi jawaban bebas siswa & hasilkan respons Socratic
 * Body: { missionId, conceptId, conceptTitle, targetUnderstanding, misconceptions,
 *         confirmationKeywords, studentAnswer, studentName, conversationHistory,
 *         wrongCountForConcept, hintsGiven }
 */
router.post('/chat', async (req, res) => {
  try {
    const validation = validateConversationalInput(req.body);
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

    return res.json({
      success: true,
      status: result.status,
      message: result.message,
      isConceptAligned: Boolean(result.isConceptAligned ?? (result.status === 'correct')),
      isConceptConfirmed: result.isConceptConfirmed,
      suggestedHintLevel: result.suggestedHintLevel
    });

  } catch (error) {
    console.error('[POST /api/chat error]:', error.message || error);
    return res.status(200).json({
      success: true,
      status: 'wrong',
      message: 'Hmm, SOKRABOT sedang berpikir sejenak! Coba kirim ulang jawabanmu ya, Detektif! 😊',
      isConceptConfirmed: false,
      suggestedHintLevel: 0
    });
  }
});

export default router;
