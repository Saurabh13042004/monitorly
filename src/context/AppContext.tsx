import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Monitor {
  id: string;
  name: string;
  url: string;
  type: 'HTTP' | 'HTTPS';
  status: 'UP' | 'DOWN' | 'PAUSED';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  nextCheck: string;
  tags: string[];
}

interface AppState {
  user: {
    name: string;
    email: string;
    plan: 'Free' | 'Solo' | 'Team' | 'Enterprise';
  } | null;
  monitors: Monitor[];
  stats: {
    totalUptime: number;
    incidents: number;
    avgResponseTime: number;
  };
  isAuthenticated: boolean;
}

type AppAction = 
  | { type: 'LOGIN'; payload: AppState['user'] }
  | { type: 'LOGOUT' }
  | { type: 'ADD_MONITOR'; payload: Monitor }
  | { type: 'UPDATE_MONITOR'; payload: { id: string; data: Partial<Monitor> } }
  | { type: 'DELETE_MONITOR'; payload: string };

const initialState: AppState = {
  user: null,
  monitors: [
    {
      id: '1',
      name: 'Main Website',
      url: 'https://example.com',
      type: 'HTTPS',
      status: 'UP',
      uptime: 99.9,
      responseTime: 245,
      lastCheck: '2 minutes ago',
      nextCheck: 'in 3 minutes',
      tags: ['production', 'critical']
    },
    {
      id: '2',
      name: 'API Service',
      url: 'https://api.example.com',
      type: 'HTTPS',
      status: 'UP',
      uptime: 99.7,
      responseTime: 180,
      lastCheck: '1 minute ago',
      nextCheck: 'in 4 minutes',
      tags: ['api', 'production']
    },
    {
      id: '3',
      name: 'Blog',
      url: 'https://blog.example.com',
      type: 'HTTPS',
      status: 'DOWN',
      uptime: 98.2,
      responseTime: 0,
      lastCheck: '5 minutes ago',
      nextCheck: 'checking now',
      tags: ['blog']
    }
  ],
  stats: {
    totalUptime: 99.6,
    incidents: 3,
    avgResponseTime: 208
  },
  isAuthenticated: false
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'ADD_MONITOR':
      return {
        ...state,
        monitors: [...state.monitors, action.payload]
      };
    case 'UPDATE_MONITOR':
      return {
        ...state,
        monitors: state.monitors.map(monitor =>
          monitor.id === action.payload.id
            ? { ...monitor, ...action.payload.data }
            : monitor
        )
      };
    case 'DELETE_MONITOR':
      return {
        ...state,
        monitors: state.monitors.filter(monitor => monitor.id !== action.payload)
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}