export default function getPaths() {
  const rightPath = [0, 1];
  const downPath = [1, 0];
  const leftPath = [0, -1];
  const upPath = [-1, 0];
  return [
    rightPath,
    downPath,
    leftPath,
    upPath,
  ];
}
