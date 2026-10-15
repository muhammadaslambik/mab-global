// Penghubung ke "otak" karyawan AI. Kode dunia 3D hanya memanggil gateway.run(task).
export class ClaudeArtifactGateway {
  name = 'claude-artifact';
  async run(task) {
    const sample = await window.claude?.use?.('sample');
    if (!sample) throw new Error('Fitur Claude tidak tersedia di tampilan ini');
    const r = await sample([{ role: 'user', content: task.prompt }], { cache: false });
    return { text: r.text };
  }
}

export class HttpGateway {
  name = 'http';
  constructor(baseUrl) { this.baseUrl = baseUrl; }
  async run(task) {
    const res = await fetch(this.baseUrl + '/api/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error('API ' + res.status);
    return res.json();
  }
}

export function createGateway() {
  if (typeof window !== 'undefined' && window.claude?.use) return new ClaudeArtifactGateway();
  return new HttpGateway(import.meta.env?.VITE_API_URL ?? 'http://localhost:8787');
}
