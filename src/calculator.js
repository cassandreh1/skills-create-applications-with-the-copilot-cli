#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting the four operations shown in the calculator image:
 * addition (+), subtraction (-), multiplication (*), and division (/).
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node src/calculator.js 2 + 3
 *   node src/calculator.js 12 / 4
 */

const SUPPORTED_OPERATORS = ['+', '-', '*', '/'];

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError('Both operands must be valid numbers.');
  }

  if (!SUPPORTED_OPERATORS.includes(operator)) {
    throw new Error(`Unsupported operator "${operator}".`);
  }

  if (operator === '/' && right === 0) {
    throw new Error('Division by zero is not allowed.');
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

  if (process.argv.length !== 5) {
    printUsage('Expected two numbers and one operator.');
  } else {
    try {
      console.log(calculate(Number(leftInput), operator, Number(rightInput)));
    } catch (error) {
      printUsage(error.message);
    }
  }
}

module.exports = { calculate };
