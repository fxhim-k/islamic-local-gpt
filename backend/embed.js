import { pipeline } from "@xenova/transformers";

// Load once on startup
let embedder;

export async function loadEmbedder() {
  if (!embedder) {
    console.log("🧠 Loading embedding model (all-MiniLM-L6-v2)...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("✅ Embedding model loaded.");
  }
  return embedder;
}

export async function embedText(text) {
  const emb = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });
  return emb.data;
}
