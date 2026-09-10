const { calculate } = require('../calculator');

describe('calculator', () => {
  describe('addition', () => {
    test('adds the example values 2 + 3', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('handles negative and decimal values', () => {
      expect(calculate(-2.5, '+', 3.25)).toBeCloseTo(0.75);
    });
  });

  describe('subtraction', () => {
    test('subtracts the example values 10 - 4', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('handles a negative result', () => {
      expect(calculate(4, '-', 10)).toBe(-6);
    });
  });

  describe('multiplication', () => {
    test('multiplies the example values 45 * 2', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('handles zero and negative values', () => {
      expect(calculate(-3, '*', 0)).toBe(-0);
    });
  });

  describe('division', () => {
    test('divides the example values 20 / 5', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('returns decimal results', () => {
      expect(calculate(5, '/', 2)).toBe(2.5);
    });

    test('rejects division by zero', () => {
      expect(() => calculate(10, '/', 0)).toThrow('Division by zero is not allowed.');
    });
  });

  describe('input validation', () => {
    test('rejects unsupported operators', () => {
      expect(() => calculate(2, '%', 3)).toThrow('Unsupported operator "%"');
    });

    test('rejects non-finite operands', () => {
      expect(() => calculate(Number.NaN, '+', 3)).toThrow(
        'Both operands must be valid numbers.',
      );
      expect(() => calculate(2, '+', Number.POSITIVE_INFINITY)).toThrow(
        'Both operands must be valid numbers.',
      );
    });
  });
});
