import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {getCategoryById} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioDictionTips';
import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {DictionTip} from '../../SpeechTrainerStudioTypes/SpeechTrainerStudioTips/SpeechTrainerStudioTips/SpeechTrainerStudioTips';

type Props = {
  tip: DictionTip;
  expanded: boolean;
  onPress: () => void;
};

export function TipCard({tip, expanded, onPress}: Props) {
  const category = getCategoryById(tip.categoryId);

  const content = (
    <View style={styles.speechTrainerStudioCardInner}>
      <View style={styles.speechTrainerStudioIconBadge}>
        <Text style={styles.speechTrainerStudioIconEmoji}>{category.emoji}</Text>
      </View>
      <View style={styles.speechTrainerStudioBody}>
        <Text style={styles.speechTrainerStudioTitle}>{tip.title}</Text>
        <Text style={styles.speechTrainerStudioSummary}>{tip.summary}</Text>
        {expanded && (
          <View style={styles.speechTrainerStudioExpandedSection}>
            <View style={styles.speechTrainerStudioDivider} />
            {tip.howToPractice && (
              <View style={styles.speechTrainerStudioPracticeBlock}>
                <Text style={styles.speechTrainerStudioSectionLabel}>How to Practice</Text>
                <Text style={styles.speechTrainerStudioPracticeText}>{tip.howToPractice}</Text>
              </View>
            )}
            {tip.origin && (
              <View style={styles.speechTrainerStudioOriginBlock}>
                <Text style={styles.speechTrainerStudioOriginLabel}>Origin</Text>
                <Text style={styles.speechTrainerStudioOriginText}>{tip.origin}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  if (expanded) {
    return (
      <Pressable onPress={onPress}>
        <LinearGradient
          colors={['rgba(109, 40, 217, 0.25)', 'rgba(139, 92, 246, 0.12)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.speechTrainerStudioCard, styles.speechTrainerStudioCardExpanded]}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.speechTrainerStudioCard}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
  },
  speechTrainerStudioCardExpanded: {
    borderColor: 'rgba(139, 92, 246, 0.35)',
  },
  speechTrainerStudioCardInner: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  speechTrainerStudioIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioIconEmoji: {
    fontSize: 20,
    lineHeight: 28,
  },
  speechTrainerStudioBody: {
    flex: 1,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  speechTrainerStudioSummary: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  speechTrainerStudioExpandedSection: {
    marginTop: 8,
  },
  speechTrainerStudioDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
    marginTop: 8,
    paddingTop: 16,
  },
  speechTrainerStudioPracticeBlock: {
    marginBottom: 12,
  },
  speechTrainerStudioSectionLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textAccent,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  speechTrainerStudioPracticeText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  speechTrainerStudioOriginBlock: {
    marginTop: 4,
  },
  speechTrainerStudioOriginLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  speechTrainerStudioOriginText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
});
