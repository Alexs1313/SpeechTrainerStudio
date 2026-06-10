import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {ShopPurchaseModal} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioShop/SpeechTrainerStudioShopPurchaseModal';
import {ShopFilterId, ShopText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioShop/SpeechTrainerStudioShop/SpeechTrainerStudioShop';
import {WorkshopText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {
  loadMicrophoneBalance,
  spendMicrophones,
} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioMicrophone/SpeechTrainerStudioMicrophoneStorage/SpeechTrainerStudioMicrophoneStorage';
import {loadUnlockedShopIds, unlockShopText} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioShop/SpeechTrainerStudioShopStorage/SpeechTrainerStudioShopStorage';
import {
  createWorkshopText,
  loadWorkshopTexts,
  saveWorkshopTexts,
} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshopStorage/SpeechTrainerStudioWorkshopStorage';
import {ShopListScreen} from '../SpeechTrainerStudioShopListScreen/SpeechTrainerStudioShopListScreen';

function shopToWorkshopDraft(
  text: ShopText,
): Pick<WorkshopText, 'categoryId' | 'title' | 'description' | 'body'> {
  return {
    categoryId: text.categoryId,
    title: text.title,
    description: text.description,
    body: text.body,
  };
}

export function ShopStack() {
  const [balance, setBalance] = useState(0);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [filterId, setFilterId] = useState<ShopFilterId>('all');
  const [purchaseText, setPurchaseText] = useState<ShopText | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = useCallback(async () => {
    const [nextBalance, nextUnlocked] = await Promise.all([
      loadMicrophoneBalance(),
      loadUnlockedShopIds(),
    ]);
    setBalance(nextBalance);
    setUnlockedIds(nextUnlocked);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const syncToWorkshop = useCallback(async (text: ShopText) => {
    const workshopTexts = await loadWorkshopTexts();
    const exists = workshopTexts.some(
      t => t.title === text.title && t.categoryId === text.categoryId,
    );
    if (exists) {
      return;
    }
    await saveWorkshopTexts([
      createWorkshopText(shopToWorkshopDraft(text)),
      ...workshopTexts,
    ]);
  }, []);

  const handleConfirmPurchase = useCallback(async () => {
    if (!purchaseText) {
      return;
    }

    const nextBalance = await spendMicrophones(purchaseText.price);
    if (nextBalance === null) {
      setPurchaseText(null);
      return;
    }

    const nextUnlocked = await unlockShopText(purchaseText.id);
    await syncToWorkshop(purchaseText);

    setBalance(nextBalance);
    setUnlockedIds(nextUnlocked);
    setPurchaseText(null);
    showToast(`✅ '${purchaseText.title}' unlocked!`);
  }, [purchaseText, showToast, syncToWorkshop]);

  return (
    <>
      <ShopListScreen
        balance={balance}
        unlockedIds={unlockedIds}
        filterId={filterId}
        toastMessage={toastMessage}
        onFilterChange={setFilterId}
        onPurchasePress={setPurchaseText}
      />
      <ShopPurchaseModal
        text={purchaseText}
        balance={balance}
        onCancel={() => setPurchaseText(null)}
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
}
