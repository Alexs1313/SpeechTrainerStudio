import React from 'react';
import {StyleSheet, View} from 'react-native';

import {TabBar} from '../components/nav/TabBar';
import {colors} from '../constants/theme';
import {BlogStack} from './stacks/BlogStack';
import {GameStack} from './stacks/GameStack';
import {PrompterStack} from './stacks/PrompterStack';
import {ShopStack} from './stacks/ShopStack';
import {WorkshopStack} from './stacks/WorkshopStack';
import {DictionTipsScreen} from '../screens/DictionTipsScreen';
import {LoaderScreen} from '../screens/LoaderScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {useAppNavigation} from './NavigationContext';

function TabContent() {
  const {activeTab} = useAppNavigation();

  switch (activeTab) {
    case 'Prompter':
      return <PrompterStack />;
    case 'Workshop':
      return <WorkshopStack />;
    case 'Blog':
      return <BlogStack />;
    case 'Tips':
      return <DictionTipsScreen />;
    case 'Game':
      return <GameStack />;
    case 'Shop':
      return <ShopStack />;
    default:
      return <PrompterStack />;
  }
}

function MainShell() {
  const {activeTab, selectTab} = useAppNavigation();

  return (
    <View style={styles.AppShellFacetChassis}>
      <View style={styles.AppShellContent}>
        <TabContent />
      </View>
      <TabBar activeTab={activeTab} onSelectTab={selectTab} />
    </View>
  );
}

export function AppShell() {
  const {phase, finishLoader, finishOnboarding} = useAppNavigation();

  if (phase === 'loading') {
    return <LoaderScreen onComplete={finishLoader} />;
  }

  if (phase === 'onboarding') {
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
});
