// Aksi dasar per konteks sebagai data, bukan rantai if-else.
export const BASE = {
  ATTACK_BALL: { SOUTH: 'PASS', WEST: 'SHOOT', EAST: 'LOB', NORTH: 'THROUGH' },
  ATTACK_OFF:  { SOUTH: 'CALL_PASS', WEST: 'CALL_SHOOT', EAST: 'CALL_LOB', NORTH: 'CALL_THROUGH', L1: 'SWITCH' },
  DEFEND:      { SOUTH: 'PRESS', WEST: 'TEAMMATE_PRESS', EAST: 'SLIDE', NORTH: 'GK_CHARGE', L1: 'SWITCH' },
  SET_PIECE:   { SOUTH: 'PASS', WEST: 'SHOOT', EAST: 'LOB', NORTH: 'THROUGH' }
};

export function contextOf(sim, p) {
  if (sim.restart?.taker === p) return 'SET_PIECE';
  if (sim.ball.owner === p) return 'ATTACK_BALL';
  return sim.ball.owner?.team === p.team ? 'ATTACK_OFF' : 'DEFEND';
}
