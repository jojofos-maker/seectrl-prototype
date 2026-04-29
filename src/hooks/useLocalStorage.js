// ============================================================================
// useLocalStorage — persistens for testbrukere som returnerer
// ============================================================================

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`localStorage lese-feil for "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`localStorage skrive-feil for "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
