import AsyncStorage from '@react-native-async-storage/async-storage';

import {getUnlockedShopTexts} from '../../../SpeechTrainerStudio/SpeechTrainerStudioConstants/SpeechTrainerStudioShopTexts';
import {ShopText} from '../../../SpeechTrainerStudio/SpeechTrainerStudioTypes/SpeechTrainerStudioShop/SpeechTrainerStudioShop/SpeechTrainerStudioShop';

const UNLOCKED_KEY = '@shop_unlocked_ids';

export async function loadUnlockedShopIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(UNLOCKED_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}

export async function saveUnlockedShopIds(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(UNLOCKED_KEY, JSON.stringify(ids));
}

export async function unlockShopText(id: string): Promise<string[]> {
  const current = await loadUnlockedShopIds();
  if (current.includes(id)) {
    return current;
  }
  const next = [...current, id];
  await saveUnlockedShopIds(next);
  return next;
}

export async function getUnlockedShopTextsFromStorage(): Promise<ShopText[]> {
  const unlockedIds = await loadUnlockedShopIds();
  return getUnlockedShopTexts(unlockedIds);
}
