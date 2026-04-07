import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Space, PractitionerSpace, Segment } from '../data/mock-data'

// ── Types ─────────────────────────────────────────────────────

export type Persona = 'central-team' | 'space-admin' | 'practitioner'

export type Scope = 'environment' | 'space'

export interface AppState {
  createdSpaces: Space[]
  selectedSpace: PractitionerSpace | null
  persona: Persona
  /** Environment vs Space scope — persists across navigation */
  scope: Scope
  /** The currently active Space (for Space Admin when scope='space') */
  activeSpace: PractitionerSpace | null
  /** Active segment within the current Space (null = all data) */
  activeSegment: Segment | null
  hideSidebar: boolean
  wizardStep: number | null
  wizardGoToStep: ((step: number) => void) | null
}

const initialState: AppState = {
  createdSpaces: [],
  selectedSpace: null,
  persona: 'central-team',
  scope: 'space',
  activeSpace: null,
  activeSegment: null,
  hideSidebar: false,
  wizardStep: null,
  wizardGoToStep: null,
}

// ── Actions ───────────────────────────────────────────────────

type Action =
  | { type: 'ADD_SPACE'; payload: Space }
  | { type: 'SELECT_PRACTITIONER_SPACE'; payload: PractitionerSpace }
  | { type: 'SET_PERSONA'; payload: Persona }
  | { type: 'SET_SCOPE'; payload: Scope }
  | { type: 'SET_ACTIVE_SPACE'; payload: PractitionerSpace | null }
  | { type: 'SET_ACTIVE_SEGMENT'; payload: Segment | null }
  | { type: 'SET_HIDE_SIDEBAR'; payload: boolean }
  | { type: 'SET_WIZARD'; payload: { step: number; goToStep: (s: number) => void } | null }
  | { type: 'RESET' }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_SPACE':
      return { ...state, createdSpaces: [...state.createdSpaces, action.payload] }
    case 'SELECT_PRACTITIONER_SPACE':
      return { ...state, selectedSpace: action.payload }
    case 'SET_SCOPE':
      return { ...state, scope: action.payload }
    case 'SET_ACTIVE_SPACE':
      return { ...state, activeSpace: action.payload, activeSegment: null, scope: action.payload ? 'space' : state.scope }
    case 'SET_ACTIVE_SEGMENT':
      return { ...state, activeSegment: action.payload }
    case 'SET_PERSONA':
      return { ...state, persona: action.payload }
    case 'SET_HIDE_SIDEBAR':
      return { ...state, hideSidebar: action.payload }
    case 'SET_WIZARD':
      if (action.payload === null) return { ...state, wizardStep: null, wizardGoToStep: null }
      return { ...state, wizardStep: action.payload.step, wizardGoToStep: action.payload.goToStep }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
  hasSpaces: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const hasSpaces = state.createdSpaces.length > 0

  return (
    <AppContext.Provider value={{ state, dispatch, hasSpaces }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
