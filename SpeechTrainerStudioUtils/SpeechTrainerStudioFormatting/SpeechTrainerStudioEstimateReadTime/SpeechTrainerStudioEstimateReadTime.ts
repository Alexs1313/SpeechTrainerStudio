import {countWords} from '../../SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

const WORDS_PER_MINUTE = 200;

export function estimateReadMinutes(text: string): number {
  return Math.max(1, Math.ceil(countWords(text) / WORDS_PER_MINUTE));
}
