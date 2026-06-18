import {TextSize, TextSpeed} from '../types/prompter';

export const SCROLL_SPEED_PX: Record<TextSpeed, number> = {
  slow: 28,
  medium: 48,
  fast: 72,
};

export const TEXT_SIZE_PX: Record<TextSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

export const TEXT_LINE_HEIGHT: Record<TextSize, number> = {
  small: 28,
  medium: 37,
  large: 44,
};
