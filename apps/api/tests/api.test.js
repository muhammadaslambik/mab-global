import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const env = { API_TOKEN: 'rahasia' };
const call = (path, init = {}) => worker.fetch(new Request('http://x' + path, init), env);
const post = (body, token = 'rahasia') => call('/api/tasks', {
  method: 'POST',
  headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
  body: JSON.stringify(body)
});

test('health', async () => {
  const r = await call('/health');
  assert.equal(r.status, 200);
});
test('tanpa token ditolak', async () => {
  assert.equal((await post({ employee: 'Rani', prompt: 'halo dunia' }, 'salah')).status, 401);
});
test('tugas tidak valid ditolak', async () => {
  assert.equal((await post({ employee: '', prompt: 'a' })).status, 400);
});
test('kategori berisiko menunggu persetujuan', async () => {
  const r = await post({ employee: 'Rani', prompt: 'terbitkan berita', category: 'publish' });
  assert.equal(r.status, 202);
  assert.equal((await r.json()).status, 'needs_approval');
});
