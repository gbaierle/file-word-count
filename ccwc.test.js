import { test } from 'node:test';
import assert from 'node:assert';
import { countBytes, countLines, countWords } from './ccwc.js';

const TEST_FILE = 'test.txt';

test('should return the number of bytes in a file', async () => {
  const bytes = await countBytes(TEST_FILE);
  assert.equal(bytes, 342190);
});

test('should return the number of lines in a file', async () => {
  const lines = await countLines(TEST_FILE);
  assert.equal(lines, 7145);
})

test('should return the number of words in a file', async () => {
  const lines = await countWords(TEST_FILE);
  assert.equal(lines, 58164);
});
