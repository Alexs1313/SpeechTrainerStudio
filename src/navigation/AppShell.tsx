import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

// Components
import {TabBar} from '../components/nav/TabBar';
import {getBlogArticleById} from '../constants/blogArticles';
import {colors} from '../constants/theme';
import {useBlog} from '../context/BlogContext';
import {useGame} from '../context/GameContext';
import {usePrompter} from '../context/PrompterContext';
import {ShopTabScreen} from '../context/ShopContext';
import {useWorkshop} from '../context/WorkshopContext';

// Screens
import {BlogArticleScreen} from '../screens/BlogArticleScreen';
import {BlogListScreen} from '../screens/BlogListScreen';
import {DictionTipsScreen} from '../screens/DictionTipsScreen';
import {GameChallengeScreen} from '../screens/GameChallengeScreen';
import {GameHomeScreen} from '../screens/GameHomeScreen';
import {GameResultsScreen} from '../screens/GameResultsScreen';
import {LoaderScreen} from '../screens/LoaderScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PrompterChooseScreen} from '../screens/PrompterChooseScreen';
import {PrompterConfigureScreen} from '../screens/PrompterConfigureScreen';
import {PrompterResultsScreen} from '../screens/PrompterResultsScreen';
import {PrompterSessionScreen} from '../screens/PrompterSessionScreen';
import {WorkshopEditorScreen} from '../screens/WorkshopEditorScreen';
import {WorkshopListScreen} from '../screens/WorkshopListScreen';
import {useAppNavigation} from './NavigationContext';

function TabContent() {
  const {activeTab} = useAppNavigation();
  const prompter = usePrompter();
  const workshop = useWorkshop();
  const blog = useBlog();
  const game = useGame();

  switch (activeTab) {
    case 'PrompterTab':
      return (
        <PrompterChooseScreen
          selectedCategoryId={prompter.selectedCategoryId}
          unlockedTexts={prompter.unlockedTexts}
          onSelectCategory={prompter.setSelectedCategoryId}
          onSelectText={prompter.selectText}
        />
      );
    case 'WorkshopTab':
      if (workshop.loading) {
        return (
          <View style={styles.AppShellLoading}>
            <ActivityIndicator color={colors.tabActive} />
          </View>
        );
      }
      return (
        <WorkshopListScreen
          texts={workshop.texts}
          filterId={workshop.filterId}
          onFilterChange={workshop.setFilterId}
          onNew={workshop.startNew}
          onEdit={workshop.startEdit}
          onDelete={workshop.deleteText}
        />
      );
    case 'BlogTab':
      return (
        <BlogListScreen
          favoriteIds={blog.favoriteIds}
          onToggleFavorite={blog.toggleFavorite}
          onSelectArticle={blog.selectArticle}
        />
      );
    case 'TipsTab':
      return <DictionTipsScreen />;
    case 'GameTab':
      if (game.loading) {
        return (
          <View style={styles.AppShellLoading}>
            <ActivityIndicator color={colors.tabActive} />
          </View>
        );
      }
      return <GameHomeScreen onStart={game.startChallenge} />;
    case 'ShopTab':
      return <ShopTabScreen />;
    default:
      return null;
  }
}

function OverlayContent() {
  const {overlay, goBack, closeOverlay} = useAppNavigation();
  const prompter = usePrompter();
  const workshop = useWorkshop();
  const blog = useBlog();
  const game = useGame();

  switch (overlay.type) {
    case 'PrompterConfigure':
      if (!prompter.selectedText) {
        return null;
      }
      return (
        <PrompterConfigureScreen
          text={prompter.selectedText}
          onBack={goBack}
          onBegin={prompter.beginSession}
        />
      );
    case 'PrompterSession':
      if (!prompter.sessionConfig) {
        return null;
      }
      return (
        <PrompterSessionScreen
          config={prompter.sessionConfig}
          onClose={() => {
            prompter.resetPrompter();
            closeOverlay();
          }}
          onComplete={prompter.completeSession}
        />
      );
    case 'PrompterResults':
      if (!prompter.sessionResult) {
        return null;
      }
      return (
        <PrompterResultsScreen
          result={prompter.sessionResult}
          onBack={() => {
            prompter.resetPrompter();
            closeOverlay();
          }}
          onPracticeAgain={prompter.practiceAgain}
          onChooseDifferent={() => {
            prompter.resetPrompter();
            closeOverlay();
          }}
        />
      );
    case 'WorkshopEditor':
      return (
        <WorkshopEditorScreen
          editingText={workshop.editingText}
          onClose={workshop.closeEditor}
          onSave={workshop.saveDraft}
        />
      );
    case 'BlogArticle': {
      const article = getBlogArticleById(overlay.articleId);
      if (!article) {
        return null;
      }
      return (
        <BlogArticleScreen
          article={article}
          isFavorite={blog.favoriteIds.includes(article.id)}
          onBack={goBack}
          onToggleFavorite={() => blog.toggleFavorite(article.id)}
        />
      );
    }
    case 'GameChallenge':
      if (!game.topic) {
        return null;
      }
      return (
        <GameChallengeScreen
          topic={game.topic}
          onSubmit={game.submitChallenge}
        />
      );
    case 'GameResults':
      if (!game.result) {
        return null;
      }
      return (
        <GameResultsScreen
          result={game.result}
          onBack={game.resetToHome}
          onTryAgain={game.tryAgain}
        />
      );
    default:
      return null;
  }
}

function MainShell() {
  const {overlay, activeTab, selectTab} = useAppNavigation();
  const showTabBar = overlay.type === 'none';

  return (
    <View style={styles.AppShellFacetChassis}>
      <View style={styles.AppShellContent}>
        <TabContent />
      </View>
      {overlay.type !== 'none' && (
        <View style={styles.AppShellOverlay}>
          <OverlayContent />
        </View>
      )}
      {showTabBar && <TabBar activeTab={activeTab} onSelectTab={selectTab} />}
    </View>
  );
}

export function AppShell() {
  const {phase, finishLoader, finishOnboarding} = useAppNavigation();

  if (phase === 'Loader') {
    return <LoaderScreen onComplete={finishLoader} />;
  }

  if (phase === 'Onboarding') {
    return <OnboardingScreen onComplete={finishOnboarding} />;
  }

  return <MainShell />;
}

const styles = StyleSheet.create({
  AppShellFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  AppShellContent: {
    flex: 1,
  },
  AppShellOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
  },
  AppShellLoading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
