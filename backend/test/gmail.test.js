import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeGmailPassword } from '../lib/gmail.js';

test('normalizes Gmail app passwords that contain spaces', () => {
  assert.equal(normalizeGmailPassword('zvci czqo vzpp wcgx'), 'zvciczqovzppwcgx');
});

test('returns empty string for missing password', () => {
  assert.equal(normalizeGmailPassword(undefined), '');
});
