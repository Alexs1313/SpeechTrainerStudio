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
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {BlogArticle} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog/SpeechTrainerStudioBlog';

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
        <View style={styles.speechTrainerStudioHero}>
          <Image
            source={article.image}
            style={styles.speechTrainerStudioHeroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(7,3,26,0.4)', 'rgba(7,3,26,0.9)']}
            style={styles.speechTrainerStudioHeroGradient}
          />

          <Pressable
            onPress={onBack}
            style={[styles.speechTrainerStudioBackButton, {top: insets.top + 12}]}>
            <Text style={styles.speechTrainerStudioBackIcon}>‹</Text>
          </Pressable>

          <View style={[styles.speechTrainerStudioHeroActions, {bottom: 16}]}>
            <Pressable
              onPress={onToggleFavorite}
              style={styles.speechTrainerStudioHeroButton}>
              <Text
                style={[
                  styles.speechTrainerStudioStarIcon,
                  isFavorite && styles.speechTrainerStudioStarIconActive,
                ]}>
                {isFavorite ? '★' : '☆'}
              </Text>
            </Pressable>
            <Pressable onPress={handleShare} style={styles.speechTrainerStudioHeroButton}>
              <Text style={styles.speechTrainerStudioShareIcon}>↗</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.speechTrainerStudioBody}>
          <View style={styles.speechTrainerStudioMetaRow}>
            <View style={styles.speechTrainerStudioCategoryPill}>
              <Text style={styles.speechTrainerStudioCategoryText}>{article.category}</Text>
            </View>
            <View style={styles.speechTrainerStudioReadTimeRow}>
              <Text style={styles.speechTrainerStudioClockIcon}>🕐</Text>
              <Text style={styles.speechTrainerStudioReadTime}>
                {article.readMinutes} min read
              </Text>
            </View>
          </View>

          <Text style={styles.speechTrainerStudioTitle}>{article.title}</Text>

          <View style={styles.speechTrainerStudioAuthorRow}>
            <LinearGradient
              colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
              style={styles.speechTrainerStudioAuthorAvatar}>
              <Text style={styles.speechTrainerStudioAuthorEmoji}>🎙️</Text>
            </LinearGradient>
            <Text style={styles.speechTrainerStudioAuthorText}>
              {BLOG_AUTHOR} · {article.publishedAt}
            </Text>
          </View>

          <View style={styles.speechTrainerStudioParagraphs}>
            {article.paragraphs.map((paragraph, index) => (
              <Text
                key={`${article.id}-p-${index}`}
                style={[styles.speechTrainerStudioParagraph, index > 0 && styles.speechTrainerStudioParagraphGap]}>
                {paragraph}
              </Text>
            ))}
          </View>

          <View style={styles.speechTrainerStudioTags}>
            {article.tags.map(tag => (
              <View key={tag} style={styles.speechTrainerStudioTag}>
                <Text style={styles.speechTrainerStudioTagIcon}>🏷</Text>
                <Text style={styles.speechTrainerStudioTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioHero: {
    height: 224,
    position: 'relative',
  },
  speechTrainerStudioHeroImage: {
    width: '100%',
    height: '100%',
  },
  speechTrainerStudioHeroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  speechTrainerStudioBackButton: {
    position: 'absolute',
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(7, 3, 26, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioHeroButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(7, 3, 26, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioBackIcon: {
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 30,
    marginTop: -2,
    marginLeft: -2,
  },
  speechTrainerStudioHeroActions: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  speechTrainerStudioStarIcon: {
    fontSize: 16,
    color: colors.textAccent,
    lineHeight: 18,
  },
  speechTrainerStudioStarIconActive: {
    color: colors.coachTipText,
  },
  speechTrainerStudioShareIcon: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  speechTrainerStudioBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  speechTrainerStudioMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  speechTrainerStudioCategoryPill: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  speechTrainerStudioCategoryText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    color: colors.textAccent,
  },
  speechTrainerStudioReadTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  speechTrainerStudioClockIcon: {
    fontSize: 11,
  },
  speechTrainerStudioReadTime: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  speechTrainerStudioAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  speechTrainerStudioAuthorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioAuthorEmoji: {
    fontSize: 14,
  },
  speechTrainerStudioAuthorText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  speechTrainerStudioParagraphs: {
    marginBottom: 24,
  },
  speechTrainerStudioParagraph: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  speechTrainerStudioParagraphGap: {
    marginTop: 16,
  },
  speechTrainerStudioTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  speechTrainerStudioTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  speechTrainerStudioTagIcon: {
    fontSize: 10,
  },
  speechTrainerStudioTagText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
