import { BIND } from './bindings.js';
import { Frame } from './frame.js';

export class InputSystem {
  constructor(bindings = BIND) {
    this.bind = bindings;
    this.src = { key: new Set(), pad: new Set() };
    this.prev = new Set();
  }
  setBindings(b) { this.bind = b; }
  attach(win) {
    win.addEventListener('keydown', (e) => {
      const s = this.bind.key[e.code];
      if (s && !e.repeat) { this.src.key.add(s); e.preventDefault(); }
    });
    win.addEventListener('keyup', (e) => {
      const s = this.bind.key[e.code];
      if (s) this.src.key.delete(s);
    });
    win.addEventListener('blur', () => this.src.key.clear());
  }
  poll(t) {   // panggil sekali per tick simulasi
    const pads = typeof navigator !== 'undefined' && navigator.getGamepads ? [...navigator.getGamepads()] : [];
    const g = pads.find(Boolean);
    this.src.pad.clear();
    let px = 0, py = 0;
    if (g) {
      for (const [i, s] of Object.entries(this.bind.pad)) if (g.buttons[i]?.pressed) this.src.pad.add(s);
      px = Math.abs(g.axes[0]) > 0.2 ? g.axes[0] : 0;
      py = Math.abs(g.axes[1]) > 0.2 ? -g.axes[1] : 0;
    }
    const held = new Set([...this.src.key, ...this.src.pad]);
    let x = Number(held.has('RIGHT')) - Number(held.has('LEFT')) + px;
    let y = Number(held.has('UP')) - Number(held.has('DOWN')) + py;
    const m = Math.hypot(x, y);
    if (m > 1) { x /= m; y /= m; }
    const pressed = new Set([...held].filter((s) => !this.prev.has(s)));
    const released = new Set([...this.prev].filter((s) => !held.has(s)));
    this.prev = held;
    return new Frame(t, { x, y }, held, pressed, released);
  }
}
