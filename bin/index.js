import { argv } from 'node:process';
import FileWordCount from '../src/file-word-count.js';

let option = argv[2];
let file = argv[3];

// When no option, file or stdin is provided
if (!option && !file && process.stdin.isTTY) {
  console.log('Usage: node . [-c | -l | -w | -m] [FILE]');
  process.exit(1);
}

// When 2nd argument doesn't start with '-', treat it as a file
if (option && option.at(0) !== '-') {
  file = option;
  option = '-';
}

// If no option is provided, default to '-'
if (!option) {
  option = '-';
}

// When file is not provided and stdin is available
if (!file && process.stdin) {
  file = process.stdin;
}

let fileWordCount = new FileWordCount(file);
let result = [];

switch (option) {
  case '-l':
    const countLines = await fileWordCount.countLines();
    result.push(countLines);
    break;
  case '-w':
    const countWords = await fileWordCount.countWords();
    result.push(countWords);
    break;
  case '-c':
    const countBytes = await fileWordCount.countBytes();
    result.push(countBytes);
    break;
  case '-m':
    const countChars = await fileWordCount.countChars();
    result.push(countChars);
    break;
  default: // case '-'
    const { lines, words, bytes } = await fileWordCount.countAll();
    result.push(lines, words, bytes);
    break;
}

// If provided, append filename to result, as in 'wc'
if (typeof file === "string") {
  result.push(file);
}

console.log(result.join(' '));
