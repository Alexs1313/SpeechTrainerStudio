import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

import {ShopCategoryOption} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioShopTexts';
import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {ShopFilterId} from '../../SpeechTrainerStudioTypes/SpeechTrainerStudioShop/SpeechTrainerStudioShop/SpeechTrainerStudioShop';

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
      contentContainerStyle={styles.speechTrainerStudioRow}>
      {categories.map(category => {
        const active = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={[styles.speechTrainerStudioPill, active ? styles.speechTrainerStudioPillActive : styles.speechTrainerStudioPillInactive]}>
            <Text style={[styles.speechTrainerStudioLabel, active ? styles.speechTrainerStudioLabelActive : styles.speechTrainerStudioLabelInactive]}>
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioRow: {
    gap: 8,
    paddingRight: 20,
  },
  speechTrainerStudioPill: {
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  speechTrainerStudioPillActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  speechTrainerStudioPillInactive: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  speechTrainerStudioLabel: {
    fontSize: 12,
    lineHeight: 18,
  },
  speechTrainerStudioLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.textPrimary,
  },
  speechTrainerStudioLabelInactive: {
    fontFamily: fonts.dmSansRegular,
    color: colors.textSecondary,
  },
});
