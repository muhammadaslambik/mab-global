// Kategori yang wajib persetujuan manusia sebelum dijalankan.
const RISKY = new Set(['publish', 'finance', 'customer-reply', 'store-order']);
export function needsApproval(task) {
  return RISKY.has(task.category);
}
