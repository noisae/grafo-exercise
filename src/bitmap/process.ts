import getPaths from './getPaths';

export default function processBitmap(bitmapArray: number[][]) {
  const lines = bitmapArray.length;
  const columns = bitmapArray[0].length;
  const paths = getPaths();
  const resultArray: number[][] = new Array(lines)
    .fill([])
    .map(() => new Array(columns).fill(Infinity));
  const processingQueue = [];

  for (let line = 0; line < lines; line += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (bitmapArray[line][column] === 1) {
        processingQueue.push([line, column]);
        resultArray[line][column] = 0;
      }
    }
  }

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
