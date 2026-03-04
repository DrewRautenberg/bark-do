import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { AppContext } from '../context/AppContext'
import { AuthContext } from '../context/AuthContext'
import { initialState } from '../context/reducer'
import type { AppState } from '../types'
import type { Action } from '../context/reducer'
import type { Dispatch } from 'react'
import type { User } from '@supabase/supabase-js'

interface ProvidersOptions {
  stateOverrides?: Partial<AppState>
  dispatch?: Dispatch<Action>
  authOverrides?: {
    user?: User | null
    authLoading?: boolean
  }
}

function makeProviders(options: ProvidersOptions = {}) {
  const state: AppState = { ...initialState, ...options.stateOverrides }
  const dispatch = options.dispatch ?? vi.fn()
  const authValue = {
    user: options.authOverrides?.user ?? null,
    authLoading: options.authOverrides?.authLoading ?? false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  }

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AuthContext.Provider value={authValue}>
        <AppContext.Provider value={{ state, dispatch }}>
          {children}
        </AppContext.Provider>
      </AuthContext.Provider>
    )
  }

  return { Wrapper, dispatch, state }
}

export function renderWithProviders(
  ui: ReactNode,
  options: ProvidersOptions & { renderOptions?: RenderOptions } = {}
) {
  const { Wrapper, dispatch, state } = makeProviders(options)
  const result = render(ui, { wrapper: Wrapper, ...options.renderOptions })
  return { ...result, dispatch, state }
}
