import {PrompterCategoryId} from '../types/prompter';
import {WorkshopFilterId} from '../types/workshop';

export type WorkshopCategoryOption = {
  id: WorkshopFilterId;
  label: string;
  emoji?: string;
};

export const WORKSHOP_FILTER_CATEGORIES: WorkshopCategoryOption[] = [
  {id: 'all', label: 'All'},
  {
    id: 'public-speaking',
    label: 'Public',
    emoji: '🎤',
  },
  {
    id: 'articulation',
    label: 'Articulation',
    emoji: '🗣️',
  },
  {
    id: 'storytelling',
    label: 'Storytelling',
    emoji: '🎭',
  },
];

export const WORKSHOP_EDITOR_CATEGORIES = WORKSHOP_FILTER_CATEGORIES.filter(
  c => c.id !== 'all',
);

export function getCategoryEmoji(categoryId: PrompterCategoryId): string {
  return (
    WORKSHOP_EDITOR_CATEGORIES.find(c => c.id === categoryId)?.emoji ?? '📝'
  );
}
