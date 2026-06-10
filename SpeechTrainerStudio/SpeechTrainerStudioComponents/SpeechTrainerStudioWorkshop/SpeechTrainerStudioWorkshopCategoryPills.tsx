import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  WorkshopCategoryOption,
  WORKSHOP_FILTER_CATEGORIES,
} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioWorkshopCategories';
import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {WorkshopFilterId} from '../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';

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
      contentContainerStyle={styles.speechTrainerStudioRow}>
      {categories.map(category => {
        const active = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={[styles.speechTrainerStudioPill, active ? styles.speechTrainerStudioPillActive : styles.speechTrainerStudioPillInactive]}>
            <View style={styles.speechTrainerStudioPillInner}>
              {category.emoji ? (
                <Text style={[styles.speechTrainerStudioEmoji, active && styles.speechTrainerStudioEmojiActive]}>
                  {category.emoji}
                </Text>
              ) : null}
              <Text
                style={[styles.speechTrainerStudioLabel, active ? styles.speechTrainerStudioLabelActive : styles.speechTrainerStudioLabelInactive]}>
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
  speechTrainerStudioRow: {
    gap: 8,
    paddingRight: 20,
  },
  speechTrainerStudioPill: {
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
  },
  speechTrainerStudioPillActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  speechTrainerStudioPillInactive: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  speechTrainerStudioPillInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
    height: 32,
  },
  speechTrainerStudioEmoji: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  speechTrainerStudioEmojiActive: {
    color: colors.textPrimary,
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
