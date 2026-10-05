import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';


// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Request logger sederhana untuk development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Mount API routes
app.use('/api', chatRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE');
  res.json({
    status: 'healthy',
    mode: hasGeminiKey ? 'Gemini AI Live' : 'Curriculum Fallback Mode',
    model: GEMINI_MODEL,
    time: new Date().toISOString()
  });
});

// Jika dist frontend tersedia, sajikan secara statis
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all handler untuk SPA atau 404 API
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, error: 'Endpoint API tidak ditemukan.' });
  }

  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Petualangan Belajar AI Tutor</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>🤖 Server Backend AI Tutor Berjalan!</h1>
            <p>Jalankan <code>npm run client</code> atau <code>npm run dev</code> untuk membuka antarmuka Vite frontend.</p>
            <p>API Endpoint: <code>/api/missions</code>, <code>/api/chat</code></p>
          </body>
        </html>
      `);
    }
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    error: 'Terjadi kendala pada server. Silakan coba kembali.'
  });
});

app.listen(PORT, () => {
  const isKeyConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE');
  console.log(`
=====================================================
🌱 PETUALANGAN BELAJAR - BACKEND EXPRESS
=====================================================
🚀 Server aktif di: http://localhost:${PORT}
🤖 Gemini Model   : ${GEMINI_MODEL}
🔑 Gemini Key     : ${isKeyConfigured ? 'Terkonfigurasi ✓ (Aman di Server)' : 'Belum diset (Menggunakan Fallback Cerdas Kurikulum)'}
📡 API Endpoints  :
   - GET  /api/missions
   - GET  /api/missions/:id
   - POST /api/chat
=====================================================
  `);
});
