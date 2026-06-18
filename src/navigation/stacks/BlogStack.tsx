import React, {useCallback, useEffect, useState} from 'react';

import {BlogArticleScreen} from '../../screens/BlogArticleScreen';
import {BlogListScreen} from '../../screens/BlogListScreen';
import {BlogArticle} from '../../types/blog';
import {loadBlogFavorites, saveBlogFavorites} from '../../utils/blogFavorites';

export function BlogStack() {
  const [screen, setScreen] = useState<'list' | 'article'>('list');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(
    null,
  );
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

  const handleSelectArticle = useCallback((article: BlogArticle) => {
    setSelectedArticle(article);
    setScreen('article');
  }, []);

  const handleBack = useCallback(() => {
    setScreen('list');
    setSelectedArticle(null);
  }, []);

  if (screen === 'article' && selectedArticle) {
    return (
      <BlogArticleScreen
        article={selectedArticle}
        isFavorite={favoriteIds.includes(selectedArticle.id)}
        onBack={handleBack}
        onToggleFavorite={() => toggleFavorite(selectedArticle.id)}
      />
    );
  }

  return (
    <BlogListScreen
      favoriteIds={favoriteIds}
      onToggleFavorite={toggleFavorite}
      onSelectArticle={handleSelectArticle}
    />
  );
}
