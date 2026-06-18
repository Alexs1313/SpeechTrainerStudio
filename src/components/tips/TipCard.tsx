import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {getCategoryById} from '../../constants/dictionTips';
import {DictionTip} from '../../types/tips';
import {colors, fonts} from '../../constants/theme';

type Props = {
  tip: DictionTip;
  expanded: boolean;
  onPress: () => void;
};

export function TipCard({tip, expanded, onPress}: Props) {
  const category = getCategoryById(tip.categoryId);

  const content = (
    <View style={styles.TipCardCardInner}>
      <View style={styles.TipCardIconBadge}>
        <Text style={styles.TipCardIconEmoji}>{category.emoji}</Text>
      </View>
      <View style={styles.TipCardBody}>
        <Text style={styles.TipCardTitle}>{tip.title}</Text>
        <Text style={styles.TipCardSummary}>{tip.summary}</Text>
        {expanded && (
          <View style={styles.TipCardExpandedSection}>
            <View style={styles.TipCardDivider} />
            {tip.howToPractice && (
              <View style={styles.TipCardPracticeBlock}>
                <Text style={styles.TipCardSectionLabel}>How to Practice</Text>
                <Text style={styles.TipCardPracticeText}>{tip.howToPractice}</Text>
              </View>
            )}
            {tip.origin && (
              <View style={styles.TipCardOriginBlock}>
                <Text style={styles.TipCardOriginLabel}>Origin</Text>
                <Text style={styles.TipCardOriginText}>{tip.origin}</Text>
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
          style={[styles.TipCardCard, styles.TipCardCardExpanded]}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.TipCardCard}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  TipCardCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
  },
  TipCardCardExpanded: {
    borderColor: 'rgba(139, 92, 246, 0.35)',
  },
  TipCardCardInner: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  TipCardIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TipCardIconEmoji: {
    fontSize: 20,
    lineHeight: 28,
  },
  TipCardBody: {
    flex: 1,
  },
  TipCardTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  TipCardSummary: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  TipCardExpandedSection: {
    marginTop: 8,
  },
  TipCardDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
    marginTop: 8,
    paddingTop: 16,
  },
  TipCardPracticeBlock: {
    marginBottom: 12,
  },
  TipCardSectionLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textAccent,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  TipCardPracticeText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  TipCardOriginBlock: {
    marginTop: 4,
  },
  TipCardOriginLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  TipCardOriginText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
});
