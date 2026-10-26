import type { SpecGroup } from "./types";

// Etiquetas que, en las tablas originales, son subfilas de una celda con rowspan (Pano, Ceph, Con/Sin CEPH, tamaños de FOV…)
const SUB_LABEL = /^(pano|ceph|cbct|ct|con\b|sin\b|\d)/i;

// Las tablas importadas llegan "aplanadas" (sin rowspan): se reagrupan en característica → [subetiqueta, valores]
export function groupSpecs(rows: string[][]): SpecGroup[] {
  const groups: SpecGroup[] = [];
  let current: SpecGroup | null = null;
  let grouped = false;
  for (const row of rows) {
    const cells = row.map((cell) => cell.trim()).filter(Boolean);
    if (!cells.length) continue;
    const lastItem = current?.items[current.items.length - 1];
    if (cells.length === 1 && lastItem) {
      lastItem.values.push(cells[0]);
    } else if (cells.length >= 3) {
      current = { key: cells[0], items: [{ label: cells[1], values: cells.slice(2) }] };
      groups.push(current);
      grouped = true;
    } else if (cells.length === 2 && grouped && current && SUB_LABEL.test(cells[0])) {
      current.items.push({ label: cells[0], values: [cells[1]] });
    } else {
      current = { key: cells[0], items: [{ values: cells.slice(1) }] };
      groups.push(current);
      grouped = false;
    }
  }
  return groups;
}
