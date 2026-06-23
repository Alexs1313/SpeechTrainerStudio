import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {loadBlogFavorites, saveBlogFavorites} from '../utils/blogFavorites';
import {BlogArticle} from '../types/blog';
import {useAppNavigation} from '../navigation/NavigationContext';

type BlogContextValue = {
  favoriteIds: string[];
  toggleFavorite: (articleId: string) => void;
  selectArticle: (article: BlogArticle) => void;
};

const BlogContext = createContext<BlogContextValue | null>(null);

export function BlogProvider({children}: {children: React.ReactNode}) {
  const {openBlogArticle} = useAppNavigation();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    loadBlogFavorites().then(setFavoriteIds);
  }, []);

  const toggleFavorite = useCallback((articleId: string) => {
    setFavoriteIds(current => {
      const next = current.includes(articleId)
        ? current.filter(id => id !== articleId)
        : [...current, articleId];
      saveBlogFavorites(next);
      return next;
    });
  }, []);

  const selectArticle = useCallback(
    (article: BlogArticle) => {
      openBlogArticle(article.id);
    },
    [openBlogArticle],
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      toggleFavorite,
      selectArticle,
    }),
    [favoriteIds, toggleFavorite, selectArticle],
  );

  return (
    <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
}
