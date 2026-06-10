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

import {getCategoryById} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioDictionTips';
import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
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
      <Pressable style={styles.speechTrainerStudioBackdrop} onPress={onClose}>
        <Pressable
          style={[styles.speechTrainerStudioSheet, {}]}
          onPress={e => e.stopPropagation()}>
          <LinearGradient
            colors={['#1a0845', '#0d0625']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.speechTrainerStudioSheetGradient}>
            <View style={{padding: 25, paddingBottom: 40}}>
              <View style={styles.speechTrainerStudioHandle} />
              <View style={styles.speechTrainerStudioSheetHeader}>
                <View style={styles.speechTrainerStudioCategoryBadge}>
                  <Text style={styles.speechTrainerStudioCategoryBadgeText}>
                    {category.emoji} {category.title}
                  </Text>
                </View>
                <Pressable style={styles.speechTrainerStudioShareButton} onPress={handleShare}>
                  <Image
                    source={require('../../SpeechTrainerStudioAssets/images/share.png')}
                    style={styles.speechTrainerStudioShareIcon}
                  />
                </Pressable>
              </View>

              <Text style={styles.speechTrainerStudioTitle}>{tip.title}</Text>
              <Text style={styles.speechTrainerStudioDescription}>{tip.description}</Text>

              {tip.howToPractice && (
                <View style={styles.speechTrainerStudioPracticeBox}>
                  <Text style={styles.speechTrainerStudioPracticeLabel}>How to Practice</Text>
                  <Text style={styles.speechTrainerStudioPracticeText}>{tip.howToPractice}</Text>
                </View>
              )}

              {tip.origin && <Text style={styles.speechTrainerStudioOrigin}>📜 {tip.origin}</Text>}

              <View style={styles.speechTrainerStudioActions}>
                <Pressable style={styles.speechTrainerStudioActionButton} onPress={onAnother}>
                  <View style={styles.speechTrainerStudioAnotherButton}>
                    <Text style={styles.speechTrainerStudioShuffleIcon}>🔀</Text>
                    <Text style={styles.speechTrainerStudioAnotherLabel}>Another</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.speechTrainerStudioActionButton} onPress={onClose}>
                  <LinearGradient
                    colors={[
                      colors.buttonGradientStart,
                      colors.buttonGradientEnd,
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.speechTrainerStudioGotItButton}>
                    <Text style={styles.speechTrainerStudioGotItLabel}>Got it!</Text>
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
  speechTrainerStudioBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  speechTrainerStudioSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    borderBottomWidth: 0,
  },
  speechTrainerStudioSheetGradient: {},
  speechTrainerStudioHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  speechTrainerStudioSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  speechTrainerStudioCategoryBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexShrink: 1,
    marginRight: 12,
  },
  speechTrainerStudioCategoryBadgeText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.textAccent,
  },
  speechTrainerStudioShareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioShareIcon: {
    fontSize: 14,
    color: colors.textAccent,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  speechTrainerStudioDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  speechTrainerStudioPracticeBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    padding: 16,
    marginBottom: 16,
  },
  speechTrainerStudioPracticeLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textAccent,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  speechTrainerStudioPracticeText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  speechTrainerStudioOrigin: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginBottom: 24,
  },
  speechTrainerStudioActions: {
    flexDirection: 'row',
    gap: 12,
  },
  speechTrainerStudioActionButton: {
    flex: 1,
  },
  speechTrainerStudioAnotherButton: {
    height: 45,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  speechTrainerStudioShuffleIcon: {
    fontSize: 14,
  },
  speechTrainerStudioAnotherLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textAccent,
  },
  speechTrainerStudioGotItButton: {
    height: 45,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioGotItLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.white,
  },
});
