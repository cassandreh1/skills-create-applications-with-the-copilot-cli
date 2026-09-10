#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting addition (+), subtraction (-),
 * multiplication (*), division (/), modulo (%), exponentiation (^),
 * and square root (sqrt).
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *   node src/calculator.js <number> sqrt
 *
 * Examples:
 *   node src/calculator.js 2 + 3
 *   node src/calculator.js 12 / 4
 */

const SUPPORTED_OPERATORS = ['+', '-', '*', '/', '%', '^', 'sqrt'];

function calculate(left, operator, right) {
  if (!Number.isFinite(left)) {
    throw new TypeError('The operand must be a valid number.');
  }

  if (!SUPPORTED_OPERATORS.includes(operator)) {
    throw new Error(`Unsupported operator "${operator}".`);
  }

  if (operator === 'sqrt') {
    if (left < 0) {
      throw new Error('Cannot calculate the square root of a negative number.');
    }

    return Math.sqrt(left);
  }

  if (!Number.isFinite(right)) {
    throw new TypeError('Both operands must be valid numbers.');
  }

  if ((operator === '/' || operator === '%') && right === 0) {
    throw new Error(`${operator === '/' ? 'Division' : 'Modulo'} by zero is not allowed.`);
  }

  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return left / right;
    case '%':
      return left % right;
    case '^':
      return left ** right;
    default:
      throw new Error(`Unsupported operator "${operator}".`);
  }
}

function printUsage(message) {
  if (message) {
    console.error(`Error: ${message}`);
  }

  console.error('Usage: node src/calculator.js <number> <operator> <number>');
  console.error('Supported operators: +, -, *, /');
  process.exitCode = 1;
}

if (require.main === module) {
  const [, , leftInput, operator, rightInput] = process.argv;

  const expectedArgumentCount = operator === 'sqrt' ? 4 : 5;

  if (process.argv.length !== expectedArgumentCount) {
    printUsage(
      operator === 'sqrt'
        ? 'Square root expects one number.'
        : 'Expected two numbers and one operator.',
    );
  } else {
    try {
      console.log(calculate(Number(leftInput), operator, rightInput === undefined
        ? undefined
        : Number(rightInput)));
    } catch (error) {
      printUsage(error.message);
    }
  }
}

module.exports = { calculate };
