import { argv } from 'node:process';
import { countBytes, countChars, countLines, countWords } from './ccwc.js';

let option = argv[2];
let filePath = argv[3];

if (!option && !filePath && process.stdin.isTTY) {
  console.log('Usage: ccwc [-c | -l | -w | -m] [FILE]');
  process.exit(1);
}

if ((option && option.at(0) === '-') || !option && !filePath) {
  filePath = process.stdin;
}

if (!option) {
  option = '-';
}


if (option && option.at(0) !== '-') {
  filePath = option;
  option = '-';
}

if (option === '-c' || option === '-') {
  const bytes = await countBytes(filePath);
  console.log(bytes);
}

if (option === '-l' || option === '-') {
  const lines = await countLines(filePath);
  console.log(lines);
}

if (option === '-w' || option === '-') {
  const words = await countWords(filePath);
  console.log(words);
}

if (option === '-m') {
  const chars = await countChars(filePath);
  console.log(chars);
}
