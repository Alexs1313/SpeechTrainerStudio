import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {GameChallengeResult} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioGame/SpeechTrainerStudioGame/SpeechTrainerStudioGame';
import {formatGameTime} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioGame/SpeechTrainerStudioGameEvaluation/SpeechTrainerStudioGameEvaluation';
import {colors, fonts, speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

type Props = {
  result: GameChallengeResult;
  onBack: () => void;
  onPlayAgain: () => void;
};

export function GameResultsScreen({result, onBack, onPlayAgain}: Props) {
  const insets = useSafeAreaInsets();
  const isGood = result.grade === 'good';

  return (
    <AppBackground>
      <ScrollView
        style={styles.GameResultsScreenScroll}
        contentContainerStyle={[
          styles.GameResultsScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.GameResultsScreenHeader}>
          <Pressable onPress={onBack} style={styles.GameResultsScreenBackButton} hitSlop={8}>
            <Text style={styles.GameResultsScreenBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.GameResultsScreenHeaderTitle}>Results</Text>
          <View style={styles.GameResultsScreenHeaderSpacer} />
        </View>

        <View style={styles.GameResultsScreenHeroCard}>
          <LinearGradient
            colors={
              isGood
                ? ['rgba(21, 128, 61, 0.25)', 'rgba(22, 163, 74, 0.15)']
                : ['rgba(220, 38, 38, 0.2)', 'rgba(239, 68, 68, 0.1)']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              styles.GameResultsScreenHeroGradient,
              isGood ? styles.GameResultsScreenHeroGood : styles.GameResultsScreenHeroBad,
            ]}>
            <View style={styles.GameResultsScreenHeroInner}>
              <Text style={styles.GameResultsScreenHeroEmoji}>{isGood ? '🏆' : '😤'}</Text>
              <Text
                style={[styles.GameResultsScreenHeroTitle, isGood ? styles.GameResultsScreenGoodText : styles.GameResultsScreenBadText]}>
                {isGood ? 'Great Job!' : 'Keep Going!'}
              </Text>
              {isGood && (
                <View style={styles.GameResultsScreenRewardBadge}>
                  <Text style={styles.GameResultsScreenRewardEmoji}>🎤</Text>
                  <Text style={styles.GameResultsScreenRewardText}>+3 Microphones earned!</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.GameResultsScreenStatsRow}>
          <StatCard label="Words" value={String(result.wordCount)} />
          <StatCard label="Time" value={formatGameTime(result.durationMs)} />
          <StatCard label="Balance" value={`${result.balance} 🎤`} />
        </View>

        <View style={styles.GameResultsScreenTopicCard}>
          <View style={styles.GameResultsScreenTopicInner}>
            <Text style={styles.GameResultsScreenTopicLabel}>Topic</Text>
            <Text style={styles.GameResultsScreenTopicText}>{result.topic}</Text>
          </View>
        </View>

        <View style={styles.GameResultsScreenFeedbackCard}>
          <LinearGradient
            colors={['rgba(109, 40, 217, 0.2)', 'rgba(139, 92, 246, 0.1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.GameResultsScreenFeedbackGradient}>
            <View style={styles.GameResultsScreenFeedbackInner}>
              <View style={styles.GameResultsScreenFeedbackHeader}>
                <Text style={styles.GameResultsScreenFeedbackEmoji}>🎙️</Text>
                <Text style={styles.GameResultsScreenFeedbackName}>Coach Marcus</Text>
              </View>
              <Text style={styles.GameResultsScreenFeedbackText}>{result.coachFeedback}</Text>
            </View>
          </LinearGradient>
        </View>

        <Pressable onPress={onPlayAgain} style={styles.GameResultsScreenPlayWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.GameResultsScreenPlayButton}>
            <Text style={styles.GameResultsScreenPlayIcon}>↻</Text>
            <Text style={styles.GameResultsScreenPlayText}>Play Again</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </AppBackground>
  );
}

function StatCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.GameResultsScreenStatCard}>
      <Text style={styles.GameResultsScreenStatValue}>{value}</Text>
      <Text style={styles.GameResultsScreenStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  GameResultsScreenScroll: {flex: 1},
  GameResultsScreenContent: {paddingHorizontal: 20},
  GameResultsScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  GameResultsScreenBackButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  GameResultsScreenBackIcon: {
    fontSize: 24,
    color: colors.textSecondary,
    lineHeight: 26,
    marginTop: -2,
  },
  GameResultsScreenHeaderTitle: {
    flex: 1,
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  GameResultsScreenHeaderSpacer: {width: 36},
  GameResultsScreenHeroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  GameResultsScreenHeroGradient: {borderRadius: 24, borderWidth: 1},
  GameResultsScreenHeroGood: {borderColor: 'rgba(22, 163, 74, 0.3)'},
  GameResultsScreenHeroBad: {borderColor: 'rgba(239, 68, 68, 0.25)'},
  GameResultsScreenHeroInner: {
    padding: 28,
    alignItems: 'center',
  },
  GameResultsScreenHeroEmoji: {
    fontSize: 64,
    lineHeight: 72,
    marginBottom: 8,
  },
  GameResultsScreenHeroTitle: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 32,
    lineHeight: 42,
    marginBottom: 12,
  },
  GameResultsScreenGoodText: {color: colors.success},
  GameResultsScreenBadText: {color: colors.danger},
  GameResultsScreenRewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  GameResultsScreenRewardEmoji: {fontSize: 18},
  GameResultsScreenRewardText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 16,
    color: colors.coachTipText,
  },
  GameResultsScreenStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  GameResultsScreenStatCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 12,
    alignItems: 'center',
  },
  GameResultsScreenStatValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 18,
    lineHeight: 27,
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  GameResultsScreenStatLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  GameResultsScreenTopicCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    marginBottom: 20,
    overflow: 'hidden',
  },
  GameResultsScreenTopicInner: {padding: 16},
  GameResultsScreenTopicLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 0.88,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  GameResultsScreenTopicText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  GameResultsScreenFeedbackCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  GameResultsScreenFeedbackGradient: {borderRadius: 16},
  GameResultsScreenFeedbackInner: {padding: 20},
  GameResultsScreenFeedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  GameResultsScreenFeedbackEmoji: {fontSize: 20},
  GameResultsScreenFeedbackName: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  GameResultsScreenFeedbackText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  GameResultsScreenPlayWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  GameResultsScreenPlayButton: {
    height: 55,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  GameResultsScreenPlayIcon: {
    fontSize: 16,
    color: colors.white,
  },
  GameResultsScreenPlayText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.white,
  },
});
