import walker from './walker';

export default function processBitmap(bitmapArray: number[][]) {
  const lines = bitmapArray.length;
  const columns = bitmapArray[0].length;
  const processingArray: number[][] = new Array(lines)
    .fill([])
    .map(() => new Array(columns).fill(Infinity));
  const processingQueue = [];

  for (let line = 0; line < lines; line += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (bitmapArray[line][column] === 1) {
        processingQueue.push([line, column]);
        processingArray[line][column] = 0;
      }
    }
  }

  return walker(processingQueue, processingArray);
}
