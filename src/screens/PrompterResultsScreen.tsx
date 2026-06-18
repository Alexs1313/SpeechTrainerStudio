import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../components/common/AppBackground';
import {SessionResult} from '../types/prompter';
import {formatDuration} from '../utils/formatDuration';
import {colors, fonts, speechTrainerStudioShadow} from '../constants/theme';

type Props = {
  result: SessionResult;
  onBack: () => void;
  onPracticeAgain: () => void;
  onChooseDifferent: () => void;
};

export function PrompterResultsScreen({
  result,
  onBack,
  onPracticeAgain,
  onChooseDifferent,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={[
          styles.PrompterResultsScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.PrompterResultsScreenHeader}>
          <Pressable
            onPress={onBack}
            style={styles.PrompterResultsScreenBackButton}>
            <Text style={styles.PrompterResultsScreenBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.PrompterResultsScreenHeaderTitle}>
            Session Results
          </Text>
        </View>

        <LinearGradient
          colors={['rgba(17, 8, 48, 0.9)', 'rgba(30, 16, 72, 0.7)']}
          style={styles.PrompterResultsScreenHeroCard}>
          <View
            style={{
              padding: 25,
              alignItems: 'center',
            }}>
            <Text style={styles.PrompterResultsScreenTrophy}>🏆</Text>
            <Text style={styles.PrompterResultsScreenRating}>Excellent</Text>
            <Text style={styles.PrompterResultsScreenSubtitle}>
              Text completed!
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.PrompterResultsScreenStatsGrid}>
          <StatCard
            label="Duration"
            value={`⏱️ ${formatDuration(result.durationMs)}`}
          />
          <StatCard
            label="Words/Min"
            value={`⚡ ~${result.wordsPerMinute} WPM`}
          />
          <StatCard label="Total Words" value={`📝 ${result.wordCount}`} />
          <StatCard label="Text" value={`🎤 ${result.text.title}`} tall />
        </View>

        <LinearGradient
          colors={['rgba(109, 40, 217, 0.2)', 'rgba(139, 92, 246, 0.1)']}
          style={styles.PrompterResultsScreenFeedbackCard}>
          <View style={styles.PrompterResultsScreenFeedbackHeader}>
            <Text style={styles.PrompterResultsScreenFeedbackEmoji}>🎙️</Text>
            <Text style={styles.PrompterResultsScreenFeedbackName}>
              Coach Marcus
            </Text>
          </View>
          <Text style={styles.PrompterResultsScreenFeedbackText}>
            Outstanding work! Your pace was confident and well-controlled. I
            could see the months of practice paying off in every paragraph. This
            is exactly the level of fluency I want you to bring to the stage.
          </Text>
        </LinearGradient>

        <Pressable
          onPress={onPracticeAgain}
          style={styles.PrompterResultsScreenPrimaryWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            style={styles.PrompterResultsScreenPrimaryButton}>
            <Text style={styles.PrompterResultsScreenPrimaryIcon}>▶</Text>
            <Text style={styles.PrompterResultsScreenPrimaryText}>
              Practice Again
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={onChooseDifferent}
          style={styles.PrompterResultsScreenSecondaryButton}>
          <Text style={styles.PrompterResultsScreenSecondaryText}>
            Choose Different Text
          </Text>
        </Pressable>
      </ScrollView>
    </AppBackground>
  );
}

function StatCard({
  label,
  value,
  tall = false,
}: {
  label: string;
  value: string;
  tall?: boolean;
}) {
  return (
    <View
      style={[
        styles.PrompterResultsScreenStatCard,
        tall && styles.PrompterResultsScreenStatCardTall,
      ]}>
      <Text style={styles.PrompterResultsScreenStatLabel}>{label}</Text>
      <Text
        style={[
          styles.PrompterResultsScreenStatValue,
          tall && styles.PrompterResultsScreenStatValueSmall,
        ]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  PrompterResultsScreenContent: {
    paddingHorizontal: 20,
  },
  PrompterResultsScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },

  PrompterResultsScreenBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrompterResultsScreenBackIcon: {
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: -2,
  },
  PrompterResultsScreenHeaderTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 22,
    color: colors.textPrimary,
  },

  PrompterResultsScreenHeroCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    alignItems: 'center',

    marginBottom: 20,
    ...speechTrainerStudioShadow({
      shadowColor: '#22c55e',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.13,
      shadowRadius: 40,
      elevation: 4,
    }),
  },
  PrompterResultsScreenTrophy: {
    fontSize: 60,
    lineHeight: 64,
    marginBottom: 8,
  },
  PrompterResultsScreenRating: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 28,
    color: colors.success,
    marginBottom: 4,
  },
  PrompterResultsScreenSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    color: colors.textSecondary,
  },

  PrompterResultsScreenStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  PrompterResultsScreenStatCard: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    padding: 16,
    minHeight: 82,
  },
  PrompterResultsScreenStatCardTall: {
    minHeight: 94,
  },
  PrompterResultsScreenStatLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  PrompterResultsScreenStatValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  PrompterResultsScreenStatValueSmall: {
    fontSize: 13,
    lineHeight: 20,
  },
  PrompterResultsScreenFeedbackCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    padding: 20,
    marginBottom: 24,
  },
  PrompterResultsScreenFeedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  PrompterResultsScreenFeedbackEmoji: {
    fontSize: 20,
  },
  PrompterResultsScreenFeedbackName: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  PrompterResultsScreenFeedbackText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },

  PrompterResultsScreenPrimaryWrapper: {
    borderRadius: 16,
    marginBottom: 12,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  PrompterResultsScreenPrimaryButton: {
    height: 55,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  PrompterResultsScreenPrimaryIcon: {
    color: colors.white,
    fontSize: 14,
  },
  PrompterResultsScreenPrimaryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.white,
  },

  PrompterResultsScreenSecondaryButton: {
    height: 57,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrompterResultsScreenSecondaryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textAccent,
  },
});
