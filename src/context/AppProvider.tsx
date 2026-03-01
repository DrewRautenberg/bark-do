import { useReducer, useEffect, useRef, type ReactNode } from 'react';
import { AppContext } from './AppContext';
import { reducer, initialState } from './reducer';

const STORAGE_KEY = 'bark-do-state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isHydrated = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
      } catch {
        // ignore malformed data
      }
    }
    isHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!isHydrated.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
