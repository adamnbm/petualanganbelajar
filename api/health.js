import { checkGeminiHealth } from '../backend/services/gemini.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const status = await checkGeminiHealth();
    return res.status(200).json({ success: true, ...status });
  } catch (err) {
    return res.status(200).json({
      success: true,
      mode: 'Kurikulum Socratic (Fallback)',
      model: null,
      error: err.message
    });
  }
}
