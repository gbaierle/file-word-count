# File Word Count

Inspired by the code challenge [Build Your Own wc Tool](https://codingchallenges.fyi/challenges/challenge-wc/).

This a simple implementations of the `wc` Unix command line tool to count lines, words, characters and bytes in a file, handling a file path or a file stream as input.

The code is written in Node.js, and here are some usage examples:
```bash
node . -c test.txt # number of bytes
```

```bash
node . -l test.txt # number of lines
```

```bash
node . -w test.txt # number of words
```

```bash
node . -m test.txt # number of characters
```

```bash
node . test.txt # number of lines, words and chars
```

```bash
cat test.txt | node . -l # number of lines using stdin
```

The tests were written using the Node.js Test Runner. Run them with the following command:

```bash
npm run test
# or
npm run test:cov # see coverage report
```
