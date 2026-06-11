import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {PROMPTER_CATEGORIES} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioPrompterTexts';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioShadow/SpeechTrainerStudioShadow';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {PrompterCategoryId, PrompterText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';

type Props = {
  selectedCategoryId: PrompterCategoryId;
  premiumTexts?: PrompterText[];
  onSelectCategory: (id: PrompterCategoryId) => void;
  onSelectText: (text: PrompterText) => void;
};

export function PrompterChooseScreen({
  selectedCategoryId,
  premiumTexts = [],
  onSelectCategory,
  onSelectText,
}: Props) {
  const insets = useSafeAreaInsets();
  const selectedCategory = PROMPTER_CATEGORIES.find(
    c => c.id === selectedCategoryId,
  )!;
  const availableTexts = [
    ...selectedCategory.texts,
    ...premiumTexts.filter(t => t.categoryId === selectedCategoryId),
  ];

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.speechTrainerStudioEyebrow}>Teleprompter Training</Text>
        <Text style={styles.speechTrainerStudioTitle}>Choose a Text</Text>

        <LinearGradient
          colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.15)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.speechTrainerStudioCoachCard}>
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}>
            <Text style={styles.speechTrainerStudioCoachEmoji}>🎙️</Text>
            <Text style={styles.speechTrainerStudioCoachText}>
              <Text style={styles.speechTrainerStudioCoachBold}>Coach Marcus says: </Text>
              Start with a text just above your comfort level. That is where
              growth happens.
            </Text>
          </View>
        </LinearGradient>

        <Text style={styles.speechTrainerStudioSectionTitle}>Select Category</Text>
        <View style={styles.speechTrainerStudioCategoryList}>
          {PROMPTER_CATEGORIES.map(category => {
            const active = category.id === selectedCategoryId;
            const categoryTextCount =
              category.texts.length +
              premiumTexts.filter(t => t.categoryId === category.id).length;
            return (
              <Pressable
                key={category.id}
                onPress={() => onSelectCategory(category.id)}>
                {active ? (
                  <LinearGradient
                    colors={[
                      'rgba(109, 40, 217, 0.4)',
                      'rgba(139, 92, 246, 0.2)',
                    ]}
                    style={[styles.speechTrainerStudioCategoryCard, styles.speechTrainerStudioCategoryCardActive]}>
                    <View
                      style={{
                        padding: 15,
                        flexDirection: 'row',
                        gap: 12,
                        alignItems: 'center',
                      }}>
                      <CategoryContent
                        category={category}
                        textCount={categoryTextCount}
                        active
                      />
                    </View>
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      styles.speechTrainerStudioCategoryCard,
                      {
                        padding: 15,
                        flexDirection: 'row',
                        gap: 12,
                        alignItems: 'center',
                      },
                    ]}>
                    <CategoryContent
                      category={category}
                      textCount={categoryTextCount}
                      active={false}
                    />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.speechTrainerStudioSectionTitle}>Available Texts</Text>
        <View style={styles.speechTrainerStudioTextList}>
          {availableTexts.map(item => (
            <Pressable
              key={item.id}
              onPress={() => onSelectText(item)}
              style={styles.speechTrainerStudioTextCard}>
              <View style={styles.speechTrainerStudioTextCardBody}>
                <Text style={styles.speechTrainerStudioTextTitle}>{item.title}</Text>
                <Text style={styles.speechTrainerStudioTextDescription}>{item.description}</Text>
                <Text style={styles.speechTrainerStudioWordCount}>{item.wordCount} words</Text>
              </View>
              <Text style={styles.speechTrainerStudioChevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
}

function CategoryContent({
  category,
  textCount,
  active,
}: {
  category: (typeof PROMPTER_CATEGORIES)[number];
  textCount: number;
  active: boolean;
}) {
  return (
    <>
      <View style={styles.speechTrainerStudioCategoryIcon}>
        <Text style={styles.speechTrainerStudioCategoryEmoji}>{category.emoji}</Text>
      </View>
      <View style={styles.speechTrainerStudioCategoryInfo}>
        <Text style={styles.speechTrainerStudioCategoryTitle}>{category.title}</Text>
        <Text style={styles.speechTrainerStudioCategoryCount}>
          {textCount} texts available
        </Text>
      </View>
      {active && (
        <View style={styles.speechTrainerStudioCheckBadge}>
          <Text style={styles.speechTrainerStudioCheckMark}>✓</Text>
        </View>
      )}
    </>
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
    marginBottom: 24,
  },
  speechTrainerStudioCoachCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',

    marginBottom: 24,
  },
  speechTrainerStudioCoachEmoji: {
    fontSize: 36,
    lineHeight: 40,
  },
  speechTrainerStudioCoachText: {
    flex: 1,
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  speechTrainerStudioCoachBold: {
    fontFamily: fonts.dmSansSemiBold,
  },
  speechTrainerStudioSectionTitle: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  speechTrainerStudioCategoryList: {
    gap: 12,
    marginBottom: 24,
  },
  speechTrainerStudioCategoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: 'rgba(17, 8, 48, 0.6)',
  },
  speechTrainerStudioCategoryCardActive: {
    borderColor: colors.cardBorderActive,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 4,
    }),
  },
  speechTrainerStudioCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  speechTrainerStudioCategoryEmoji: {
    fontSize: 22,
  },
  speechTrainerStudioCategoryInfo: {
    flex: 1,
  },
  speechTrainerStudioCategoryTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  speechTrainerStudioCategoryCount: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  speechTrainerStudioCheckBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioCheckMark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  speechTrainerStudioTextList: {
    gap: 12,
  },
  speechTrainerStudioTextCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  speechTrainerStudioTextCardBody: {
    flex: 1,
  },
  speechTrainerStudioTextTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  speechTrainerStudioTextDescription: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  speechTrainerStudioWordCount: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.textSecondary,
  },
  speechTrainerStudioChevron: {
    fontSize: 22,
    color: colors.textSecondary,
    marginLeft: 8,
    marginTop: 2,
  },
});
