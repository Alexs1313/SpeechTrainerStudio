import {BAD_FEEDBACK, GOOD_FEEDBACK} from '../../../SpeechTrainerStudio/SpeechTrainerStudioConstants/SpeechTrainerStudioGameFeedback';
import {
  GAME_MICROPHONE_REWARD,
} from '../../../SpeechTrainerStudio/SpeechTrainerStudioConstants/SpeechTrainerStudioGameTopics';
import {GameChallengeResult, GameResultGrade} from '../../../SpeechTrainerStudio/SpeechTrainerStudioTypes/SpeechTrainerStudioGame/SpeechTrainerStudioGame/SpeechTrainerStudioGame';

export function pickShuffleTopic(topics: string[]): string {
  return topics[Math.floor(Math.random() * topics.length)];
}

export function evaluateGrade(wordCount: number, durationMs: number): GameResultGrade {
  if (wordCount >= 50) {
    return 'good';
  }
  if (wordCount >= 30 && durationMs >= 20000) {
    return 'good';
  }
  return 'bad';
}

function pickFeedback(grade: GameResultGrade): string {
  const pool = grade === 'good' ? GOOD_FEEDBACK : BAD_FEEDBACK;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function buildGameResult(
  topic: string,
  response: string,
  wordCount: number,
  durationMs: number,
  balance: number,
): GameChallengeResult {
  const grade = evaluateGrade(wordCount, durationMs);
  const microphonesEarned = grade === 'good' ? GAME_MICROPHONE_REWARD : 0;

  return {
    topic,
    response,
    wordCount,
    durationMs,
    grade,
    microphonesEarned,
    balance: balance + microphonesEarned,
    coachFeedback: pickFeedback(grade),
  };
}

export function formatGameTime(ms: number): string {
  const seconds = Math.max(1, Math.floor(ms / 1000));
  return `${seconds}s`;
}
