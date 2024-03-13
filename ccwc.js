import fs from 'fs/promises';
import { createReadStream } from 'node:fs';

const LINE_BREAK = '\n'.charCodeAt(0)

const countBytes = async (filePath) => {
  const stats = await fs.stat(filePath)
  console.log(stats)
  return stats.size || 0;
}

const countLines = async (filePath) => {
  let lineCount = 0;

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .on('data', (chunk) => {
        for (let i = 0; i < chunk.length; ++i) {
          if (chunk[i] == LINE_BREAK) {
            lineCount++;
          }
        }
      })
      .on('end', () => {
        resolve(lineCount);
      })
      .on('error', (err) => {
        reject(err);
      })
    });
}

const countWords = async (filePath) => {

  return new Promise((resolve, reject) => {
    let textBuffer = '';

    createReadStream(filePath)
      .on('data', (chunk) => {
        // Count number of words in text
        textBuffer += chunk;
      })
      .on('end', () => {
        const wordCount = textBuffer.trim().split(/\s+/).length
        resolve(wordCount);
      })
      .on('error', (err) => {
        reject(err);
      })
    });
}

export { countBytes, countLines, countWords };
