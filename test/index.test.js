import { describe, test } from "node:test";
import assert from "node:assert";
import process from "node:child_process";

/**
 * Retrieves the result from the command line interface.
 *
 * @param {string} command - The command to execute
 * @returns {Promise<string>} - The result from the command
 * @throws {Error} - If the command fails
 */
function getResultFromCLI(command) {
  return new Promise((resolve, reject) => {
    process.exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(formatResult(stdout));
      }
    });
  });
}

/**
 * Formats the given stdout by converting it to a string,
 * splitting it by spaces, and filtering out empty values.
 *
 * @param {any} stdout - the stdout to be formatted
 * @return {Array<string>} an array of non-empty strings
 */
function formatResult(stdout) {
  return stdout
      .toString()
      .split(" ")
      .filter((value) => value !== "");
}

describe("CLI tests", async () => {
  test("should return the number of bytes", async () => {
    const wcResult = await getResultFromCLI('wc -c test.txt');
    const cliResult= await getResultFromCLI('node . -c test.txt');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of lines", async () => {
    const wcResult = await getResultFromCLI('wc -l test.txt');
    const cliResult= await getResultFromCLI('node . -l test.txt');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of words", async () => {
    const wcResult = await getResultFromCLI('wc -w test.txt');
    const cliResult= await getResultFromCLI('node . -w test.txt');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of chars", async () => {
    const wcResult = await getResultFromCLI('wc -m test.txt');
    const cliResult= await getResultFromCLI('node . -m test.txt');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of lines, words and bytes", async () => {
    const wcResult = await getResultFromCLI('wc test.txt');
    const cliResult= await getResultFromCLI('node . test.txt');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of bytes using stdin", async () => {
    const wcResult = await getResultFromCLI('cat test.txt | wc -c');
    const cliResult= await getResultFromCLI('cat test.txt | node . -c');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of lines using stdin", async () => {
    const wcResult = await getResultFromCLI('cat test.txt | wc -l');
    const cliResult= await getResultFromCLI('cat test.txt | node . -l');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of words using stdin", async () => {
    const wcResult = await getResultFromCLI('cat test.txt | wc -w');
    const cliResult= await getResultFromCLI('cat test.txt | node . -w');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of chars using stdin", async () => {
    const wcResult = await getResultFromCLI('cat test.txt | wc -m');
    const cliResult= await getResultFromCLI('cat test.txt | node . -m');
    assert.deepEqual(wcResult, cliResult);
  });

  test("should return the number of lines, words and bytes using stdin", async () => {
    const wcResult = await getResultFromCLI('cat test.txt | wc');
    const cliResult = await getResultFromCLI('cat test.txt | node .');
    assert.equal(wcResult.length, cliResult.length);
    assert.deepEqual(wcResult, cliResult);
  });
});
