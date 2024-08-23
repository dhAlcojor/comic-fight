export function getRandomFromRange(min: number, max: number): number {
  if (min > max) {
    throw new Error('Invalid range: min should not be greater than max')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(Math.floor(value), min), max)
}
