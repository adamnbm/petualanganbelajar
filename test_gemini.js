// Test JSON structured output with gemini-flash-latest
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

try {
  const modelName = 'gemini-3.8-flash';
  console.log('Testing with model:', modelName);
  const { Type } = await import('@google/genai');
  const res = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: 'Evaluasi: Padi dapat makanan dari mana? Jawaban siswa: padi fotosintesis sendiri pakai sinar matahari',
    config: {
      systemInstruction: 'Kamu adalah SOKRABOT tutor SD. Evaluasi jawaban siswa secara Socratic.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ['correct', 'partial', 'wrong', 'misconception'] },
          message: { type: Type.STRING },
          isConceptConfirmed: { type: Type.BOOLEAN },
          suggestedHintLevel: { type: Type.INTEGER }
        },
        required: ['status', 'message', 'isConceptConfirmed', 'suggestedHintLevel']
      }
    }
  });
  console.log('JSON response:', res.text);
} catch (err) {
  console.error('Error occurred:', err.message || err);
}
