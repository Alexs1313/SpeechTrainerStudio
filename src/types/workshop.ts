import {PrompterCategoryId} from './prompter';

export type WorkshopFilterId = 'all' | PrompterCategoryId;

export type WorkshopText = {
  id: string;
  categoryId: PrompterCategoryId;
  title: string;
  description: string;
  body: string;
  wordCount: number;
  createdAt: number;
  updatedAt: number;
};

export type WorkshopScreen = 'list' | 'editor';
