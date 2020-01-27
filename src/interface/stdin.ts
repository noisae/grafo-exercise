import readline from 'readline';
import os from 'os';

function formatResults(testResults: number[][][]) {
  return testResults.map((result) => result.map((line) => line.join(' ')).join(os.EOL)).join(os.EOL + os.EOL);
}

export default function stdinInterface(processBitmap: (array: number[][]) => number[][]) {
  let numberOfTests = 0;
  let currentTest = 1;
  let currentState = 1;
  let currentTestLines: number[][] = [];
  const testResults: number[][][] = [];
  const readLineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Please enter your test cases: ${os.EOL}`);
  readLineInstance.on('line', (line: string) => {
    if (numberOfTests === 0) {
      numberOfTests = parseInt(line, 10);
      return;
    }

    if (currentState === 1) {
      currentState += 1;
      return;
    }

    if (line && currentState === 2) {
      currentTestLines.push(line.split(' ').map((bitmap) => parseInt(bitmap, 10)));
      return;
    }

    currentTest += 1;
    currentState = 1;
    testResults.push(processBitmap(currentTestLines));
    currentTestLines = [];
    if (currentTest > numberOfTests) {
      console.log(`Results:${os.EOL}${formatResults(testResults)}`);
      readLineInstance.close();
    }
  }).on('close', () => {
    process.exit(0);
  });
}
