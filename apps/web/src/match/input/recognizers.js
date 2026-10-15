// Setiap kombo = FSM kecil. update(frame, konteks, emit, dt)

export class OneTwo {            // L1 + SOUTH, lalu NORTH dalam 1,5 detik
  s = 'idle';
  t = 0;
  update(f, ctx, emit) {
    if (this.s === 'wait') {
      if (f.t - this.t > 1500 || ctx === 'DEFEND') this.s = 'idle';
      else if (f.hit('NORTH')) { f.consume('NORTH'); emit('WALL_RETURN'); this.s = 'idle'; return; }
    }
    if (this.s === 'idle' && ctx === 'ATTACK_BALL' && f.holding('L1') && f.hit('SOUTH')) {
      f.consume('SOUTH'); emit('WALL_PASS'); this.s = 'wait'; this.t = f.t;
    }
  }
}

export class LobThrough {        // L1 + NORTH
  update(f, ctx, emit) {
    if ((ctx === 'ATTACK_BALL' || ctx === 'SET_PIECE') && f.holding('L1') && f.hit('NORTH')) {
      f.consume('NORTH'); emit('THROUGH', { lob: true });
    }
  }
}

export class ShootCharge {       // WEST tahan lalu lepas; R2 ditahan = finesse
  s = 'idle';
  power = 0;
  fin = false;
  update(f, ctx, emit, dt) {
    const can = ctx === 'ATTACK_BALL' || ctx === 'SET_PIECE';
    if (this.s === 'idle' && can && f.hit('WEST')) {
      f.consume('WEST'); this.s = 'charge'; this.power = 0; this.fin = false; emit('SHOOT_BEGIN');
    }
    if (this.s === 'charge') {
      this.power = Math.min(1.4, this.power + dt);
      this.fin = this.fin || f.holding('R2');
      if (!can) { this.s = 'idle'; emit('SHOOT_CANCEL'); }
      else if (f.released.has('WEST')) {
        emit('SHOOT', { power: this.power / 1.1, finesse: this.fin, aim: f.move });
        this.s = 'idle';
      }
    }
  }
}

export class DoublePress {       // tahan SOUTH (pressing) + tap WEST (minta bantuan rekan)
  s = 'idle';
  update(f, ctx, emit) {
    const active = ctx === 'DEFEND' && f.holding('SOUTH');
    if (!active) {
      if (this.s === 'called') emit('TEAMMATE_PRESS_END');
      this.s = 'idle';
      return;
    }
    if (f.hit('SOUTH')) f.consume('SOUTH');
    emit('PRESS');               // berbasis level: berlaku selama ditahan
    if (this.s === 'idle' && f.hit('WEST')) { f.consume('WEST'); emit('TEAMMATE_PRESS'); this.s = 'called'; }
  }
}

export class L1Tap {             // tap singkat = ganti kursor; ditahan + kombo = modifikator
  t = 0;
  mod = false;
  update(f, ctx, emit) {
    if (f.hit('L1')) { this.t = f.t; this.mod = false; }
    if (f.holding('L1') && f.used.size) this.mod = true;
    if (f.released.has('L1') && !this.mod && f.t - this.t < 180 && ctx === 'ATTACK_BALL') emit('SWITCH');
  }
}
