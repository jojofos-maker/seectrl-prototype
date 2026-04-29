// ============================================================================
// useToast — minimal toast-implementasjon for handlingsbekreftelse
// ============================================================================

import { useState, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, duration = 2200) => {
    setToast({ message, id: Date.now() });
    setTimeout(() => setToast(null), duration);
  }, []);

  return { toast, showToast };
}
