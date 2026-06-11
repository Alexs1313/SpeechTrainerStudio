import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioShadow/SpeechTrainerStudioShadow';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';

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
    description: 'Spend Microphones in the Shop to unlock premium texts.',
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
        style={styles.speechTrainerStudioScroll}
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.speechTrainerStudioEyebrow}>Speaking Challenge</Text>
        <Text style={styles.speechTrainerStudioTitle}>Mini Game</Text>

        <View style={styles.speechTrainerStudioHeroCard}>
          <LinearGradient
            colors={['#1a0845', '#2d1070', '#1a0845']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.speechTrainerStudioHeroGradient}>
            <View style={styles.speechTrainerStudioHeroInner}>
              <Text style={styles.speechTrainerStudioHeroEmoji}>🎮</Text>
              <Text style={styles.speechTrainerStudioHeroTitle}>The 60-Second Challenge</Text>
              <Text style={styles.speechTrainerStudioHeroBody}>
                You will receive a shuffled speaking topic. Write a short speech or
                mini-essay in just 60 seconds. I will evaluate your performance.
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.speechTrainerStudioSectionTitle}>How it works</Text>

        <View style={styles.speechTrainerStudioSteps}>
          {STEPS.map(step => (
            <View
              key={step.title}
              style={[styles.speechTrainerStudioStepCard, step.highlight && styles.speechTrainerStudioStepHighlight]}>
              <View style={styles.speechTrainerStudioStepInner}>
                <Text style={styles.speechTrainerStudioStepEmoji}>{step.emoji}</Text>
                <View style={styles.speechTrainerStudioStepBody}>
                  <Text style={styles.speechTrainerStudioStepTitle}>{step.title}</Text>
                  <Text style={styles.speechTrainerStudioStepDescription}>{step.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Pressable onPress={onStart} style={styles.speechTrainerStudioStartWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.speechTrainerStudioStartButton}>
            <Text style={styles.speechTrainerStudioStartText}>Start Challenge</Text>
            <Text style={styles.speechTrainerStudioStartChevron}>›</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioScroll: {flex: 1},
  speechTrainerStudioContent: {paddingHorizontal: 20},
  speechTrainerStudioEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  speechTrainerStudioHeroCard: {
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
  speechTrainerStudioHeroGradient: {borderRadius: 24},
  speechTrainerStudioHeroInner: {
    padding: 24,
    alignItems: 'center',
  },
  speechTrainerStudioHeroEmoji: {
    fontSize: 64,
    lineHeight: 72,
    marginBottom: 8,
  },
  speechTrainerStudioHeroTitle: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 24,
    lineHeight: 31,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  speechTrainerStudioHeroBody: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  speechTrainerStudioSectionTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  speechTrainerStudioSteps: {gap: 12, marginBottom: 24},
  speechTrainerStudioStepCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  speechTrainerStudioStepHighlight: {
    borderColor: colors.coachTipBorder,
    backgroundColor: colors.coachTipBackground,
  },
  speechTrainerStudioStepInner: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  speechTrainerStudioStepEmoji: {fontSize: 24, lineHeight: 36},
  speechTrainerStudioStepBody: {flex: 1},
  speechTrainerStudioStepTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  speechTrainerStudioStepDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  speechTrainerStudioStartWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  speechTrainerStudioStartButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  speechTrainerStudioStartText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 16,
    color: colors.white,
  },
  speechTrainerStudioStartChevron: {
    fontSize: 18,
    color: colors.white,
    marginTop: -2,
  },
});
