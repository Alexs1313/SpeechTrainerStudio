import {ImageSourcePropType} from 'react-native';

export type BlogArticle = {
  id: string;
  title: string;
  category: string;
  summary: string;
  paragraphs: string[];
  tags: string[];
  readMinutes: number;
  publishedAt: string;
  image: ImageSourcePropType;
};

export type BlogScreen = 'list' | 'article';
