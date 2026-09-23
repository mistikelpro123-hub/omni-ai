import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { apiRouter } from './apiRouter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Static files in production
const localDist = path.join(__dirname, 'dist');
const parentDist = path.join(__dirname, '..', 'dist');
const distPath = fs.existsSync(localDist) ? localDist : parentDist;

app.use(express.static(distPath));

app.get('*', (req, res) => {
  const indexHtml = path.join(distPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.send('Omni.IA Server Active');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
