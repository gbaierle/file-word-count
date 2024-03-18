import { Socket } from "node:net";
import { createReadStream, ReadStream } from "node:fs";

const LINE_BREAK = "\n".charCodeAt(0);

class FileWordCount {

  /** @type ReadStream */
  #fileReadStream;

  /**
   * Creates an instance of FileWordCount.
   * It accepts a file path or a Socket in case the user wants to read from stdin.
   *
   * @param {string|Socket} file
   */
  constructor(file) {
    if (typeof file === "string") {
      this.#fileReadStream = createReadStream(file);
    } else {
      this.#fileReadStream = file;
    }
  }

  /**
   * @returns {Promise<number>}
   */
  countBytes = async () => {
    let bytes = 0;

    return await new Promise((resolve, reject) => {
      this.#fileReadStream
        .on("data", (chunk) => {
          bytes += chunk.length;
        })
        .on("end", () => {
          resolve(bytes);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };

  /**
   * @returns {Promise<number>}
   */
  countLines = async () => {
    let lineCount = 0;

    return await new Promise((resolve, reject) => {
      this.#fileReadStream
        .on("data", (chunk) => {
          for (let i = 0; i < chunk.length; ++i) {
            if (chunk[i] == LINE_BREAK) {
              lineCount++;
            }
          }
        })
        .on("end", () => {
          resolve(lineCount);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };

  /**
   * @returns {Promise<number>}
   */
  countWords = async () => {
    let textBuffer = "";

    return await new Promise((resolve, reject) => {
      this.#fileReadStream
        .on("data", (chunk) => {
          textBuffer += chunk;
        })
        .on("end", () => {
          const wordCount = textBuffer.trim().split(/\s+/).length;
          resolve(wordCount);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };

  /**
   * @returns {Promise<number>}
   */
  countChars = async () => {
    let charsCount = 0;

    return await new Promise((resolve, reject) => {
      this.#fileReadStream
        .on("data", (chunk) => {
          charsCount += chunk.toString().length;
        })
        .on("end", () => {
          resolve(charsCount);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };

  /**
   * @returns {Promise<{lines: number, words: number, bytes: number}>}
   */
  countAll = async () => {
    const [lines, words, bytes] = await Promise.all([
      this.countLines(),
      this.countWords(),
      this.countBytes(),
    ]);
    return { lines, words, bytes };
  }
}

export default FileWordCount;
