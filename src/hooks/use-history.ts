import { useEffect, useState } from "react";
import type { HistoryEntry } from "@/lib/types";

const KEY = "rdb_history_v1";
const MAX = 60;

function read(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry: HistoryEntry) {
  if (typeof window === "undefined") return;
  const list = read();
  // Replace existing entry for same date+meal, otherwise prepend
  const filtered = list.filter(
    (e) => !(e.date === entry.date && e.meal === entry.meal)
  );
  const next = [entry, ...filtered].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
}

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setEntries(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { entries };
}
