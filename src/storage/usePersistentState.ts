import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(key)
      .then((stored) => {
        if (stored && mounted) {
          const parsed = JSON.parse(stored) as T;
          const shouldMerge =
            typeof initialValue === "object" &&
            initialValue !== null &&
            !Array.isArray(initialValue) &&
            typeof parsed === "object" &&
            parsed !== null &&
            !Array.isArray(parsed);
          setValue(shouldMerge ? ({ ...(initialValue as object), ...(parsed as object) } as T) : parsed);
        }
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, [key]);

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;
        AsyncStorage.setItem(key, JSON.stringify(resolved)).catch(() => undefined);
        return resolved;
      });
    },
    [key]
  );

  return [value, update, ready] as const;
}
