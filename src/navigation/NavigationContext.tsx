import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {AppOverlay, AppPhase, MainTab} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  activeTab: MainTab;
  overlay: AppOverlay;
  finishLoader: () => void;
  finishOnboarding: () => void;
  selectTab: (tab: MainTab) => void;
  goBack: () => void;
  closeOverlay: () => void;
  openPrompterConfigure: () => void;
  openPrompterSession: () => void;
  openPrompterResults: () => void;
  openWorkshopEditor: () => void;
  openBlogArticle: (articleId: string) => void;
  openGameChallenge: () => void;
  openGameResults: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhase] = useState<AppPhase>('Loader');
  const [activeTab, setActiveTab] = useState<MainTab>('PrompterTab');
  const [overlay, setOverlay] = useState<AppOverlay>({type: 'none'});

  const finishLoader = useCallback(() => {
    setPhase('Onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('Main');
  }, []);

  const selectTab = useCallback((tab: MainTab) => {
    setActiveTab(tab);
    setOverlay({type: 'none'});
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay({type: 'none'});
  }, []);

  const goBack = useCallback(() => {
    setOverlay(current => {
      if (current.type === 'PrompterConfigure') {
        return {type: 'none'};
      }
      if (current.type === 'PrompterSession') {
        return {type: 'PrompterConfigure'};
      }
      if (current.type === 'PrompterResults') {
        return {type: 'none'};
      }
      if (current.type === 'WorkshopEditor') {
        return {type: 'none'};
      }
      if (current.type === 'BlogArticle') {
        return {type: 'none'};
      }
      if (current.type === 'GameChallenge') {
        return {type: 'none'};
      }
      if (current.type === 'GameResults') {
        return {type: 'none'};
      }
      return {type: 'none'};
    });
  }, []);

  const openPrompterConfigure = useCallback(() => {
    setOverlay({type: 'PrompterConfigure'});
  }, []);

  const openPrompterSession = useCallback(() => {
    setOverlay({type: 'PrompterSession'});
  }, []);

  const openPrompterResults = useCallback(() => {
    setOverlay({type: 'PrompterResults'});
  }, []);

  const openWorkshopEditor = useCallback(() => {
    setOverlay({type: 'WorkshopEditor'});
  }, []);

  const openBlogArticle = useCallback((articleId: string) => {
    setOverlay({type: 'BlogArticle', articleId});
  }, []);

  const openGameChallenge = useCallback(() => {
    setOverlay({type: 'GameChallenge'});
  }, []);

  const openGameResults = useCallback(() => {
    setOverlay({type: 'GameResults'});
  }, []);

  const value = useMemo(
    () => ({
      phase,
      activeTab,
      overlay,
      finishLoader,
      finishOnboarding,
      selectTab,
      goBack,
      closeOverlay,
      openPrompterConfigure,
      openPrompterSession,
      openPrompterResults,
      openWorkshopEditor,
      openBlogArticle,
      openGameChallenge,
      openGameResults,
    }),
    [
      phase,
      activeTab,
      overlay,
      finishLoader,
      finishOnboarding,
      selectTab,
      goBack,
      closeOverlay,
      openPrompterConfigure,
      openPrompterSession,
      openPrompterResults,
      openWorkshopEditor,
      openBlogArticle,
      openGameChallenge,
      openGameResults,
    ],
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
