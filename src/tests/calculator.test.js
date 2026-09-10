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

  describe('modulo', () => {
    test('calculates the image example 5 % 2', () => {
      expect(calculate(5, '%', 2)).toBe(1);
    });

    test('handles a zero remainder', () => {
      expect(calculate(10, '%', 5)).toBe(0);
    });

    test('rejects modulo by zero', () => {
      expect(() => calculate(10, '%', 0)).toThrow('Modulo by zero is not allowed.');
    });
  });

  describe('exponentiation', () => {
    test('calculates the image example 2 ^ 3', () => {
      expect(calculate(2, '^', 3)).toBe(8);
    });

    test('supports fractional exponents', () => {
      expect(calculate(9, '^', 0.5)).toBe(3);
    });

    test('supports negative exponents', () => {
      expect(calculate(2, '^', -2)).toBe(0.25);
    });

    test('returns one for any non-zero base raised to zero', () => {
      expect(calculate(-7, '^', 0)).toBe(1);
    });

    test('handles a zero base with a positive exponent', () => {
      expect(calculate(0, '^', 3)).toBe(0);
    });

    test('supports negative bases with integer exponents', () => {
      expect(calculate(-2, '^', 3)).toBe(-8);
    });
  });

  describe('square root', () => {
    test('calculates the image example square root of 16', () => {
      expect(calculate(16, 'sqrt')).toBe(4);
    });

    test('calculates the square root of zero', () => {
      expect(calculate(0, 'sqrt')).toBe(0);
    });

    test('rejects negative numbers', () => {
      expect(() => calculate(-1, 'sqrt')).toThrow(
        'Cannot calculate the square root of a negative number.',
      );
    });
  });

  describe('input validation', () => {
    test('rejects unsupported operators', () => {
      expect(() => calculate(2, '&', 3)).toThrow('Unsupported operator "&"');
    });

    test('rejects non-finite operands', () => {
      expect(() => calculate(Number.NaN, '+', 3)).toThrow(
        'The operand must be a valid number.',
      );
      expect(() => calculate(2, '+', Number.POSITIVE_INFINITY)).toThrow(
        'Both operands must be valid numbers.',
      );
    });
  });
});
