const KEY = "viewed_notifications";
function getViewed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const s = localStorage.getItem(KEY);
    return s ? new Set(JSON.parse(s)) : new Set();
  } catch { return new Set(); }
}
function save(ids: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify([...ids]));
}
export function markAsViewed(id: string) {
  const v = getViewed(); v.add(id); save(v);
}
export function markAllAsViewed(ids: string[]) {
  const v = getViewed(); ids.forEach(id => v.add(id)); save(v);
}
export function isViewed(id: string): boolean {
  return getViewed().has(id);
}