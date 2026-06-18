export type TipCategoryId = 'voice' | 'clear' | 'public';

export type DictionTip = {
  id: string;
  categoryId: TipCategoryId;
  title: string;
  summary: string;
  description: string;
  howToPractice?: string;
  origin?: string;
};

export type TipCategory = {
  id: TipCategoryId;
  emoji: string;
  shortLabel: string;
  title: string;
};
