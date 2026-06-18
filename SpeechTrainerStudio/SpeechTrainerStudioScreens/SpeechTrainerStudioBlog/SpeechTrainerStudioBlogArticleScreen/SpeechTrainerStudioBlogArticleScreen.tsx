import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {BLOG_AUTHOR} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioBlogArticles';
import {BlogArticle} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog';
import {colors, fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

type Props = {
  article: BlogArticle;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
};

export function BlogArticleScreen({
  article,
  isFavorite,
  onBack,
  onToggleFavorite,
}: Props) {
  const insets = useSafeAreaInsets();

  const handleShare = async () => {
    try {
      await Share.share({
        title: article.title,
        message: `${article.title}\n\n${article.summary}`,
      });
    } catch {
      // User dismissed share sheet.
    }
  };

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={{paddingBottom: insets.bottom + 100}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.BlogArticleScreenHero}>
          <Image
            source={article.image}
            style={styles.BlogArticleScreenHeroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(7,3,26,0.4)', 'rgba(7,3,26,0.9)']}
            style={styles.BlogArticleScreenHeroGradient}
          />

          <Pressable
            onPress={onBack}
            style={[styles.BlogArticleScreenBackButton, {top: insets.top + 12}]}>
            <Text style={styles.BlogArticleScreenBackIcon}>‹</Text>
          </Pressable>

          <View style={[styles.BlogArticleScreenHeroActions, {bottom: 16}]}>
            <Pressable
              onPress={onToggleFavorite}
              style={styles.BlogArticleScreenHeroButton}>
              <Text
                style={[
                  styles.BlogArticleScreenStarIcon,
                  isFavorite && styles.BlogArticleScreenStarIconActive,
                ]}>
                {isFavorite ? '★' : '☆'}
              </Text>
            </Pressable>
            <Pressable onPress={handleShare} style={styles.BlogArticleScreenHeroButton}>
              <Text style={styles.BlogArticleScreenShareIcon}>↗</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.BlogArticleScreenBody}>
          <View style={styles.BlogArticleScreenMetaRow}>
            <View style={styles.BlogArticleScreenCategoryPill}>
              <Text style={styles.BlogArticleScreenCategoryText}>{article.category}</Text>
            </View>
            <View style={styles.BlogArticleScreenReadTimeRow}>
              <Text style={styles.BlogArticleScreenClockIcon}>🕐</Text>
              <Text style={styles.BlogArticleScreenReadTime}>
                {article.readMinutes} min read
              </Text>
            </View>
          </View>

          <Text style={styles.BlogArticleScreenTitle}>{article.title}</Text>

          <View style={styles.BlogArticleScreenAuthorRow}>
            <LinearGradient
              colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
              style={styles.BlogArticleScreenAuthorAvatar}>
              <Text style={styles.BlogArticleScreenAuthorEmoji}>🎙️</Text>
            </LinearGradient>
            <Text style={styles.BlogArticleScreenAuthorText}>
              {BLOG_AUTHOR} · {article.publishedAt}
            </Text>
          </View>

          <View style={styles.BlogArticleScreenParagraphs}>
            {article.paragraphs.map((paragraph, index) => (
              <Text
                key={`${article.id}-p-${index}`}
                style={[styles.BlogArticleScreenParagraph, index > 0 && styles.BlogArticleScreenParagraphGap]}>
                {paragraph}
              </Text>
            ))}
          </View>

          <View style={styles.BlogArticleScreenTags}>
            {article.tags.map(tag => (
              <View key={tag} style={styles.BlogArticleScreenTag}>
                <Text style={styles.BlogArticleScreenTagIcon}>🏷</Text>
                <Text style={styles.BlogArticleScreenTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  BlogArticleScreenHero: {
    height: 224,
    position: 'relative',
  },
  BlogArticleScreenHeroImage: {
    width: '100%',
    height: '100%',
  },
  BlogArticleScreenHeroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  BlogArticleScreenBackButton: {
    position: 'absolute',
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(7, 3, 26, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BlogArticleScreenHeroButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(7, 3, 26, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BlogArticleScreenBackIcon: {
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 30,
    marginTop: -2,
    marginLeft: -2,
  },
  BlogArticleScreenHeroActions: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  BlogArticleScreenStarIcon: {
    fontSize: 16,
    color: colors.textAccent,
    lineHeight: 18,
  },
  BlogArticleScreenStarIconActive: {
    color: colors.coachTipText,
  },
  BlogArticleScreenShareIcon: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  BlogArticleScreenBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  BlogArticleScreenMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  BlogArticleScreenCategoryPill: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  BlogArticleScreenCategoryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.textAccent,
  },
  BlogArticleScreenReadTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  BlogArticleScreenClockIcon: {
    fontSize: 11,
  },
  BlogArticleScreenReadTime: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  BlogArticleScreenTitle: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  BlogArticleScreenAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  BlogArticleScreenAuthorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BlogArticleScreenAuthorEmoji: {
    fontSize: 14,
  },
  BlogArticleScreenAuthorText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  BlogArticleScreenParagraphs: {
    marginBottom: 24,
  },
  BlogArticleScreenParagraph: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  BlogArticleScreenParagraphGap: {
    marginTop: 16,
  },
  BlogArticleScreenTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  BlogArticleScreenTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  BlogArticleScreenTagIcon: {
    fontSize: 10,
  },
  BlogArticleScreenTagText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
