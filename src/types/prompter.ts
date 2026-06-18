export type TextSpeed = 'slow' | 'medium' | 'fast';
export type TextSize = 'small' | 'medium' | 'large';

export type PrompterCategoryId =
  | 'public-speaking'
  | 'articulation'
  | 'storytelling';

export type PrompterText = {
  id: string;
  categoryId: PrompterCategoryId;
  title: string;
  description: string;
  body: string;
  wordCount: number;
};

export type PrompterCategory = {
  id: PrompterCategoryId;
  title: string;
  emoji: string;
  texts: PrompterText[];
};

export type SessionConfig = {
  text: PrompterText;
  speed: TextSpeed;
  size: TextSize;
};

export type SessionResult = {
  text: PrompterText;
  durationMs: number;
  wordCount: number;
  wordsPerMinute: number;
};

export type PrompterScreen = 'choose' | 'configure' | 'session' | 'results';
