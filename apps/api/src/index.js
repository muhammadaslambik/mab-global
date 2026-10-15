import { validateTask } from '../../../packages/shared/schemas.js';
import { json } from './http.js';
import { isAuthorized } from './guards/auth.js';
import { rateLimited } from './guards/rate-limit.js';
import { needsApproval } from './guards/approvals.js';
import { keepAlive } from './cron/keepalive.js';
import { runTask } from './agents/orchestrator.js';

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/health') return json({ ok: true, time: new Date().toISOString() });
    if (url.pathname === '/api/tasks' && req.method === 'POST') {
      if (!isAuthorized(req, env)) return json({ error: 'tidak berwenang' }, 401);
      if (rateLimited(req)) return json({ error: 'terlalu banyak permintaan' }, 429);
      let body;
      try { body = await req.json(); } catch { return json({ error: 'JSON tidak valid' }, 400); }
      const v = validateTask(body);
      if (!v.ok) return json({ error: 'tugas tidak valid', details: v.errors }, 400);
      if (needsApproval(body)) return json({ status: 'needs_approval' }, 202);
      return json(await runTask(env, body));
    }
    return json({ error: 'tidak ditemukan' }, 404);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(keepAlive(env));
  }
};
