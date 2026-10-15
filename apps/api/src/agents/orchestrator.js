import { complete } from '../llm/provider.js';
import { buildPersona } from './persona.js';

export async function runTask(env, task) {
  const persona = buildPersona({ name: task.employee, role: task.role || 'Karyawan AI' });
  const text = await complete(env, { system: persona, messages: [{ role: 'user', content: task.prompt }] });
  return { status: 'done', text };
}

// Tahap berikut: kepala bidang merencanakan, anggota mengerjakan, kepala menggabungkan.
export async function delegate() {
  throw new Error('belum diimplementasikan: lihat docs/agen-ai.md');
}
