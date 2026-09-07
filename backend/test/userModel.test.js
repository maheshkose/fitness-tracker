import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidPassword } from '../Models/userModel.js';

test('password validator rejects weak passwords', () => {
  assert.equal(isValidPassword('weakpassword'), false);
  assert.equal(isValidPassword('WeakPassword1!'), true);
});
