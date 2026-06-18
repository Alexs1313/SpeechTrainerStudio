import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

import {ShopCategoryOption} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioShopTexts';
import {ShopFilterId} from '../../SpeechTrainerStudioTypes/SpeechTrainerStudioShop/SpeechTrainerStudioShop/SpeechTrainerStudioShop';
import {colors, fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

type Props = {
  categories: ShopCategoryOption[];
  selectedId: ShopFilterId;
  onSelect: (id: ShopFilterId) => void;
};

export function ShopCategoryPills({categories, selectedId, onSelect}: Props) {
  return (
    <ScrollView
      horizontal
      directionalLockEnabled
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.ShopCategoryPillsRow}>
      {categories.map(category => {
        const active = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={[styles.ShopCategoryPillsPill, active ? styles.ShopCategoryPillsPillActive : styles.ShopCategoryPillsPillInactive]}>
            <Text style={[styles.ShopCategoryPillsLabel, active ? styles.ShopCategoryPillsLabelActive : styles.ShopCategoryPillsLabelInactive]}>
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ShopCategoryPillsRow: {
    gap: 8,
    paddingRight: 20,
  },
  ShopCategoryPillsPill: {
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  ShopCategoryPillsPillActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  ShopCategoryPillsPillInactive: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  ShopCategoryPillsLabel: {
    fontSize: 12,
    lineHeight: 18,
  },
  ShopCategoryPillsLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.textPrimary,
  },
  ShopCategoryPillsLabelInactive: {
    fontFamily: fonts.dmSansRegular,
    color: colors.textSecondary,
  },
});
