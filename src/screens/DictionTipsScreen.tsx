import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../components/common/AppBackground';
import {TipCard} from '../components/tips/TipCard';
import {TipDetailModal} from '../components/tips/TipDetailModal';
import {
  getShuffleTip,
  getTipsByCategory,
  TIP_CATEGORIES,
} from '../constants/dictionTips';

import {DictionTip, TipCategoryId} from '../types/tips';
import {colors, fonts} from '../constants/theme';

export function DictionTipsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] =
    useState<TipCategoryId>('voice');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);
  const [modalTip, setModalTip] = useState<DictionTip | null>(null);

  const category = TIP_CATEGORIES.find(c => c.id === selectedCategory)!;
  const tips = getTipsByCategory(selectedCategory);

  const handleCategoryChange = (id: TipCategoryId) => {
    setSelectedCategory(id);
    setExpandedTipId(null);
  };

  const handleTipPress = (tipId: string) => {
    setExpandedTipId(prev => (prev === tipId ? null : tipId));
  };

  const handleShuffleTip = useCallback(() => {
    setModalTip(getShuffleTip());
  }, []);

  const handleAnotherTip = useCallback(() => {
    setModalTip(prev => getShuffleTip(prev?.id));
  }, []);

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={[
          styles.DictionTipsScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.DictionTipsScreenEyebrow}>Speaking Coach Tips</Text>
        <Text style={styles.DictionTipsScreenTitle}>Diction Tips</Text>

        <Pressable onPress={handleShuffleTip}>
          <LinearGradient
            colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.2)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.DictionTipsScreenShuffleButton}>
            <Text style={styles.DictionTipsScreenShuffleIcon}>🔀</Text>
            <Text style={styles.DictionTipsScreenShuffleLabel}>
              Shuffle Tip
            </Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.DictionTipsScreenFilterRow}>
          {TIP_CATEGORIES.map(cat => {
            const active = cat.id === selectedCategory;
            return (
              <Pressable
                key={cat.id}
                onPress={() => handleCategoryChange(cat.id)}
                style={[
                  styles.DictionTipsScreenFilterChip,
                  active && styles.DictionTipsScreenFilterChipActive,
                ]}>
                <Text
                  style={[
                    styles.DictionTipsScreenFilterLabel,
                    active && styles.DictionTipsScreenFilterLabelActive,
                  ]}>
                  {cat.emoji} {cat.shortLabel}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.DictionTipsScreenSectionHeader}>
          <Text style={styles.DictionTipsScreenSectionEmoji}>
            {category.emoji}
          </Text>
          <Text style={styles.DictionTipsScreenSectionTitle}>
            {category.title}
          </Text>
        </View>

        <View style={styles.DictionTipsScreenTipList}>
          {tips.map(tip => (
            <TipCard
              key={tip.id}
              tip={tip}
              expanded={expandedTipId === tip.id}
              onPress={() => handleTipPress(tip.id)}
            />
          ))}
        </View>
      </ScrollView>

      <TipDetailModal
        tip={modalTip}
        onClose={() => setModalTip(null)}
        onAnother={handleAnotherTip}
      />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  DictionTipsScreenContent: {
    paddingHorizontal: 20,
  },

  DictionTipsScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  DictionTipsScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  DictionTipsScreenShuffleButton: {
    height: 47,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  DictionTipsScreenShuffleIcon: {
    fontSize: 16,
  },
  DictionTipsScreenShuffleLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textAccent,
  },
  DictionTipsScreenFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  DictionTipsScreenFilterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  DictionTipsScreenFilterChipActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  DictionTipsScreenFilterLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  DictionTipsScreenFilterLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.textPrimary,
  },
  DictionTipsScreenSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  DictionTipsScreenSectionEmoji: {
    fontSize: 18,
    lineHeight: 27,
  },

  DictionTipsScreenSectionTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
  DictionTipsScreenTipList: {
    gap: 12,
  },
});
