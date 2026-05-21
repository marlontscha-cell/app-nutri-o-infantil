import { useEffect, useState, useCallback } from "react";
import type { BabyProfile } from "@/lib/types";

const KEY = "rdb_baby_profile_v1";

export function readProfile(): BabyProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BabyProfile) : null;
  } catch {
    return null;
  }
}

export function useBabyProfile() {
  const [profile, setProfile] = useState<BabyProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setProfile(readProfile());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const save = useCallback((p: BabyProfile) => {
    localStorage.setItem(KEY, JSON.stringify(p));
    setProfile(p);
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(KEY);
    setProfile(null);
  }, []);

  return { profile, ready, save, clear };
}
