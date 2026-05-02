export interface Notification {
  ID: string;
  Type: 'Event' | 'Result' | 'Placement';
  Message: string;
  Timestamp: string;
}
export interface ScoredNotification extends Notification {
  score: number;
}
const WEIGHT: Record<string, number> = { Placement: 3, Result: 2, Event: 1 };
export function calculateScore(n: Notification): number {
  const weight = WEIGHT[n.Type] ?? 1;
  const ageHours = (Date.now() - new Date(n.Timestamp).getTime()) / 3600000;
  return weight * (1 / (1 + ageHours));
}
class MinHeap {
  private data: ScoredNotification[] = [];
  private cap: number;
  constructor(cap: number) { this.cap = cap; }
  private p = (i: number) => Math.floor((i - 1) / 2);
  private l = (i: number) => 2 * i + 1;
  private r = (i: number) => 2 * i + 2;
  private swap(i: number, j: number) { [this.data[i], this.data[j]] = [this.data[j], this.data[i]]; }
  private up(i: number) {
    while (i > 0 && this.data[this.p(i)].score > this.data[i].score) {
      this.swap(i, this.p(i)); i = this.p(i);
    }
  }
  private down(i: number) {
    const n = this.data.length;
    while (true) {
      let m = i;
      if (this.l(i) < n && this.data[this.l(i)].score < this.data[m].score) m = this.l(i);
      if (this.r(i) < n && this.data[this.r(i)].score < this.data[m].score) m = this.r(i);
      if (m === i) break;
      this.swap(i, m); i = m;
    }
  }
  insert(item: ScoredNotification) {
    if (this.data.length < this.cap) { this.data.push(item); this.up(this.data.length - 1); }
    else if (this.data[0] && item.score > this.data[0].score) { this.data[0] = item; this.down(0); }
  }
  toSorted(): ScoredNotification[] { return [...this.data].sort((a, b) => b.score - a.score); }
}
export function getTopN(notifications: Notification[], n = 10): ScoredNotification[] {
  const heap = new MinHeap(n);
  for (const notif of notifications) heap.insert({ ...notif, score: calculateScore(notif) });
  return heap.toSorted();
}
