import { beforeEach, describe, test } from 'node:test';
import assert from 'node:assert';
import FileWordCount from '../src/file-word-count.js';

const TEST_FILE = 'test.txt';

describe('FileWordCount tests', async () => {

  let fileWordCount = null;

  beforeEach(async () => {
    fileWordCount = new FileWordCount(TEST_FILE);
  })

  test('should return the number of bytes in a file', async () => {
    const bytes = await fileWordCount.countBytes();
    assert.equal(bytes, 342190); // Result from `wc -c test.txt`
  });

  test('should return the number of lines in a file', async () => {
    const lines = await fileWordCount.countLines();
    assert.equal(lines, 7145); // Result from `wc -l test.txt`
  })

  test('should return the number of words in a file', async () => {
    const words = await fileWordCount.countWords();
    assert.equal(words, 58164); // Result from `wc -w test.txt`
  });

  test('should return the number of characters in a file', async () => {
    const chars = await fileWordCount.countChars();
    assert.equal(chars, 339292); // Result from `wc -m test.txt`
  });
});
