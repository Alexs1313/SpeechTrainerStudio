import React, {useMemo} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {icons} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioAssets';
import {ShopCategoryPills} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioShop/SpeechTrainerStudioShopCategoryPills';
import {getCategoryById} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioPrompterTexts';
import {
  getShopFilterCategories,
  getTextPreview,
  SHOP_TEXTS,
} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioShopTexts';
import {colors, fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';
import {
  ShopFilterId,
  ShopText,
} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioShop/SpeechTrainerStudioShop/SpeechTrainerStudioShop';

type Props = {
  balance: number;
  unlockedIds: string[];
  filterId: ShopFilterId;
  toastMessage: string | null;
  onFilterChange: (id: ShopFilterId) => void;
  onPurchasePress: (text: ShopText) => void;
};

export function ShopListScreen({
  balance,
  unlockedIds,
  filterId,
  toastMessage,
  onFilterChange,
  onPurchasePress,
}: Props) {
  const insets = useSafeAreaInsets();
  const unlockedSet = useMemo(() => new Set(unlockedIds), [unlockedIds]);

  const filtered =
    filterId === 'all'
      ? SHOP_TEXTS
      : SHOP_TEXTS.filter(t => t.categoryId === filterId);

  const lockedTexts = SHOP_TEXTS.filter(t => !unlockedSet.has(t.id));
  const cheapestLockedPrice =
    lockedTexts.length > 0
      ? Math.min(...lockedTexts.map(t => t.price))
      : Infinity;
  const showEarnHint = lockedTexts.length > 0 && balance < cheapestLockedPrice;

  const renderItem: ListRenderItem<ShopText> = ({item: text}) => {
    const owned = unlockedSet.has(text.id);
    const category = getCategoryById(text.categoryId);
    const canAfford = balance >= text.price;

    return (
      <View
        style={[
          styles.ShopListScreenCard,
          owned && styles.ShopListScreenCardOwned,
        ]}>
        {owned ? (
          <LinearGradient
            colors={['rgba(21, 128, 61, 0.15)', 'rgba(17, 8, 48, 0.7)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={StyleSheet.absoluteFill}
          />
        ) : null}

        <View
          style={[
            styles.ShopListScreenCardHeader,
            owned && styles.ShopListScreenCardHeaderOwned,
          ]}>
          <Text style={styles.ShopListScreenCardHeaderEmoji}>
            {category.emoji}
          </Text>
          <Text style={styles.ShopListScreenCardHeaderTitle}>
            {category.title}
          </Text>
          {owned ? (
            <View style={styles.ShopListScreenOwnedBadge}>
              <Text style={styles.ShopListScreenOwnedCheck}>✓</Text>
              <Text style={styles.ShopListScreenOwnedText}>Owned</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.ShopListScreenCardBody}>
          <View style={styles.ShopListScreenCardTopRow}>
            <View style={styles.ShopListScreenCardTextBlock}>
              <Text style={styles.ShopListScreenCardTitle}>
                {text.title}
              </Text>
              <Text style={styles.ShopListScreenCardDescription}>
                {text.description}
              </Text>
            </View>
            <View
              style={[
                styles.ShopListScreenLockButton,
                owned && styles.ShopListScreenLockButtonOwned,
              ]}>
              <Image
                source={
                  !owned ? icons.lock : icons.unlocked
                }
              />
            </View>
          </View>

          <View style={styles.ShopListScreenCardFooter}>
            <Text style={styles.ShopListScreenWordCount}>
              {text.wordCount} words
            </Text>
            {owned ? (
              <View style={styles.ShopListScreenAvailableBadge}>
                <Text style={styles.ShopListScreenAvailableCheck}>✓</Text>
                <Text style={styles.ShopListScreenAvailableText}>
                  Available
                </Text>
              </View>
            ) : (
              <Pressable
                onPress={() => canAfford && onPurchasePress(text)}
                disabled={!canAfford}
                style={styles.ShopListScreenPriceWrapper}>
                {canAfford ? (
                  <LinearGradient
                    colors={['#d97706', colors.coachTipText]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.ShopListScreenPriceButton}>
                    <Text style={styles.ShopListScreenPriceMic}>🎤</Text>
                    <Text style={styles.ShopListScreenPriceValue}>
                      {text.price}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      styles.ShopListScreenPriceButton,
                      styles.ShopListScreenPriceButtonDisabled,
                    ]}>
                    <Text style={styles.ShopListScreenPriceMicDisabled}>
                      🎤
                    </Text>
                    <Text style={styles.ShopListScreenPriceValueDisabled}>
                      {text.price}
                    </Text>
                  </View>
                )}
              </Pressable>
            )}
          </View>

          {owned ? (
            <Text style={styles.ShopListScreenPreview}>
              {getTextPreview(text.body)}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <AppBackground>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.ShopListScreenList}
        contentContainerStyle={[
          styles.ShopListScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={
          <>
            <Text style={styles.ShopListScreenEyebrow}>
              Premium Content
            </Text>

            <View style={styles.ShopListScreenHeaderRow}>
              <Text style={styles.ShopListScreenTitle}>Text Shop</Text>
              <View style={styles.ShopListScreenBalanceBadge}>
                <Text style={styles.ShopListScreenBalanceMic}>🎤</Text>
                <Text style={styles.ShopListScreenBalanceValue}>
                  {balance}
                </Text>
              </View>
            </View>

            <LinearGradient
              colors={['rgba(109, 40, 217, 0.25)', 'rgba(139, 92, 246, 0.12)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.ShopListScreenInfoCard}>
              <View style={styles.ShopListScreenInfoCardInner}>
                <Text style={styles.ShopListScreenInfoEmoji}>🛍️</Text>
                <View style={styles.ShopListScreenInfoTextWrap}>
                  <Text style={styles.ShopListScreenInfoTitle}>
                    Premium Teleprompter Texts
                  </Text>
                  <Text style={styles.ShopListScreenInfoSubtitle}>
                    Unlock advanced texts with Microphone coins. Earn them by
                    playing the Mini Game. Unlocked texts appear in Teleprompter
                    Training and your Workshop.
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.ShopListScreenFilters}>
              <ShopCategoryPills
                categories={getShopFilterCategories()}
                selectedId={filterId}
                onSelect={onFilterChange}
              />
            </View>

            {showEarnHint ? (
              <View style={styles.ShopListScreenHintBar}>
                <Text style={styles.ShopListScreenHintEmoji}>💡</Text>
                <Text style={styles.ShopListScreenHintText}>
                  Play the Mini Game to earn more Microphones!
                </Text>
              </View>
            ) : null}
          </>
        }
      />

      {toastMessage ? (
        <View
          style={[
            styles.ShopListScreenToast,
            {bottom: insets.bottom + 90},
          ]}>
          <Text style={styles.ShopListScreenToastText}>
            {toastMessage}
          </Text>
        </View>
      ) : null}
    </AppBackground>
  );
}

function ListSeparator() {
  return <View style={styles.ShopListScreenSeparator} />;
}

const styles = StyleSheet.create({
  ShopListScreenList: {
    flex: 1,
  },
  ShopListScreenContent: {
    paddingHorizontal: 20,
  },
  ShopListScreenSeparator: {
    height: 16,
  },
  ShopListScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ShopListScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ShopListScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
    flex: 1,
  },
  ShopListScreenBalanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  ShopListScreenBalanceMic: {
    fontSize: 16,
    lineHeight: 24,
  },
  ShopListScreenBalanceValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 15,
    lineHeight: 22,
    color: colors.coachTipText,
  },
  ShopListScreenInfoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 16,
  },
  ShopListScreenInfoCardInner: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  ShopListScreenInfoEmoji: {
    fontSize: 22,
    lineHeight: 24,
  },
  ShopListScreenInfoTextWrap: {
    flex: 1,
    gap: 4,
  },
  ShopListScreenInfoTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  ShopListScreenInfoSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  ShopListScreenFilters: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  ShopListScreenHintBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.coachTipBackground,
    borderWidth: 1,
    borderColor: colors.coachTipBorder,
    marginBottom: 16,
  },
  ShopListScreenHintEmoji: {
    fontSize: 14,
    lineHeight: 21,
  },
  ShopListScreenHintText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    flex: 1,
  },
  ShopListScreenCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  ShopListScreenCardOwned: {
    borderColor: 'rgba(22, 163, 74, 0.3)',
  },
  ShopListScreenCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.1)',
  },
  ShopListScreenCardHeaderOwned: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderBottomColor: 'rgba(22, 163, 74, 0.15)',
  },
  ShopListScreenCardHeaderEmoji: {
    fontSize: 14,
    lineHeight: 21,
  },
  ShopListScreenCardHeaderTitle: {
    flex: 1,
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  ShopListScreenOwnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ShopListScreenOwnedCheck: {
    fontSize: 12,
    color: colors.success,
  },
  ShopListScreenOwnedText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    color: colors.success,
  },
  ShopListScreenCardBody: {
    padding: 16,
    gap: 12,
  },
  ShopListScreenCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  ShopListScreenCardTextBlock: {
    flex: 1,
  },
  ShopListScreenCardTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ShopListScreenCardDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  ShopListScreenLockButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ShopListScreenLockButtonOwned: {
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
  },
  ShopListScreenLockIcon: {
    fontSize: 16,
  },
  ShopListScreenCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ShopListScreenWordCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  ShopListScreenPriceWrapper: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  ShopListScreenPriceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 33,
    gap: 6,
    borderRadius: 999,
  },
  ShopListScreenPriceButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    opacity: 0.6,
  },
  ShopListScreenPriceMic: {
    fontFamily: fonts.dmSansBold,
    fontSize: 14,
    color: '#000000',
  },
  ShopListScreenPriceValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 13,
    color: '#000000',
  },
  ShopListScreenPriceMicDisabled: {
    fontFamily: fonts.dmSansBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  ShopListScreenPriceValueDisabled: {
    fontFamily: fonts.dmSansBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  ShopListScreenAvailableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 999,
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
  },
  ShopListScreenAvailableCheck: {
    fontSize: 12,
    color: colors.success,
  },
  ShopListScreenAvailableText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.success,
  },
  ShopListScreenPreview: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 19,
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
  ShopListScreenToast: {
    position: 'absolute',
    left: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
  },
  ShopListScreenToastText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
  },
});
