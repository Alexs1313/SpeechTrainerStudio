import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {PROMPTER_CATEGORIES} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioPrompterTexts';
import {PrompterCategoryId, PrompterText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {colors, fonts, speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

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
          styles.PrompterChooseScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.PrompterChooseScreenEyebrow}>Teleprompter Training</Text>
        <Text style={styles.PrompterChooseScreenTitle}>Choose a Text</Text>

        <LinearGradient
          colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.15)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.PrompterChooseScreenCoachCard}>
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}>
            <Text style={styles.PrompterChooseScreenCoachEmoji}>🎙️</Text>
            <Text style={styles.PrompterChooseScreenCoachText}>
              <Text style={styles.PrompterChooseScreenCoachBold}>Coach Marcus says: </Text>
              Start with a text just above your comfort level. That is where
              growth happens.
            </Text>
          </View>
        </LinearGradient>

        <Text style={styles.PrompterChooseScreenSectionTitle}>Select Category</Text>
        <View style={styles.PrompterChooseScreenCategoryList}>
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
                    style={[styles.PrompterChooseScreenCategoryCard, styles.PrompterChooseScreenCategoryCardActive]}>
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
                      styles.PrompterChooseScreenCategoryCard,
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

        <Text style={styles.PrompterChooseScreenSectionTitle}>Available Texts</Text>
        <View style={styles.PrompterChooseScreenTextList}>
          {availableTexts.map(item => (
            <Pressable
              key={item.id}
              onPress={() => onSelectText(item)}
              style={styles.PrompterChooseScreenTextCard}>
              <View style={styles.PrompterChooseScreenTextCardBody}>
                <Text style={styles.PrompterChooseScreenTextTitle}>{item.title}</Text>
                <Text style={styles.PrompterChooseScreenTextDescription}>{item.description}</Text>
                <Text style={styles.PrompterChooseScreenWordCount}>{item.wordCount} words</Text>
              </View>
              <Text style={styles.PrompterChooseScreenChevron}>›</Text>
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
      <View style={styles.PrompterChooseScreenCategoryIcon}>
        <Text style={styles.PrompterChooseScreenCategoryEmoji}>{category.emoji}</Text>
      </View>
      <View style={styles.PrompterChooseScreenCategoryInfo}>
        <Text style={styles.PrompterChooseScreenCategoryTitle}>{category.title}</Text>
        <Text style={styles.PrompterChooseScreenCategoryCount}>
          {textCount} texts available
        </Text>
      </View>
      {active && (
        <View style={styles.PrompterChooseScreenCheckBadge}>
          <Text style={styles.PrompterChooseScreenCheckMark}>✓</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  PrompterChooseScreenContent: {
    paddingHorizontal: 20,
  },
  PrompterChooseScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  PrompterChooseScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  PrompterChooseScreenCoachCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',

    marginBottom: 24,
  },
  PrompterChooseScreenCoachEmoji: {
    fontSize: 36,
    lineHeight: 40,
  },
  PrompterChooseScreenCoachText: {
    flex: 1,
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  PrompterChooseScreenCoachBold: {
    fontFamily: fonts.dmSansSemiBold,
  },
  PrompterChooseScreenSectionTitle: {
    fontFamily: fonts.outfitSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  PrompterChooseScreenCategoryList: {
    gap: 12,
    marginBottom: 24,
  },
  PrompterChooseScreenCategoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: 'rgba(17, 8, 48, 0.6)',
  },
  PrompterChooseScreenCategoryCardActive: {
    borderColor: colors.cardBorderActive,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 4,
    }),
  },
  PrompterChooseScreenCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  PrompterChooseScreenCategoryEmoji: {
    fontSize: 22,
  },
  PrompterChooseScreenCategoryInfo: {
    flex: 1,
  },
  PrompterChooseScreenCategoryTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  PrompterChooseScreenCategoryCount: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  PrompterChooseScreenCheckBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrompterChooseScreenCheckMark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  PrompterChooseScreenTextList: {
    gap: 12,
  },
  PrompterChooseScreenTextCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  PrompterChooseScreenTextCardBody: {
    flex: 1,
  },
  PrompterChooseScreenTextTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  PrompterChooseScreenTextDescription: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  PrompterChooseScreenWordCount: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.textSecondary,
  },
  PrompterChooseScreenChevron: {
    fontSize: 22,
    color: colors.textSecondary,
    marginLeft: 8,
    marginTop: 2,
  },
});
