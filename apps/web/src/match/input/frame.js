export class Frame {
  constructor(t, move, held, pressed, released) {
    this.t = t;
    this.move = move;
    this.held = held;
    this.pressed = pressed;
    this.released = released;
    this.used = new Set();
  }
  hit(slot) { return this.pressed.has(slot) && !this.used.has(slot); }   // tepi yang belum dikonsumsi
  consume(slot) { this.used.add(slot); }
  holding(slot) { return this.held.has(slot); }
}
