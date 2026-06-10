import AsyncStorage from '@react-native-async-storage/async-storage';

import {WORKSHOP_SEED_TEXTS} from '../../../SpeechTrainerStudio/SpeechTrainerStudioConstants/SpeechTrainerStudioWorkshopSeedData';
import {WorkshopText} from '../../../SpeechTrainerStudio/SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {countWords} from '../../SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

const STORAGE_KEY = '@workshop_texts';
const SEEDED_KEY = '@workshop_seeded';

export async function loadWorkshopTexts(): Promise<WorkshopText[]> {
  const seeded = await AsyncStorage.getItem(SEEDED_KEY);
  if (!seeded) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(WORKSHOP_SEED_TEXTS));
    await AsyncStorage.setItem(SEEDED_KEY, 'true');
    return WORKSHOP_SEED_TEXTS;
  }

  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  return JSON.parse(raw) as WorkshopText[];
}

export async function saveWorkshopTexts(texts: WorkshopText[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(texts));
}

export function createWorkshopText(
  input: Pick<WorkshopText, 'categoryId' | 'title' | 'description' | 'body'>,
): WorkshopText {
  const now = Date.now();
  return {
    id: `ws-${now}`,
    ...input,
    wordCount: countWords(input.body),
    createdAt: now,
    updatedAt: now,
  };
}

export function updateWorkshopText(
  existing: WorkshopText,
  input: Pick<WorkshopText, 'categoryId' | 'title' | 'description' | 'body'>,
): WorkshopText {
  return {
    ...existing,
    ...input,
    wordCount: countWords(input.body),
    updatedAt: Date.now(),
  };
}
