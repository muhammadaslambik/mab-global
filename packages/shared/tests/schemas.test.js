import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTask } from '../schemas.js';

test('tugas valid lolos', () => {
  assert.equal(validateTask({ employee: 'Rani', prompt: 'Tulis artikel kopi' }).ok, true);
});
test('tugas tanpa karyawan atau prompt ditolak', () => {
  const r = validateTask({ prompt: 'a' });
  assert.equal(r.ok, false);
  assert.equal(r.errors.length, 2);
});
