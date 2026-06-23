import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  PrompterCategoryId,
  PrompterText,
  SessionConfig,
  SessionResult,
} from '../types/prompter';
import {getUnlockedShopTextsFromStorage} from '../utils/shopStorage';
import {useAppNavigation} from '../navigation/NavigationContext';

type PrompterContextValue = {
  selectedCategoryId: PrompterCategoryId;
  unlockedTexts: PrompterText[];
  selectedText: PrompterText | null;
  sessionConfig: SessionConfig | null;
  sessionResult: SessionResult | null;
  setSelectedCategoryId: (id: PrompterCategoryId) => void;
  selectText: (text: PrompterText) => void;
  beginSession: (config: SessionConfig) => void;
  completeSession: (result: SessionResult) => void;
  resetPrompter: () => void;
  practiceAgain: () => void;
};

const PrompterContext = createContext<PrompterContextValue | null>(null);

export function PrompterProvider({children}: {children: React.ReactNode}) {
  const {activeTab, openPrompterConfigure, openPrompterSession, openPrompterResults} =
    useAppNavigation();
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<PrompterCategoryId>('public-speaking');
  const [unlockedTexts, setUnlockedTexts] = useState<PrompterText[]>([]);
  const [selectedText, setSelectedText] = useState<PrompterText | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  const refreshUnlockedTexts = useCallback(async () => {
    const texts = await getUnlockedShopTextsFromStorage();
    setUnlockedTexts(texts);
  }, []);

  useEffect(() => {
    if (activeTab === 'PrompterTab') {
      refreshUnlockedTexts();
    }
  }, [activeTab, refreshUnlockedTexts]);

  const selectText = useCallback(
    (text: PrompterText) => {
      setSelectedText(text);
      openPrompterConfigure();
    },
    [openPrompterConfigure],
  );

  const beginSession = useCallback(
    (config: SessionConfig) => {
      setSessionConfig(config);
      openPrompterSession();
    },
    [openPrompterSession],
  );

  const completeSession = useCallback(
    (result: SessionResult) => {
      setSessionResult(result);
      openPrompterResults();
    },
    [openPrompterResults],
  );

  const resetPrompter = useCallback(() => {
    setSelectedText(null);
    setSessionConfig(null);
    setSessionResult(null);
  }, []);

  const practiceAgain = useCallback(() => {
    setSessionResult(null);
    if (sessionConfig) {
      openPrompterSession();
    }
  }, [openPrompterSession, sessionConfig]);

  const value = useMemo(
    () => ({
      selectedCategoryId,
      unlockedTexts,
      selectedText,
      sessionConfig,
      sessionResult,
      setSelectedCategoryId,
      selectText,
      beginSession,
      completeSession,
      resetPrompter,
      practiceAgain,
    }),
    [
      selectedCategoryId,
      unlockedTexts,
      selectedText,
      sessionConfig,
      sessionResult,
      selectText,
      beginSession,
      completeSession,
      resetPrompter,
      practiceAgain,
    ],
  );

  return (
    <PrompterContext.Provider value={value}>
      {children}
    </PrompterContext.Provider>
  );
}

export function usePrompter() {
  const context = useContext(PrompterContext);
  if (!context) {
    throw new Error('usePrompter must be used within PrompterProvider');
  }
  return context;
}
