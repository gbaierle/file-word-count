import { argv } from 'node:process';
import { countBytes, countLines, countWords } from './ccwc.js';

const option = argv[2];
const filePath = argv[3];

if (option === '-c') {
  const bytes = await countBytes(filePath);
  console.log(bytes);
}

if (option === '-l') {
  const lines = await countLines(filePath);
  console.log(lines);
}

if (option === '-w') {
  const words = await countWords(filePath);
  console.log(words);
}
