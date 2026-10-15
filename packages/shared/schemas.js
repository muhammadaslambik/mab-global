export const TASK_STATUS = ['queued', 'running', 'needs_approval', 'done', 'failed'];

export function validateTask(t) {
  const errors = [];
  if (!t || typeof t !== 'object') return { ok: false, errors: ['tugas bukan objek'] };
  if (typeof t.employee !== 'string' || !t.employee) errors.push('employee wajib diisi');
  if (typeof t.prompt !== 'string' || t.prompt.length < 3) errors.push('prompt terlalu pendek');
  if (typeof t.prompt === 'string' && t.prompt.length > 8000) errors.push('prompt terlalu panjang');
  return { ok: errors.length === 0, errors };
}
