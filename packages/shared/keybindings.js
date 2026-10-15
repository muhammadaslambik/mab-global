// Sumber tunggal skema tombol. Slot = posisi tombol (bukan nama), supaya
// "X" di keyboard dan "X" di gamepad Xbox tidak tertukar.
export const KEYBINDINGS = {
  key: {
    ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
    KeyX: 'SOUTH', KeyA: 'WEST', KeyD: 'EAST', KeyW: 'NORTH',
    KeyQ: 'L1', KeyE: 'R1', KeyZ: 'L2', KeyC: 'R2'
  },
  // Gamepad layout standar: 0=A/Silang, 1=B/Lingkaran, 2=X/Kotak, 3=Y/Segitiga
  pad: { 0: 'SOUTH', 2: 'WEST', 1: 'EAST', 3: 'NORTH', 4: 'L1', 5: 'R1', 6: 'L2', 7: 'R2' }
};
