import {getRandomFromRange} from "./utils";

describe('getRandomFromRange', () => {

  it('should return a number within the specified range', () => {
    // Test multiple times to ensure range coverage
    for(let i = 0; i < 100; i++) {
      const result = getRandomFromRange(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  it('should return the min value if min equals max', () => {
    const result = getRandomFromRange(5, 5);
    expect(result).toBe(5);
  });

  it('should handle negative ranges correctly', () => {
    for(let i = 0; i < 100; i++) {
      const result = getRandomFromRange(-10, -1);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    }
  });

  it('should throw an error if min is greater than max', () => {
    expect(() => getRandomFromRange(10, 1)).toThrowError('Invalid range: min should not be greater than max');
  });

  it('should handle a wide range', () => {
    for(let i = 0; i < 100; i++) {
      const result = getRandomFromRange(1, 1000);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(1000);
    }
  });

  // Edge cases
  it('should return a number when zero is included in the range', () => {
    for(let i = 0; i < 100; i++) {
      const result = getRandomFromRange(-5, 5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it('should handle very large ranges', () => {
    for(let i = 0; i < 100; i++) {
      const result = getRandomFromRange(1, Number.MAX_SAFE_INTEGER);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    }
  });

  it('should handle zero range correctly', () => {
    const result = getRandomFromRange(0, 0);
    expect(result).toBe(0);
  });
});
