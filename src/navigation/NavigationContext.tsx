import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {AppPhase, MainTab} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  activeTab: MainTab;
  finishLoader: () => void;
  finishOnboarding: () => void;
  selectTab: (tab: MainTab) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhase] = useState<AppPhase>('loading');
  const [activeTab, setActiveTab] = useState<MainTab>('Prompter');

  const finishLoader = useCallback(() => {
    setPhase('onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('main');
  }, []);

  const selectTab = useCallback((tab: MainTab) => {
    setActiveTab(tab);
  }, []);

  const value = useMemo(
    () => ({
      phase,
      activeTab,
      finishLoader,
      finishOnboarding,
      selectTab,
    }),
    [phase, activeTab, finishLoader, finishOnboarding, selectTab],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }
  return context;
}
