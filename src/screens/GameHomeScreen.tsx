import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../components/common/AppBackground';
import {colors, fonts, speechTrainerStudioShadow} from '../constants/theme';

type Step = {
  emoji: string;
  title: string;
  description: string;
  highlight?: boolean;
};

const STEPS: Step[] = [
  {
    emoji: '🎯',
    title: 'Get a shuffled topic',
    description: 'A speaking prompt appears — you cannot choose it.',
  },
  {
    emoji: '⏱️',
    title: '60 seconds to write',
    description:
      'Type your speech or mini-essay as fast and as well as you can.',
  },
  {
    emoji: '🎙️',
    title: 'Coach Marcus evaluates',
    description: 'I assess the quality and reward you based on your performance.',
  },
  {
    emoji: '🎤',
    title: 'Earn Microphones',
    description: 'Score Good to earn 3 Microphone coins for the Text Shop.',
  },
  {
    emoji: '🎤',
    title: 'Good result = +3 Microphones',
    description: 'Spend Microphones in the Shop to unlock advanced texts.',
    highlight: true,
  },
];

type Props = {
  onStart: () => void;
};

export function GameHomeScreen({onStart}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <AppBackground>
      <ScrollView
        style={styles.GameHomeScreenScroll}
        contentContainerStyle={[
          styles.GameHomeScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.GameHomeScreenEyebrow}>Speaking Challenge</Text>
        <Text style={styles.GameHomeScreenTitle}>Mini Game</Text>

        <View style={styles.GameHomeScreenHeroCard}>
          <LinearGradient
            colors={['#1a0845', '#2d1070', '#1a0845']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.GameHomeScreenHeroGradient}>
            <View style={styles.GameHomeScreenHeroInner}>
              <Text style={styles.GameHomeScreenHeroEmoji}>🎮</Text>
              <Text style={styles.GameHomeScreenHeroTitle}>The 60-Second Challenge</Text>
              <Text style={styles.GameHomeScreenHeroBody}>
                You will receive a shuffled speaking topic. Write a short speech or
                mini-essay in just 60 seconds. I will evaluate your performance.
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.GameHomeScreenSectionTitle}>How it works</Text>

        <View style={styles.GameHomeScreenSteps}>
          {STEPS.map(step => (
            <View
              key={step.title}
              style={[styles.GameHomeScreenStepCard, step.highlight && styles.GameHomeScreenStepHighlight]}>
              <View style={styles.GameHomeScreenStepInner}>
                <Text style={styles.GameHomeScreenStepEmoji}>{step.emoji}</Text>
                <View style={styles.GameHomeScreenStepBody}>
                  <Text style={styles.GameHomeScreenStepTitle}>{step.title}</Text>
                  <Text style={styles.GameHomeScreenStepDescription}>{step.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Pressable onPress={onStart} style={styles.GameHomeScreenStartWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.GameHomeScreenStartButton}>
            <Text style={styles.GameHomeScreenStartText}>Start Challenge</Text>
            <Text style={styles.GameHomeScreenStartChevron}>›</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  GameHomeScreenScroll: {flex: 1},
  GameHomeScreenContent: {paddingHorizontal: 20},
  GameHomeScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  GameHomeScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  GameHomeScreenHeroCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    overflow: 'hidden',
    marginBottom: 24,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.15,
      shadowRadius: 30,
      elevation: 6,
    }),
  },
  GameHomeScreenHeroGradient: {borderRadius: 24},
  GameHomeScreenHeroInner: {
    padding: 24,
    alignItems: 'center',
  },
  GameHomeScreenHeroEmoji: {
    fontSize: 64,
    lineHeight: 72,
    marginBottom: 8,
  },
  GameHomeScreenHeroTitle: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 24,
    lineHeight: 31,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  GameHomeScreenHeroBody: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  GameHomeScreenSectionTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  GameHomeScreenSteps: {gap: 12, marginBottom: 24},
  GameHomeScreenStepCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  GameHomeScreenStepHighlight: {
    borderColor: colors.coachTipBorder,
    backgroundColor: colors.coachTipBackground,
  },
  GameHomeScreenStepInner: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  GameHomeScreenStepEmoji: {fontSize: 24, lineHeight: 36},
  GameHomeScreenStepBody: {flex: 1},
  GameHomeScreenStepTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  GameHomeScreenStepDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  GameHomeScreenStartWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  GameHomeScreenStartButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  GameHomeScreenStartText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 16,
    color: colors.white,
  },
  GameHomeScreenStartChevron: {
    fontSize: 18,
    color: colors.white,
    marginTop: -2,
  },
});
