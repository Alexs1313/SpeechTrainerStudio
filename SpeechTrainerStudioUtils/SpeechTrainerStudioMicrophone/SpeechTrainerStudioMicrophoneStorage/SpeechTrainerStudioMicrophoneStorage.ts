import AsyncStorage from '@react-native-async-storage/async-storage';

import {GAME_DEFAULT_BALANCE} from '../../../SpeechTrainerStudio/SpeechTrainerStudioConstants/SpeechTrainerStudioGameTopics';

const BALANCE_KEY = '@microphone_balance';

export async function loadMicrophoneBalance(): Promise<number> {
  const raw = await AsyncStorage.getItem(BALANCE_KEY);
  if (raw === null) {
    await AsyncStorage.setItem(BALANCE_KEY, String(GAME_DEFAULT_BALANCE));
    return GAME_DEFAULT_BALANCE;
  }
  return Number(raw);
}

export async function saveMicrophoneBalance(balance: number): Promise<void> {
  await AsyncStorage.setItem(BALANCE_KEY, String(balance));
}

export async function addMicrophones(amount: number): Promise<number> {
  const current = await loadMicrophoneBalance();
  const next = current + amount;
  await saveMicrophoneBalance(next);
  return next;
}

export async function spendMicrophones(amount: number): Promise<number | null> {
  const current = await loadMicrophoneBalance();
  if (current < amount) {
    return null;
  }
  const next = current - amount;
  await saveMicrophoneBalance(next);
  return next;
}
