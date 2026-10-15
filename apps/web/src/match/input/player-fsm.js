// FSM pemain + input buffering. Perintah tepi dibuffer, perintah level langsung diterapkan.
export const BUFFER_MS = 180;

export const ALLOW = {
  LOCOMOTION: new Set(['PASS', 'THROUGH', 'LOB', 'SHOOT_BEGIN', 'WALL_PASS', 'SLIDE', 'SWITCH', 'TEAMMATE_PRESS', 'GK_CHARGE']),
  SHOOT_CHARGE: new Set(['SHOOT', 'SHOOT_CANCEL']),
  SLIDE_RECOVER: new Set([]),
  WALL_PASS_WAIT: new Set(['WALL_RETURN', 'PASS', 'SHOOT_BEGIN'])    // kursor tetap di pengumpan
};
const LEVEL = new Set(['PRESS', 'TEAMMATE_PRESS_END']);

export class PlayerFSM {
  constructor() { this.state = 'LOCOMOTION'; this.buf = []; }
  feed(intent, now, sim) {
    for (const c of intent.cmds) {
      if (LEVEL.has(c.type)) sim.applyLevel?.(c);
      else this.buf.push({ ...c, exp: now + BUFFER_MS });
    }
    this.buf = this.buf.filter((c) => c.exp > now && !this.tryExec(c, sim));
    sim.applyMove?.(intent);
  }
  tryExec(c, sim) {
    if (!ALLOW[this.state]?.has(c.type)) return false;
    this.state = sim.execute(c, this.state) ?? this.state;
    return true;
  }
}
