import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {SessionResult} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {formatDuration} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioFormatDuration/SpeechTrainerStudioFormatDuration';

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
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.speechTrainerStudioHeader}>
          <Pressable onPress={onBack} style={styles.speechTrainerStudioBackButton}>
            <Text style={styles.speechTrainerStudioBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.speechTrainerStudioHeaderTitle}>Session Results</Text>
        </View>

        <LinearGradient
          colors={['rgba(17, 8, 48, 0.9)', 'rgba(30, 16, 72, 0.7)']}
          style={styles.speechTrainerStudioHeroCard}>
          <View
            style={{
              padding: 25,
              alignItems: 'center',
            }}>
            <Text style={styles.speechTrainerStudioTrophy}>🏆</Text>
            <Text style={styles.speechTrainerStudioRating}>Excellent</Text>
            <Text style={styles.speechTrainerStudioSubtitle}>Text completed!</Text>
          </View>
        </LinearGradient>

        <View style={styles.speechTrainerStudioStatsGrid}>
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
          style={styles.speechTrainerStudioFeedbackCard}>
          <View style={styles.speechTrainerStudioFeedbackHeader}>
            <Text style={styles.speechTrainerStudioFeedbackEmoji}>🎙️</Text>
            <Text style={styles.speechTrainerStudioFeedbackName}>Coach Marcus</Text>
          </View>
          <Text style={styles.speechTrainerStudioFeedbackText}>
            Outstanding work! Your pace was confident and well-controlled. I
            could see the months of practice paying off in every paragraph. This
            is exactly the level of fluency I want you to bring to the stage.
          </Text>
        </LinearGradient>

        <Pressable onPress={onPracticeAgain} style={styles.speechTrainerStudioPrimaryWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            style={styles.speechTrainerStudioPrimaryButton}>
            <Text style={styles.speechTrainerStudioPrimaryIcon}>▶</Text>
            <Text style={styles.speechTrainerStudioPrimaryText}>Practice Again</Text>
          </LinearGradient>
        </Pressable>

        <Pressable onPress={onChooseDifferent} style={styles.speechTrainerStudioSecondaryButton}>
          <Text style={styles.speechTrainerStudioSecondaryText}>Choose Different Text</Text>
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
    <View style={[styles.speechTrainerStudioStatCard, tall && styles.speechTrainerStudioStatCardTall]}>
      <Text style={styles.speechTrainerStudioStatLabel}>{label}</Text>
      <Text style={[styles.speechTrainerStudioStatValue, tall && styles.speechTrainerStudioStatValueSmall]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  speechTrainerStudioBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioBackIcon: {
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: -2,
  },
  speechTrainerStudioHeaderTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 22,
    color: colors.textPrimary,
  },
  speechTrainerStudioHeroCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    alignItems: 'center',

    marginBottom: 20,
    shadowColor: '#22c55e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.13,
    shadowRadius: 40,
    elevation: 4,
  },
  speechTrainerStudioTrophy: {
    fontSize: 60,
    lineHeight: 64,
    marginBottom: 8,
  },
  speechTrainerStudioRating: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 28,
    color: colors.success,
    marginBottom: 4,
  },
  speechTrainerStudioSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  speechTrainerStudioStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  speechTrainerStudioStatCard: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
    padding: 16,
    minHeight: 82,
  },
  speechTrainerStudioStatCardTall: {
    minHeight: 94,
  },
  speechTrainerStudioStatLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  speechTrainerStudioStatValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  speechTrainerStudioStatValueSmall: {
    fontSize: 13,
    lineHeight: 20,
  },
  speechTrainerStudioFeedbackCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    padding: 20,
    marginBottom: 24,
  },
  speechTrainerStudioFeedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  speechTrainerStudioFeedbackEmoji: {
    fontSize: 20,
  },
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
  speechTrainerStudioPrimaryWrapper: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#8b5cf6',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  speechTrainerStudioPrimaryButton: {
    height: 55,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  speechTrainerStudioPrimaryIcon: {
    color: colors.white,
    fontSize: 14,
  },
  speechTrainerStudioPrimaryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.white,
  },
  speechTrainerStudioSecondaryButton: {
    height: 57,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioSecondaryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textAccent,
  },
});
