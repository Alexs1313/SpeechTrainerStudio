import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  WorkshopCategoryOption,
  WORKSHOP_FILTER_CATEGORIES,
} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioWorkshopCategories';
import {WorkshopFilterId} from '../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {colors, fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

type Props = {
  selectedId: WorkshopFilterId;
  onSelect: (id: WorkshopFilterId) => void;
  categories?: WorkshopCategoryOption[];
};

export function WorkshopCategoryPills({
  selectedId,
  onSelect,
  categories = WORKSHOP_FILTER_CATEGORIES,
}: Props) {
  return (
    <ScrollView
      horizontal
      directionalLockEnabled
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.WorkshopCategoryPillsRow}>
      {categories.map(category => {
        const active = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={[styles.WorkshopCategoryPillsPill, active ? styles.WorkshopCategoryPillsPillActive : styles.WorkshopCategoryPillsPillInactive]}>
            <View style={styles.WorkshopCategoryPillsPillInner}>
              {category.emoji ? (
                <Text style={[styles.WorkshopCategoryPillsEmoji, active && styles.WorkshopCategoryPillsEmojiActive]}>
                  {category.emoji}
                </Text>
              ) : null}
              <Text
                style={[styles.WorkshopCategoryPillsLabel, active ? styles.WorkshopCategoryPillsLabelActive : styles.WorkshopCategoryPillsLabelInactive]}>
                {category.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WorkshopCategoryPillsRow: {
    gap: 8,
    paddingRight: 20,
  },
  WorkshopCategoryPillsPill: {
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
  },
  WorkshopCategoryPillsPillActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  WorkshopCategoryPillsPillInactive: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  WorkshopCategoryPillsPillInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
    height: 32,
  },
  WorkshopCategoryPillsEmoji: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  WorkshopCategoryPillsEmojiActive: {
    color: colors.textPrimary,
  },
  WorkshopCategoryPillsLabel: {
    fontSize: 12,
    lineHeight: 18,
  },
  WorkshopCategoryPillsLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.textPrimary,
  },
  WorkshopCategoryPillsLabelInactive: {
    fontFamily: fonts.dmSansRegular,
    color: colors.textSecondary,
  },
});
