function normalize(value: number, size: number) {
  let normalized = value;
  while (normalized < 0) {
    normalized += size;
  }
  return normalized % size;
}

export default normalize;
