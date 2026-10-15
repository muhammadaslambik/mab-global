import { BASE } from './context.js';
import { OneTwo, LobThrough, ShootCharge, DoublePress, L1Tap } from './recognizers.js';

export class IntentBuilder {
  rec = [new OneTwo(), new LobThrough(), new ShootCharge(), new DoublePress(), new L1Tap()];
  build(f, ctx, dt) {
    const cmds = [];
    const emit = (type, args) => cmds.push({ type, ...args });
    this.rec.forEach((r) => r.update(f, ctx, emit, dt));             // 1) kombo dulu
    for (const [slot, action] of Object.entries(BASE[ctx] ?? {})) {   // 2) sisanya aksi dasar
      if (f.hit(slot)) { f.consume(slot); emit(action); }
    }
    return {
      move: f.move,
      sprint: f.holding('R1'),
      precision: f.holding('R2'),
      trick: f.holding('L2'),
      cmds
    };
  }
}
