import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioShadow/SpeechTrainerStudioShadow';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {GameChallengeResult} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioGame/SpeechTrainerStudioGame/SpeechTrainerStudioGame';
import {formatGameTime} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioGame/SpeechTrainerStudioGameEvaluation/SpeechTrainerStudioGameEvaluation';

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
        style={styles.speechTrainerStudioScroll}
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.speechTrainerStudioHeader}>
          <Pressable onPress={onBack} style={styles.speechTrainerStudioBackButton} hitSlop={8}>
            <Text style={styles.speechTrainerStudioBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.speechTrainerStudioHeaderTitle}>Results</Text>
          <View style={styles.speechTrainerStudioHeaderSpacer} />
        </View>

        <View style={styles.speechTrainerStudioHeroCard}>
          <LinearGradient
            colors={
              isGood
                ? ['rgba(21, 128, 61, 0.25)', 'rgba(22, 163, 74, 0.15)']
                : ['rgba(220, 38, 38, 0.2)', 'rgba(239, 68, 68, 0.1)']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              styles.speechTrainerStudioHeroGradient,
              isGood ? styles.speechTrainerStudioHeroGood : styles.speechTrainerStudioHeroBad,
            ]}>
            <View style={styles.speechTrainerStudioHeroInner}>
              <Text style={styles.speechTrainerStudioHeroEmoji}>{isGood ? '🏆' : '😤'}</Text>
              <Text
                style={[styles.speechTrainerStudioHeroTitle, isGood ? styles.speechTrainerStudioGoodText : styles.speechTrainerStudioBadText]}>
                {isGood ? 'Great Job!' : 'Keep Going!'}
              </Text>
              {isGood && (
                <View style={styles.speechTrainerStudioRewardBadge}>
                  <Text style={styles.speechTrainerStudioRewardEmoji}>🎤</Text>
                  <Text style={styles.speechTrainerStudioRewardText}>+3 Microphones earned!</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.speechTrainerStudioStatsRow}>
          <StatCard label="Words" value={String(result.wordCount)} />
          <StatCard label="Time" value={formatGameTime(result.durationMs)} />
          <StatCard label="Balance" value={`${result.balance} 🎤`} />
        </View>

        <View style={styles.speechTrainerStudioTopicCard}>
          <View style={styles.speechTrainerStudioTopicInner}>
            <Text style={styles.speechTrainerStudioTopicLabel}>Topic</Text>
            <Text style={styles.speechTrainerStudioTopicText}>{result.topic}</Text>
          </View>
        </View>

        <View style={styles.speechTrainerStudioFeedbackCard}>
          <LinearGradient
            colors={['rgba(109, 40, 217, 0.2)', 'rgba(139, 92, 246, 0.1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.speechTrainerStudioFeedbackGradient}>
            <View style={styles.speechTrainerStudioFeedbackInner}>
              <View style={styles.speechTrainerStudioFeedbackHeader}>
                <Text style={styles.speechTrainerStudioFeedbackEmoji}>🎙️</Text>
                <Text style={styles.speechTrainerStudioFeedbackName}>Coach Marcus</Text>
              </View>
              <Text style={styles.speechTrainerStudioFeedbackText}>{result.coachFeedback}</Text>
            </View>
          </LinearGradient>
        </View>

        <Pressable onPress={onPlayAgain} style={styles.speechTrainerStudioPlayWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.speechTrainerStudioPlayButton}>
            <Text style={styles.speechTrainerStudioPlayIcon}>↻</Text>
            <Text style={styles.speechTrainerStudioPlayText}>Play Again</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </AppBackground>
  );
}

function StatCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.speechTrainerStudioStatCard}>
      <Text style={styles.speechTrainerStudioStatValue}>{value}</Text>
      <Text style={styles.speechTrainerStudioStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioScroll: {flex: 1},
  speechTrainerStudioContent: {paddingHorizontal: 20},
  speechTrainerStudioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  speechTrainerStudioBackButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioBackIcon: {
    fontSize: 24,
    color: colors.textSecondary,
    lineHeight: 26,
    marginTop: -2,
  },
  speechTrainerStudioHeaderTitle: {
    flex: 1,
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  speechTrainerStudioHeaderSpacer: {width: 36},
  speechTrainerStudioHeroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  speechTrainerStudioHeroGradient: {borderRadius: 24, borderWidth: 1},
  speechTrainerStudioHeroGood: {borderColor: 'rgba(22, 163, 74, 0.3)'},
  speechTrainerStudioHeroBad: {borderColor: 'rgba(239, 68, 68, 0.25)'},
  speechTrainerStudioHeroInner: {
    padding: 28,
    alignItems: 'center',
  },
  speechTrainerStudioHeroEmoji: {
    fontSize: 64,
    lineHeight: 72,
    marginBottom: 8,
  },
  speechTrainerStudioHeroTitle: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 32,
    lineHeight: 42,
    marginBottom: 12,
  },
  speechTrainerStudioGoodText: {color: colors.success},
  speechTrainerStudioBadText: {color: colors.danger},
  speechTrainerStudioRewardBadge: {
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
  speechTrainerStudioRewardEmoji: {fontSize: 18},
  speechTrainerStudioRewardText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 16,
    color: colors.coachTipText,
  },
  speechTrainerStudioStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  speechTrainerStudioStatCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 12,
    alignItems: 'center',
  },
  speechTrainerStudioStatValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 18,
    lineHeight: 27,
    color: colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  speechTrainerStudioStatLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  speechTrainerStudioTopicCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    marginBottom: 20,
    overflow: 'hidden',
  },
  speechTrainerStudioTopicInner: {padding: 16},
  speechTrainerStudioTopicLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 0.88,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  speechTrainerStudioTopicText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  speechTrainerStudioFeedbackCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  speechTrainerStudioFeedbackGradient: {borderRadius: 16},
  speechTrainerStudioFeedbackInner: {padding: 20},
  speechTrainerStudioFeedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  speechTrainerStudioFeedbackEmoji: {fontSize: 20},
  speechTrainerStudioFeedbackName: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  speechTrainerStudioFeedbackText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  speechTrainerStudioPlayWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  speechTrainerStudioPlayButton: {
    height: 55,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  speechTrainerStudioPlayIcon: {
    fontSize: 16,
    color: colors.white,
  },
  speechTrainerStudioPlayText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.white,
  },
});
