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
import {ShopCategoryPills} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioShop/SpeechTrainerStudioShopCategoryPills';
import {getCategoryById} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioPrompterTexts';
import {
  getShopFilterCategories,
  getTextPreview,
  SHOP_TEXTS,
} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioShopTexts';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
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
          styles.speechTrainerStudioCard,
          owned && styles.speechTrainerStudioCardOwned,
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
            styles.speechTrainerStudioCardHeader,
            owned && styles.speechTrainerStudioCardHeaderOwned,
          ]}>
          <Text style={styles.speechTrainerStudioCardHeaderEmoji}>
            {category.emoji}
          </Text>
          <Text style={styles.speechTrainerStudioCardHeaderTitle}>
            {category.title}
          </Text>
          {owned ? (
            <View style={styles.speechTrainerStudioOwnedBadge}>
              <Text style={styles.speechTrainerStudioOwnedCheck}>✓</Text>
              <Text style={styles.speechTrainerStudioOwnedText}>Owned</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.speechTrainerStudioCardBody}>
          <View style={styles.speechTrainerStudioCardTopRow}>
            <View style={styles.speechTrainerStudioCardTextBlock}>
              <Text style={styles.speechTrainerStudioCardTitle}>
                {text.title}
              </Text>
              <Text style={styles.speechTrainerStudioCardDescription}>
                {text.description}
              </Text>
            </View>
            <View
              style={[
                styles.speechTrainerStudioLockButton,
                owned && styles.speechTrainerStudioLockButtonOwned,
              ]}>
              <Image
                source={
                  !owned
                    ? require('../../../SpeechTrainerStudioAssets/images/lock.png')
                    : require('../../../SpeechTrainerStudioAssets/images/unlocked.png')
                }
              />
            </View>
          </View>

          <View style={styles.speechTrainerStudioCardFooter}>
            <Text style={styles.speechTrainerStudioWordCount}>
              {text.wordCount} words
            </Text>
            {owned ? (
              <View style={styles.speechTrainerStudioAvailableBadge}>
                <Text style={styles.speechTrainerStudioAvailableCheck}>✓</Text>
                <Text style={styles.speechTrainerStudioAvailableText}>
                  Available
                </Text>
              </View>
            ) : (
              <Pressable
                onPress={() => canAfford && onPurchasePress(text)}
                disabled={!canAfford}
                style={styles.speechTrainerStudioPriceWrapper}>
                {canAfford ? (
                  <LinearGradient
                    colors={['#d97706', colors.coachTipText]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.speechTrainerStudioPriceButton}>
                    <Text style={styles.speechTrainerStudioPriceMic}>🎤</Text>
                    <Text style={styles.speechTrainerStudioPriceValue}>
                      {text.price}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      styles.speechTrainerStudioPriceButton,
                      styles.speechTrainerStudioPriceButtonDisabled,
                    ]}>
                    <Text style={styles.speechTrainerStudioPriceMicDisabled}>
                      🎤
                    </Text>
                    <Text style={styles.speechTrainerStudioPriceValueDisabled}>
                      {text.price}
                    </Text>
                  </View>
                )}
              </Pressable>
            )}
          </View>

          {owned ? (
            <Text style={styles.speechTrainerStudioPreview}>
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
        style={styles.speechTrainerStudioList}
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={
          <>
            <Text style={styles.speechTrainerStudioEyebrow}>
              Premium Content
            </Text>

            <View style={styles.speechTrainerStudioHeaderRow}>
              <Text style={styles.speechTrainerStudioTitle}>Text Shop</Text>
              <View style={styles.speechTrainerStudioBalanceBadge}>
                <Text style={styles.speechTrainerStudioBalanceMic}>🎤</Text>
                <Text style={styles.speechTrainerStudioBalanceValue}>
                  {balance}
                </Text>
              </View>
            </View>

            <LinearGradient
              colors={['rgba(109, 40, 217, 0.25)', 'rgba(139, 92, 246, 0.12)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.speechTrainerStudioInfoCard}>
              <View style={styles.speechTrainerStudioInfoCardInner}>
                <Text style={styles.speechTrainerStudioInfoEmoji}>🛍️</Text>
                <View style={styles.speechTrainerStudioInfoTextWrap}>
                  <Text style={styles.speechTrainerStudioInfoTitle}>
                    Premium Teleprompter Texts
                  </Text>
                  <Text style={styles.speechTrainerStudioInfoSubtitle}>
                    Unlock advanced texts with Microphone coins. Earn them by
                    playing the Mini Game. Unlocked texts appear in Teleprompter
                    Training and your Workshop.
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.speechTrainerStudioFilters}>
              <ShopCategoryPills
                categories={getShopFilterCategories()}
                selectedId={filterId}
                onSelect={onFilterChange}
              />
            </View>

            {showEarnHint ? (
              <View style={styles.speechTrainerStudioHintBar}>
                <Text style={styles.speechTrainerStudioHintEmoji}>💡</Text>
                <Text style={styles.speechTrainerStudioHintText}>
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
            styles.speechTrainerStudioToast,
            {bottom: insets.bottom + 90},
          ]}>
          <Text style={styles.speechTrainerStudioToastText}>
            {toastMessage}
          </Text>
        </View>
      ) : null}
    </AppBackground>
  );
}

function ListSeparator() {
  return <View style={styles.speechTrainerStudioSeparator} />;
}

const styles = StyleSheet.create({
  speechTrainerStudioList: {
    flex: 1,
  },
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioSeparator: {
    height: 16,
  },
  speechTrainerStudioEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  speechTrainerStudioHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
    flex: 1,
  },
  speechTrainerStudioBalanceBadge: {
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
  speechTrainerStudioBalanceMic: {
    fontSize: 16,
    lineHeight: 24,
  },
  speechTrainerStudioBalanceValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 15,
    lineHeight: 22,
    color: colors.coachTipText,
  },
  speechTrainerStudioInfoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 16,
  },
  speechTrainerStudioInfoCardInner: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  speechTrainerStudioInfoEmoji: {
    fontSize: 22,
    lineHeight: 24,
  },
  speechTrainerStudioInfoTextWrap: {
    flex: 1,
    gap: 4,
  },
  speechTrainerStudioInfoTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  speechTrainerStudioInfoSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  speechTrainerStudioFilters: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  speechTrainerStudioHintBar: {
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
  speechTrainerStudioHintEmoji: {
    fontSize: 14,
    lineHeight: 21,
  },
  speechTrainerStudioHintText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    flex: 1,
  },
  speechTrainerStudioCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  speechTrainerStudioCardOwned: {
    borderColor: 'rgba(22, 163, 74, 0.3)',
  },
  speechTrainerStudioCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.1)',
  },
  speechTrainerStudioCardHeaderOwned: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderBottomColor: 'rgba(22, 163, 74, 0.15)',
  },
  speechTrainerStudioCardHeaderEmoji: {
    fontSize: 14,
    lineHeight: 21,
  },
  speechTrainerStudioCardHeaderTitle: {
    flex: 1,
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  speechTrainerStudioOwnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  speechTrainerStudioOwnedCheck: {
    fontSize: 12,
    color: colors.success,
  },
  speechTrainerStudioOwnedText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    color: colors.success,
  },
  speechTrainerStudioCardBody: {
    padding: 16,
    gap: 12,
  },
  speechTrainerStudioCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  speechTrainerStudioCardTextBlock: {
    flex: 1,
  },
  speechTrainerStudioCardTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  speechTrainerStudioCardDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  speechTrainerStudioLockButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioLockButtonOwned: {
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
  },
  speechTrainerStudioLockIcon: {
    fontSize: 16,
  },
  speechTrainerStudioCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speechTrainerStudioWordCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  speechTrainerStudioPriceWrapper: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  speechTrainerStudioPriceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 33,
    gap: 6,
    borderRadius: 999,
  },
  speechTrainerStudioPriceButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    opacity: 0.6,
  },
  speechTrainerStudioPriceMic: {
    fontFamily: fonts.dmSansBold,
    fontSize: 14,
    color: '#000000',
  },
  speechTrainerStudioPriceValue: {
    fontFamily: fonts.dmSansBold,
    fontSize: 13,
    color: '#000000',
  },
  speechTrainerStudioPriceMicDisabled: {
    fontFamily: fonts.dmSansBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  speechTrainerStudioPriceValueDisabled: {
    fontFamily: fonts.dmSansBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  speechTrainerStudioAvailableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 999,
    backgroundColor: 'rgba(22, 163, 74, 0.15)',
  },
  speechTrainerStudioAvailableCheck: {
    fontSize: 12,
    color: colors.success,
  },
  speechTrainerStudioAvailableText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.success,
  },
  speechTrainerStudioPreview: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 19,
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
  speechTrainerStudioToast: {
    position: 'absolute',
    left: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
  },
  speechTrainerStudioToastText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
  },
});
