import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {GAME_TOPICS} from '../../constants/gameTopics';
import {GameChallengeResult, GameScreen} from '../../types/game';
import {buildGameResult, pickShuffleTopic} from '../../utils/gameEvaluation';
import {
  addMicrophones,
  loadMicrophoneBalance,
} from '../../utils/microphoneStorage';
import {countWords} from '../../utils/wordCount';
import {GameChallengeScreen} from '../../screens/GameChallengeScreen';
import {GameHomeScreen} from '../../screens/GameHomeScreen';
import {GameResultsScreen} from '../../screens/GameResultsScreen';
import {colors} from '../../constants/theme';

export function GameStack() {
  const [screen, setScreen] = useState<GameScreen>('home');
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
    setScreen('challenge');
  }, []);

  const handleSubmit = useCallback(
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
      setScreen('results');
    },
    [balance, topic],
  );

  const handleBack = useCallback(() => {
    setResult(null);
    setScreen('home');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setResult(null);
    startChallenge();
  }, [startChallenge]);

  if (loading) {
    return (
      <View style={styles.GameStackLoading}>
        <ActivityIndicator color={colors.tabActive} />
      </View>
    );
  }

  if (screen === 'challenge' && topic) {
    return <GameChallengeScreen topic={topic} onSubmit={handleSubmit} />;
  }

  if (screen === 'results' && result) {
    return (
      <GameResultsScreen
        result={result}
        onBack={handleBack}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return <GameHomeScreen onStart={startChallenge} />;
}

const styles = StyleSheet.create({
  GameStackLoading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
