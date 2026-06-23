import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {GAME_TOPICS} from '../constants/gameTopics';
import {GameChallengeResult} from '../types/game';
import {buildGameResult, pickShuffleTopic} from '../utils/gameEvaluation';
import {
  addMicrophones,
  loadMicrophoneBalance,
} from '../utils/microphoneStorage';
import {countWords} from '../utils/wordCount';
import {useAppNavigation} from '../navigation/NavigationContext';

type GameContextValue = {
  balance: number;
  topic: string;
  result: GameChallengeResult | null;
  loading: boolean;
  startChallenge: () => void;
  submitChallenge: (response: string, durationMs: number) => Promise<void>;
  resetToHome: () => void;
  tryAgain: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({children}: {children: React.ReactNode}) {
  const {openGameChallenge, openGameResults, closeOverlay} = useAppNavigation();
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<GameChallengeResult | null>(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMicrophoneBalance()
      .then(setBalance)
      .finally(() => setLoading(false));
  }, []);

  const startChallenge = useCallback(() => {
    setTopic(pickShuffleTopic(GAME_TOPICS));
    setResult(null);
    openGameChallenge();
  }, [openGameChallenge]);

  const submitChallenge = useCallback(
    async (response: string, durationMs: number) => {
      const wordCount = countWords(response);
      const gameResult = buildGameResult(
        topic,
        response,
        wordCount,
        durationMs,
        balance,
      );

      if (gameResult.microphonesEarned > 0) {
        const newBalance = await addMicrophones(gameResult.microphonesEarned);
        gameResult.balance = newBalance;
        setBalance(newBalance);
      }

      setResult(gameResult);
      openGameResults();
    },
    [balance, openGameResults, topic],
  );

  const resetToHome = useCallback(() => {
    setResult(null);
    setTopic('');
    closeOverlay();
  }, [closeOverlay]);

  const tryAgain = useCallback(() => {
    setResult(null);
    setTopic(pickShuffleTopic(GAME_TOPICS));
    openGameChallenge();
  }, [openGameChallenge]);

  const value = useMemo(
    () => ({
      balance,
      topic,
      result,
      loading,
      startChallenge,
      submitChallenge,
      resetToHome,
      tryAgain,
    }),
    [
      balance,
      topic,
      result,
      loading,
      startChallenge,
      submitChallenge,
      resetToHome,
      tryAgain,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
