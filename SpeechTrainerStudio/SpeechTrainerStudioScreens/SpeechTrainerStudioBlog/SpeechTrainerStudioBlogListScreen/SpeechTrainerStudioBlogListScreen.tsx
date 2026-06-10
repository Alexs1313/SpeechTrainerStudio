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
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {BlogArticle} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog';

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
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.speechTrainerStudioEyebrow}>Speaking Coach Blog</Text>
        <Text style={styles.speechTrainerStudioTitle}>Articles</Text>

        <LinearGradient
          colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.15)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.speechTrainerStudioInfoCard}>
          <View style={styles.speechTrainerStudioInfoCardInner}>
            <Text style={styles.speechTrainerStudioInfoEmoji}>📚</Text>
            <View style={styles.speechTrainerStudioInfoTextWrap}>
              <Text style={styles.speechTrainerStudioInfoTitle}>
                {BLOG_ARTICLES.length} articles from {BLOG_AUTHOR}
              </Text>
              <Text style={styles.speechTrainerStudioInfoSubtitle}>
                Tap ⭐ to add to favorites — they appear at the top
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.speechTrainerStudioArticleList}>
          {sortedArticles.map(article => {
            const isFavorite = favoriteIds.includes(article.id);
            return (
              <Pressable
                key={article.id}
                onPress={() => onSelectArticle(article)}
                style={styles.speechTrainerStudioArticleCard}>
                <View style={styles.speechTrainerStudioImageWrap}>
                  <Image
                    source={article.image}
                    style={styles.speechTrainerStudioArticleImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(17,8,48,0.8)']}
                    locations={[0.4, 1]}
                    style={styles.speechTrainerStudioImageGradient}
                  />
                  <View style={styles.speechTrainerStudioCategoryBadge}>
                    <Text style={styles.speechTrainerStudioCategoryText}>{article.category}</Text>
                  </View>
                  {isFavorite && (
                    <Text style={styles.speechTrainerStudioImageFavorite}>⭐</Text>
                  )}
                </View>

                <View style={styles.speechTrainerStudioCardBody}>
                  <Text style={styles.speechTrainerStudioArticleTitle}>{article.title}</Text>
                  <Text style={styles.speechTrainerStudioArticleSummary}>{article.summary}</Text>

                  <View style={styles.speechTrainerStudioCardFooter}>
                    <View style={styles.speechTrainerStudioMetaRow}>
                      <Text style={styles.speechTrainerStudioMetaText}>{BLOG_AUTHOR}</Text>
                      <Text style={styles.speechTrainerStudioMetaDot}>·</Text>
                      <Text style={styles.speechTrainerStudioMetaClock}>🕐</Text>
                      <Text style={styles.speechTrainerStudioMetaText}>
                        {article.readMinutes} min
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => onToggleFavorite(article.id)}
                      hitSlop={8}
                      style={[
                        styles.speechTrainerStudioFavoriteButton,
                        isFavorite && styles.speechTrainerStudioFavoriteButtonActive,
                      ]}>
                      <Text
                        style={[
                          styles.speechTrainerStudioFavoriteIcon,
                          isFavorite && styles.speechTrainerStudioFavoriteIconActive,
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
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  speechTrainerStudioInfoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginBottom: 24,
  },
  speechTrainerStudioInfoCardInner: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  speechTrainerStudioInfoEmoji: {
    fontSize: 28,
    lineHeight: 32,
  },
  speechTrainerStudioInfoTextWrap: {
    flex: 1,
  },
  speechTrainerStudioInfoTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  speechTrainerStudioInfoSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  speechTrainerStudioArticleList: {
    gap: 16,
  },
  speechTrainerStudioArticleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  speechTrainerStudioImageWrap: {
    height: 160,
    position: 'relative',
  },
  speechTrainerStudioArticleImage: {
    width: '100%',
    height: '100%',
  },
  speechTrainerStudioImageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  speechTrainerStudioCategoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.7)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  speechTrainerStudioCategoryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.white,
  },
  speechTrainerStudioImageFavorite: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 18,
  },
  speechTrainerStudioCardBody: {
    padding: 16,
  },
  speechTrainerStudioArticleTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  speechTrainerStudioArticleSummary: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  speechTrainerStudioCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speechTrainerStudioMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  speechTrainerStudioMetaText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  speechTrainerStudioMetaDot: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  speechTrainerStudioMetaClock: {
    fontSize: 11,
  },
  speechTrainerStudioFavoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioFavoriteButtonActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  speechTrainerStudioFavoriteIcon: {
    fontSize: 16,
    color: colors.textAccent,
    lineHeight: 18,
  },
  speechTrainerStudioFavoriteIconActive: {
    color: colors.coachTipText,
  },
});
