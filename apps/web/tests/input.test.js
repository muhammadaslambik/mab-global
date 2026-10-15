import test from 'node:test';
import assert from 'node:assert/strict';
import { Frame, IntentBuilder, PlayerFSM } from '../src/match/input/index.js';

const F = (t, held = [], pressed = [], released = [], move = { x: 0, y: 0 }) =>
  new Frame(t, move, new Set(held), new Set(pressed), new Set(released));
const types = (i) => i.cmds.map((c) => c.type);
const DT = 1 / 60;

test('one-two: L1+SOUTH lalu NORTH', () => {
  const b = new IntentBuilder();
  assert.deepEqual(types(b.build(F(0, ['L1', 'SOUTH'], ['L1', 'SOUTH']), 'ATTACK_BALL', DT)), ['WALL_PASS']);
  assert.deepEqual(types(b.build(F(300, ['NORTH'], ['NORTH']), 'ATTACK_OFF', DT)), ['WALL_RETURN']);
});
test('one-two kedaluwarsa setelah 1,5 detik', () => {
  const b = new IntentBuilder();
  b.build(F(0, ['L1', 'SOUTH'], ['L1', 'SOUTH']), 'ATTACK_BALL', DT);
  assert.deepEqual(types(b.build(F(1700, ['NORTH'], ['NORTH']), 'ATTACK_OFF', DT)), ['CALL_THROUGH']);
});
test('lob through (L1+NORTH) dan terobosan biasa', () => {
  const b = new IntentBuilder();
  assert.deepEqual(b.build(F(0, ['L1', 'NORTH'], ['NORTH']), 'ATTACK_BALL', DT).cmds, [{ type: 'THROUGH', lob: true }]);
  assert.deepEqual(b.build(F(100, ['NORTH'], ['NORTH']), 'ATTACK_BALL', DT).cmds, [{ type: 'THROUGH' }]);
});
test('finesse: WEST ditahan, R2 ditahan, WEST dilepas', () => {
  const b = new IntentBuilder();
  assert.deepEqual(types(b.build(F(0, ['WEST'], ['WEST']), 'ATTACK_BALL', 0.1)), ['SHOOT_BEGIN']);
  b.build(F(100, ['WEST', 'R2']), 'ATTACK_BALL', 0.1);
  const out = b.build(F(200, [], [], ['WEST']), 'ATTACK_BALL', 0.1).cmds[0];
  assert.equal(out.type, 'SHOOT');
  assert.equal(out.finesse, true);
});
test('tembakan biasa tidak finesse', () => {
  const b = new IntentBuilder();
  b.build(F(0, ['WEST'], ['WEST']), 'ATTACK_BALL', 0.1);
  const out = b.build(F(100, [], [], ['WEST']), 'ATTACK_BALL', 0.1).cmds[0];
  assert.equal(out.finesse, false);
});
test('bertahan: pressing + bantuan rekan (double press)', () => {
  const b = new IntentBuilder();
  assert.deepEqual(types(b.build(F(0, ['SOUTH'], ['SOUTH']), 'DEFEND', DT)), ['PRESS']);
  assert.deepEqual(types(b.build(F(50, ['SOUTH', 'WEST'], ['WEST']), 'DEFEND', DT)), ['PRESS', 'TEAMMATE_PRESS']);
  assert.deepEqual(types(b.build(F(100, [], [], ['SOUTH']), 'DEFEND', DT)), ['TEAMMATE_PRESS_END']);
});
test('konteks bertahan memetakan EAST=tekel dan NORTH=kiper maju', () => {
  const b = new IntentBuilder();
  assert.deepEqual(types(b.build(F(0, ['EAST'], ['EAST']), 'DEFEND', DT)), ['SLIDE']);
  assert.deepEqual(types(b.build(F(10, ['NORTH'], ['NORTH']), 'DEFEND', DT)), ['GK_CHARGE']);
});
test('L1: tap = ganti kursor, tahan lama atau dipakai kombo = tidak', () => {
  let b = new IntentBuilder();
  b.build(F(0, ['L1'], ['L1']), 'ATTACK_BALL', DT);
  assert.deepEqual(types(b.build(F(100, [], [], ['L1']), 'ATTACK_BALL', DT)), ['SWITCH']);
  b = new IntentBuilder();
  b.build(F(0, ['L1'], ['L1']), 'ATTACK_BALL', DT);
  assert.deepEqual(types(b.build(F(400, [], [], ['L1']), 'ATTACK_BALL', DT)), []);
});
test('FSM: perintah dibuffer sampai pemain boleh bertindak, lalu kedaluwarsa', () => {
  const log = [];
  const sim = { execute: (c) => { log.push(c.type); return 'LOCOMOTION'; } };
  const fsm = new PlayerFSM();
  fsm.state = 'SLIDE_RECOVER';
  fsm.feed({ cmds: [{ type: 'SHOOT_BEGIN' }], move: { x: 0, y: 0 } }, 0, sim);
  assert.deepEqual(log, []);
  fsm.state = 'LOCOMOTION';
  fsm.feed({ cmds: [], move: { x: 0, y: 0 } }, 100, sim);
  assert.deepEqual(log, ['SHOOT_BEGIN']);
  const fsm2 = new PlayerFSM();
  fsm2.state = 'SLIDE_RECOVER';
  fsm2.feed({ cmds: [{ type: 'LOB' }], move: { x: 0, y: 0 } }, 0, sim);
  fsm2.state = 'LOCOMOTION';
  fsm2.feed({ cmds: [], move: { x: 0, y: 0 } }, 400, sim);
  assert.deepEqual(log, ['SHOOT_BEGIN']);
});
