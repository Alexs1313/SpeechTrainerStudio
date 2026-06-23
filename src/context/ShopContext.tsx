import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {ShopPurchaseModal} from '../components/shop/ShopPurchaseModal';
import {ShopListScreen} from '../screens/ShopListScreen';
import {ShopFilterId, ShopText} from '../types/shop';
import {WorkshopText} from '../types/workshop';
import {
  loadMicrophoneBalance,
  spendMicrophones,
} from '../utils/microphoneStorage';
import {loadUnlockedShopIds, unlockShopText} from '../utils/shopStorage';
import {
  createWorkshopText,
  loadWorkshopTexts,
  saveWorkshopTexts,
} from '../utils/workshopStorage';
import {useAppNavigation} from '../navigation/NavigationContext';

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

type ShopContextValue = {
  balance: number;
  unlockedIds: string[];
  filterId: ShopFilterId;
  toastMessage: string | null;
  setFilterId: (id: ShopFilterId) => void;
  openPurchase: (text: ShopText) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({children}: {children: React.ReactNode}) {
  const {activeTab} = useAppNavigation();
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
    if (activeTab === 'ShopTab') {
      refresh();
    }
  }, [activeTab, refresh]);

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

  const value = useMemo(
    () => ({
      balance,
      unlockedIds,
      filterId,
      toastMessage,
      setFilterId,
      openPurchase: setPurchaseText,
    }),
    [balance, unlockedIds, filterId, toastMessage],
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      <ShopPurchaseModal
        text={purchaseText}
        balance={balance}
        onCancel={() => setPurchaseText(null)}
        onConfirm={handleConfirmPurchase}
      />
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
}

export function ShopTabScreen() {
  const shop = useShop();

  return (
    <ShopListScreen
      balance={shop.balance}
      unlockedIds={shop.unlockedIds}
      filterId={shop.filterId}
      toastMessage={shop.toastMessage}
      onFilterChange={shop.setFilterId}
      onPurchasePress={shop.openPurchase}
    />
  );
}
