import getPaths from './getPaths';

export default function walker(processingQueue: number[][], processingArray: number[][]) {
  const resultArray = Array.from(processingArray).map((line) => Array.from(line));
  const lines = resultArray.length;
  const columns = resultArray[0].length;
  const paths = getPaths();

  while (processingQueue.length > 0) {
    const [line, column]: number[] = processingQueue.shift();

    paths.forEach(([lineDiff, columnDiff]) => {
      const newLine = line + lineDiff;
      const newColumn = column + columnDiff;

      if (
        newLine >= 0
        && newLine < lines
        && newColumn >= 0
        && newColumn < columns
        && resultArray[newLine][newColumn] > resultArray[line][column] + 1) {
        resultArray[newLine][newColumn] = resultArray[line][column] + 1;
        processingQueue.push([newLine, newColumn]);
      }
    });
  }

  return resultArray;
}
