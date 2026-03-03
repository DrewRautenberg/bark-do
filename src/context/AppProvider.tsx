import { useReducer, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { AppContext } from './AppContext';
import { reducer, initialState, type Action } from './reducer';
import { useAuth } from './AuthContext';
import {
  fetchUserData,
  dbAddTask,
  dbUpdateTask,
  dbDeleteTask,
  dbAddProject,
  dbRenameProject,
  dbDeleteProject,
} from '../lib/db';
import type { AppState } from '../types';

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, rawDispatch] = useReducer(reducer, initialState);

  const prevState = useRef<AppState>(initialState);
  const lastAction = useRef<Action | null>(null);
  const stateRef = useRef<AppState>(initialState);
  stateRef.current = state;

  // Load data when user changes (login / logout)
  useEffect(() => {
    if (user) {
      fetchUserData()
        .then((data) => rawDispatch({ type: 'HYDRATE', payload: data }))
        .catch(console.error);
    } else {
      rawDispatch({ type: 'HYDRATE', payload: initialState });
    }
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Wrap dispatch to record previous state and action before each update
  const dispatch = useCallback((action: Action) => {
    prevState.current = stateRef.current;
    lastAction.current = action;
    rawDispatch(action);
  }, []);

  // After each state change, sync the last action to Supabase
  useEffect(() => {
    const action = lastAction.current;
    if (!action || !user) return;
    // Don't sync HYDRATE actions — those come from the DB
    if (action.type === 'HYDRATE') return;

    lastAction.current = null;

    const rollback = () => {
      rawDispatch({ type: 'HYDRATE', payload: prevState.current });
    };

    (async () => {
      try {
        switch (action.type) {
          case 'ADD_TASK':
            await dbAddTask(action.payload, user.id);
            break;
          case 'UPDATE_TASK':
            await dbUpdateTask(action.payload.id, action.payload.changes);
            break;
          case 'TOGGLE_DONE': {
            const task = prevState.current.tasks.find((t) => t.id === action.payload.id);
            if (task) await dbUpdateTask(action.payload.id, { done: !task.done });
            break;
          }
          case 'DELETE_TASK':
            await dbDeleteTask(action.payload.id);
            break;
          case 'ADD_PROJECT':
            await dbAddProject(action.payload, user.id);
            break;
          case 'RENAME_PROJECT':
            await dbRenameProject(action.payload.id, action.payload.name);
            break;
          case 'DELETE_PROJECT':
            await dbDeleteProject(action.payload.id);
            break;
        }
      } catch (err) {
        console.error('Supabase sync failed, rolling back:', err);
        rollback();
      }
    })();
  }, [state, user]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
