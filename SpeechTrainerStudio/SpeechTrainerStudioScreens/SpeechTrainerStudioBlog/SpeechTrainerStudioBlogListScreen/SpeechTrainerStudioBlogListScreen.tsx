import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {BLOG_ARTICLES, BLOG_AUTHOR} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioBlogArticles';
import {BlogArticle} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog';
import {colors, fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

type Props = {
  favoriteIds: string[];
  onToggleFavorite: (articleId: string) => void;
  onSelectArticle: (article: BlogArticle) => void;
};

export function BlogListScreen({
  favoriteIds,
  onToggleFavorite,
  onSelectArticle,
}: Props) {
  const insets = useSafeAreaInsets();

  const sortedArticles = useMemo(() => {
    const favoriteSet = new Set(favoriteIds);
    return [...BLOG_ARTICLES].sort((a, b) => {
      const aFav = favoriteSet.has(a.id);
      const bFav = favoriteSet.has(b.id);
      if (aFav !== bFav) {
        return aFav ? -1 : 1;
      }
      return 0;
    });
  }, [favoriteIds]);

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={[
          styles.BlogListScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.BlogListScreenEyebrow}>Speaking Coach Blog</Text>
        <Text style={styles.BlogListScreenTitle}>Articles</Text>

        <LinearGradient
          colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.15)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.BlogListScreenInfoCard}>
          <View style={styles.BlogListScreenInfoCardInner}>
            <Text style={styles.BlogListScreenInfoEmoji}>📚</Text>
            <View style={styles.BlogListScreenInfoTextWrap}>
              <Text style={styles.BlogListScreenInfoTitle}>
                {BLOG_ARTICLES.length} articles from {BLOG_AUTHOR}
              </Text>
              <Text style={styles.BlogListScreenInfoSubtitle}>
                Tap ⭐ to add to favorites — they appear at the top
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.BlogListScreenArticleList}>
          {sortedArticles.map(article => {
            const isFavorite = favoriteIds.includes(article.id);
            return (
              <Pressable
                key={article.id}
                onPress={() => onSelectArticle(article)}
                style={styles.BlogListScreenArticleCard}>
                <View style={styles.BlogListScreenImageWrap}>
                  <Image
                    source={article.image}
                    style={styles.BlogListScreenArticleImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(17,8,48,0.8)']}
                    locations={[0.4, 1]}
                    style={styles.BlogListScreenImageGradient}
                  />
                  <View style={styles.BlogListScreenCategoryBadge}>
                    <Text style={styles.BlogListScreenCategoryText}>{article.category}</Text>
                  </View>
                  {isFavorite && (
                    <Text style={styles.BlogListScreenImageFavorite}>⭐</Text>
                  )}
                </View>

                <View style={styles.BlogListScreenCardBody}>
                  <Text style={styles.BlogListScreenArticleTitle}>{article.title}</Text>
                  <Text style={styles.BlogListScreenArticleSummary}>{article.summary}</Text>

                  <View style={styles.BlogListScreenCardFooter}>
                    <View style={styles.BlogListScreenMetaRow}>
                      <Text style={styles.BlogListScreenMetaText}>{BLOG_AUTHOR}</Text>
                      <Text style={styles.BlogListScreenMetaDot}>·</Text>
                      <Text style={styles.BlogListScreenMetaClock}>🕐</Text>
                      <Text style={styles.BlogListScreenMetaText}>
                        {article.readMinutes} min
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => onToggleFavorite(article.id)}
                      hitSlop={8}
                      style={[
                        styles.BlogListScreenFavoriteButton,
                        isFavorite && styles.BlogListScreenFavoriteButtonActive,
                      ]}>
                      <Text
                        style={[
                          styles.BlogListScreenFavoriteIcon,
                          isFavorite && styles.BlogListScreenFavoriteIconActive,
                        ]}>
                        {isFavorite ? '★' : '☆'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  BlogListScreenContent: {
    paddingHorizontal: 20,
  },
  BlogListScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  BlogListScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  BlogListScreenInfoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 24,
  },
  BlogListScreenInfoCardInner: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  BlogListScreenInfoEmoji: {
    fontSize: 28,
    lineHeight: 32,
  },
  BlogListScreenInfoTextWrap: {
    flex: 1,
  },
  BlogListScreenInfoTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  BlogListScreenInfoSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  BlogListScreenArticleList: {
    gap: 16,
  },
  BlogListScreenArticleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  BlogListScreenImageWrap: {
    height: 160,
    position: 'relative',
  },
  BlogListScreenArticleImage: {
    width: '100%',
    height: '100%',
  },
  BlogListScreenImageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  BlogListScreenCategoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.7)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  BlogListScreenCategoryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.white,
  },
  BlogListScreenImageFavorite: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 18,
  },
  BlogListScreenCardBody: {
    padding: 16,
  },
  BlogListScreenArticleTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  BlogListScreenArticleSummary: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  BlogListScreenCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  BlogListScreenMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  BlogListScreenMetaText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  BlogListScreenMetaDot: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  BlogListScreenMetaClock: {
    fontSize: 11,
  },
  BlogListScreenFavoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BlogListScreenFavoriteButtonActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  BlogListScreenFavoriteIcon: {
    fontSize: 16,
    color: colors.textAccent,
    lineHeight: 18,
  },
  BlogListScreenFavoriteIconActive: {
    color: colors.coachTipText,
  },
});
