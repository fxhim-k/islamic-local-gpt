import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { embedText } from "./embed.js";

const pdfFolder = path.join(process.cwd(), "pdfs");
const toolPath = path.join(process.cwd(), "pdftools", "pdftotext.exe");

function extractText(filePath) {
  return new Promise((resolve, reject) => {
    const outputFile = filePath.replace(".pdf", ".txt");

    const cmd = `"${toolPath}" -enc UTF-8 "${filePath}" "${outputFile}"`;

    exec(cmd, async (error) => {
      if (error) return reject(error);

      const text = fs.readFileSync(outputFile, "utf8");

      const pages = text.split("\f").map((page, index) => ({
        page: index + 1,
        text: page.trim(),
      }));

      resolve(pages);
    });
  });
}

export async function loadAllPDFs() {
  console.log("📥 Extracting and embedding all PDFs...");

  const files = fs.readdirSync(pdfFolder).filter((f) => f.endsWith(".pdf"));
  const library = [];

  for (const file of files) {
    console.log(`📄 Processing ${file}...`);

    const pages = await extractText(path.join(pdfFolder, file));

    for (const p of pages) {
      if (p.text.length < 20) continue; // skip empty pages

      const embedding = await embedText(p.text);

      library.push({
        pdfName: file,
        page: p.page,
        text: p.text,
        embedding,
      });
    }

    console.log(`📚 Loaded & embedded ${pages.length} pages from ${file}`);
  }

  return library;
}
