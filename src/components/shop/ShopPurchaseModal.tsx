import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ShopText} from '../../types/shop';
import {colors, fonts} from '../../constants/theme';

type Props = {
  text: ShopText | null;
  balance: number;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ShopPurchaseModal({text, balance, onCancel, onConfirm}: Props) {
  const insets = useSafeAreaInsets();

  if (!text) {
    return null;
  }

  const afterPurchase = balance - text.price;

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable style={styles.ShopPurchaseModalBackdrop} onPress={onCancel}>
        <Pressable
          style={[styles.ShopPurchaseModalSheet, {paddingBottom: insets.bottom + 24}]}
          onPress={e => e.stopPropagation()}>
          <View style={styles.ShopPurchaseModalHandle} />
          <Text style={styles.ShopPurchaseModalTitle}>Confirm Purchase</Text>

          <Text style={styles.ShopPurchaseModalMessage}>
            Unlock{' '}
            <Text style={styles.ShopPurchaseModalMessageBold}>{text.title}</Text>
            {' for '}
            <Text style={styles.ShopPurchaseModalMessagePrice}>🎤 {text.price} Microphones</Text>
            ?
          </Text>

          <Text style={styles.ShopPurchaseModalBalanceNote}>
            You have {balance} Microphones. After this purchase: {afterPurchase}.
          </Text>

          <View style={styles.ShopPurchaseModalActions}>
            <Pressable onPress={onCancel} style={styles.ShopPurchaseModalCancelButton}>
              <Text style={styles.ShopPurchaseModalCancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={styles.ShopPurchaseModalBuyWrapper}>
              <LinearGradient
                colors={['#d97706', colors.coachTipText]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.ShopPurchaseModalBuyButton}>
                <Text style={styles.ShopPurchaseModalBuyText}>🎤 Buy Now</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ShopPurchaseModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  ShopPurchaseModalSheet: {
    backgroundColor: '#1a0f3c',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  ShopPurchaseModalHandle: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  ShopPurchaseModalTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  ShopPurchaseModalMessage: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ShopPurchaseModalMessageBold: {
    fontFamily: fonts.dmSansBold,
    color: colors.textPrimary,
  },
  ShopPurchaseModalMessagePrice: {
    fontFamily: fonts.dmSansBold,
    color: colors.coachTipText,
  },
  ShopPurchaseModalBalanceNote: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  ShopPurchaseModalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  ShopPurchaseModalCancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ShopPurchaseModalCancelText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textAccent,
  },
  ShopPurchaseModalBuyWrapper: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  ShopPurchaseModalBuyButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ShopPurchaseModalBuyText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 15,
    color: '#000000',
  },
});
