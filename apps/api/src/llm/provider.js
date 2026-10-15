// Router penyedia LLM. Tambahkan penyedia lain (Gemini, Groq) di sini.
async function claude(env, { system, messages, maxTokens }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: env.CLAUDE_MODEL || 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system,
      messages
    })
  });
  if (!res.ok) throw new Error('Claude API ' + res.status);
  const data = await res.json();
  return data.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
}

const PROVIDERS = { claude };

export async function complete(env, { provider = 'auto', system, messages, maxTokens = 800 }) {
  const name = provider === 'auto' ? 'claude' : provider;
  const fn = PROVIDERS[name];
  if (!fn) throw new Error('penyedia belum tersedia: ' + name);
  return fn(env, { system, messages, maxTokens });
}
