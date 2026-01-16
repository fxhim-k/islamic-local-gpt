import express from "express";
import cors from "cors";
import { loadAllPDFs } from "./pdfLoader.js";
import { loadEmbedder, embedText } from "./embed.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
}));

let PDF_LIBRARY = [];

function cosineSimilarity(vecA, vecB) {
  let dot = 0.0, a = 0.0, b = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    a += vecA[i] * vecA[i];
    b += vecB[i] * vecB[i];
  }

  return dot / (Math.sqrt(a) * Math.sqrt(b) + 1e-8);
}

async function start() {
  console.log("📌 STARTING BACKEND...");
  await loadEmbedder();                      // Load the AI model
  PDF_LIBRARY = await loadAllPDFs();         // Load and embed PDFs
  console.log("🚀 Ready on http://localhost:4000");

  app.listen(4000);
}

app.post("/search", async (req, res) => {
  const query = req.body.query || "";
  if (!query.trim()) return res.json({ results: [] });

  const queryVec = await embedText(query);

  const scored = PDF_LIBRARY.map((p) => ({
    ...p,
    score: cosineSimilarity(queryVec, p.embedding),
  }));

  const sorted = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.json({
  results: sorted.map((p) => ({
    pdf: p.pdfName,
    snippet: p.text.substring(0, 400),

    })),
  });
});

start();
