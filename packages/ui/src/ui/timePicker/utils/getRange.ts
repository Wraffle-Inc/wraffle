function getRange(start: number, end: number) {
  return [...new Array(end - start)].map((_, i) => start + i);
}

export default getRange;
