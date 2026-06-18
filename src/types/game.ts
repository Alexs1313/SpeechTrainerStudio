export type GameScreen = 'home' | 'challenge' | 'results';

export type GameResultGrade = 'good' | 'bad';

export type GameChallengeResult = {
  topic: string;
  response: string;
  wordCount: number;
  durationMs: number;
  grade: GameResultGrade;
  microphonesEarned: number;
  balance: number;
  coachFeedback: string;
};
