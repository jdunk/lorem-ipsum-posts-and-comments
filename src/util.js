export function randRange(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}