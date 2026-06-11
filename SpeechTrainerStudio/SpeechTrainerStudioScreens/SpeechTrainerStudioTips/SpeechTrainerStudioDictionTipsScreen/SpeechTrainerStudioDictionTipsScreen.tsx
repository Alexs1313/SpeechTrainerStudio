import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {TipCard} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioTips/SpeechTrainerStudioTipCard';
import {TipDetailModal} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioTips/SpeechTrainerStudioTipDetailModal';
import {
  getShuffleTip,
  getTipsByCategory,
  TIP_CATEGORIES,
} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioDictionTips';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {
  DictionTip,
  TipCategoryId,
} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioTips/SpeechTrainerStudioTips/SpeechTrainerStudioTips';
import Orientation from 'react-native-orientation-locker';
import {useFocusEffect} from '@react-navigation/native';

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

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.speechTrainerStudioEyebrow}>
          Speaking Coach Tips
        </Text>
        <Text style={styles.speechTrainerStudioTitle}>Diction Tips</Text>

        <Pressable onPress={handleShuffleTip}>
          <LinearGradient
            colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.2)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.speechTrainerStudioShuffleButton}>
            <Text style={styles.speechTrainerStudioShuffleIcon}>🔀</Text>
            <Text style={styles.speechTrainerStudioShuffleLabel}>
              Shuffle Tip
            </Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.speechTrainerStudioFilterRow}>
          {TIP_CATEGORIES.map(cat => {
            const active = cat.id === selectedCategory;
            return (
              <Pressable
                key={cat.id}
                onPress={() => handleCategoryChange(cat.id)}
                style={[
                  styles.speechTrainerStudioFilterChip,
                  active && styles.speechTrainerStudioFilterChipActive,
                ]}>
                <Text
                  style={[
                    styles.speechTrainerStudioFilterLabel,
                    active && styles.speechTrainerStudioFilterLabelActive,
                  ]}>
                  {cat.emoji} {cat.shortLabel}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.speechTrainerStudioSectionHeader}>
          <Text style={styles.speechTrainerStudioSectionEmoji}>
            {category.emoji}
          </Text>
          <Text style={styles.speechTrainerStudioSectionTitle}>
            {category.title}
          </Text>
        </View>

        <View style={styles.speechTrainerStudioTipList}>
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
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  speechTrainerStudioShuffleButton: {
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
  speechTrainerStudioShuffleIcon: {
    fontSize: 16,
  },
  speechTrainerStudioShuffleLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textAccent,
  },
  speechTrainerStudioFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  speechTrainerStudioFilterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  speechTrainerStudioFilterChipActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  speechTrainerStudioFilterLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  speechTrainerStudioFilterLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.textPrimary,
  },
  speechTrainerStudioSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  speechTrainerStudioSectionEmoji: {
    fontSize: 18,
    lineHeight: 27,
  },
  speechTrainerStudioSectionTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
  speechTrainerStudioTipList: {
    gap: 12,
  },
});
