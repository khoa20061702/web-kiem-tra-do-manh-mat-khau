import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzePassword,
  generateSecurePassword,
  hasExcessiveRepetition,
  hasSequentialPattern,
  findCommonSubstrings
} from './passwordAnalysis.ts';

// Setup mock window.crypto for Node.js test environment
if (typeof (globalThis as any).window === 'undefined') {
  (globalThis as any).window = {
    crypto: globalThis.crypto,
  };
}

test('analyzePassword returns neutral empty state for blank input', () => {
  const result = analyzePassword('');
  assert.equal(result.level, 'empty');
  assert.equal(result.score, 0);
  assert.equal(result.passedCount, 0);
  assert.equal(result.levelLabel, 'Chưa nhập mật khẩu');
});

test('analyzePassword correctly flags common leaked passwords', () => {
  const result1 = analyzePassword('123456');
  assert.equal(result1.isCommonPassword, true);
  assert.ok(result1.score <= 25, `Expected score <= 25, got ${result1.score}`);

  const result2 = analyzePassword('password');
  assert.equal(result2.isCommonPassword, true);
  assert.ok(result2.score <= 25);

  const result3 = analyzePassword('admin123');
  assert.equal(result3.isCommonPassword, true);
  assert.ok(result3.score <= 25);
});

test('hasExcessiveRepetition detects repeating characters', () => {
  assert.equal(hasExcessiveRepetition('aaa'), true);
  assert.equal(hasExcessiveRepetition('passs123'), true);
  assert.equal(hasExcessiveRepetition('secure_pass_123'), false);
});

test('hasSequentialPattern detects keyboard and alphabetical sequences', () => {
  assert.equal(hasSequentialPattern('pass1234word'), true);
  assert.equal(hasSequentialPattern('abcdeSecurity'), true);
  assert.equal(hasSequentialPattern('qwer9988'), true);
  assert.equal(hasSequentialPattern('Xk#9mP$2vL'), false);
});

test('findCommonSubstrings finds common target words', () => {
  const found = findCommonSubstrings('my_secret_password_here');
  assert.ok(found.includes('password'));
  assert.ok(found.includes('secret'));
});

test('analyzePassword scores a robust complex password as very strong', () => {
  const robustPass = 'K9#mQ!8z$Vp2@wLx';
  const result = analyzePassword(robustPass);

  assert.ok(result.score >= 85, `Expected score >= 85, got ${result.score}`);
  assert.equal(result.level, 'very_strong');
  assert.equal(result.passedCount, 8); // All 8 criteria passed
  assert.equal(result.isCommonPassword, false);
});

test('generateSecurePassword validates options and generates correct length', () => {
  // Error when no options chosen
  const failResult = generateSecurePassword({
    length: 16,
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
  });
  assert.ok(failResult.error !== undefined);

  // Success when options are provided
  const successResult = generateSecurePassword({
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  assert.ok(successResult.password !== undefined);
  assert.equal(successResult.password!.length, 20);

  // Verify it contains characters of each required group
  const pass = successResult.password!;
  assert.ok(/[A-Z]/.test(pass), 'Should contain uppercase');
  assert.ok(/[a-z]/.test(pass), 'Should contain lowercase');
  assert.ok(/[0-9]/.test(pass), 'Should contain digit');
  assert.ok(/[^a-zA-Z0-9]/.test(pass), 'Should contain symbol');
});
