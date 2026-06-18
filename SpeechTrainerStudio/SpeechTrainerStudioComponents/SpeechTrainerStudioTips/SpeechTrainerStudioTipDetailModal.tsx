import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {icons} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioAssets';
import {getCategoryById} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioDictionTips';
import {colors, fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';
import {DictionTip} from '../../SpeechTrainerStudioTypes/SpeechTrainerStudioTips/SpeechTrainerStudioTips/SpeechTrainerStudioTips';

type Props = {
  tip: DictionTip | null;
  onClose: () => void;
  onAnother: () => void;
};

export function TipDetailModal({tip, onClose, onAnother}: Props) {
  const insets = useSafeAreaInsets();

  if (!tip) {
    return null;
  }

  const category = getCategoryById(tip.categoryId);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${tip.title}\n\n${tip.description}`,
      });
    } catch {
      // User cancelled share
    }
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.TipDetailModalBackdrop} onPress={onClose}>
        <Pressable
          style={[styles.TipDetailModalSheet, {}]}
          onPress={e => e.stopPropagation()}>
          <LinearGradient
            colors={['#1a0845', '#0d0625']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.TipDetailModalSheetGradient}>
            <View style={{padding: 25, paddingBottom: 40}}>
              <View style={styles.TipDetailModalHandle} />
              <View style={styles.TipDetailModalSheetHeader}>
                <View style={styles.TipDetailModalCategoryBadge}>
                  <Text style={styles.TipDetailModalCategoryBadgeText}>
                    {category.emoji} {category.title}
                  </Text>
                </View>
                <Pressable style={styles.TipDetailModalShareButton} onPress={handleShare}>
                  <Image
                    source={icons.share}
                    style={styles.TipDetailModalShareIcon}
                  />
                </Pressable>
              </View>

              <Text style={styles.TipDetailModalTitle}>{tip.title}</Text>
              <Text style={styles.TipDetailModalDescription}>{tip.description}</Text>

              {tip.howToPractice && (
                <View style={styles.TipDetailModalPracticeBox}>
                  <Text style={styles.TipDetailModalPracticeLabel}>How to Practice</Text>
                  <Text style={styles.TipDetailModalPracticeText}>{tip.howToPractice}</Text>
                </View>
              )}

              {tip.origin && <Text style={styles.TipDetailModalOrigin}>📜 {tip.origin}</Text>}

              <View style={styles.TipDetailModalActions}>
                <Pressable style={styles.TipDetailModalActionButton} onPress={onAnother}>
                  <View style={styles.TipDetailModalAnotherButton}>
                    <Text style={styles.TipDetailModalShuffleIcon}>🔀</Text>
                    <Text style={styles.TipDetailModalAnotherLabel}>Another</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.TipDetailModalActionButton} onPress={onClose}>
                  <LinearGradient
                    colors={[
                      colors.buttonGradientStart,
                      colors.buttonGradientEnd,
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.TipDetailModalGotItButton}>
                    <Text style={styles.TipDetailModalGotItLabel}>Got it!</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  TipDetailModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  TipDetailModalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    borderBottomWidth: 0,
  },
  TipDetailModalSheetGradient: {},
  TipDetailModalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  TipDetailModalSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  TipDetailModalCategoryBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexShrink: 1,
    marginRight: 12,
  },
  TipDetailModalCategoryBadgeText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.textAccent,
  },
  TipDetailModalShareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TipDetailModalShareIcon: {
    width: 16,
    height: 16,
    tintColor: colors.textAccent,
  },
  TipDetailModalTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  TipDetailModalDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  TipDetailModalPracticeBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    padding: 16,
    marginBottom: 16,
  },
  TipDetailModalPracticeLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textAccent,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  TipDetailModalPracticeText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  TipDetailModalOrigin: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginBottom: 24,
  },
  TipDetailModalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  TipDetailModalActionButton: {
    flex: 1,
  },
  TipDetailModalAnotherButton: {
    height: 45,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  TipDetailModalShuffleIcon: {
    fontSize: 14,
  },
  TipDetailModalAnotherLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textAccent,
  },
  TipDetailModalGotItButton: {
    height: 45,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TipDetailModalGotItLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.white,
  },
});
