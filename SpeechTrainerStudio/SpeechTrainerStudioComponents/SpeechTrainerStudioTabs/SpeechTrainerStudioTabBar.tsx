import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {tabIcons} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioAssets';
import {colors, fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

type TabItem = {
  routeName: string;
  label: string;
  icon: ImageSourcePropType;
};

const TABS: TabItem[] = [
  {
    routeName: 'Prompter',
    label: 'Prompter',
    icon: tabIcons.prompter,
  },
  {
    routeName: 'Workshop',
    label: 'Workshop',
    icon: tabIcons.workshop,
  },
  {
    routeName: 'Blog',
    label: 'Blog',
    icon: tabIcons.blog,
  },
  {
    routeName: 'Tips',
    label: 'Tips',
    icon: tabIcons.tips,
  },
  {
    routeName: 'Game',
    label: 'Game',
    icon: tabIcons.game,
  },
  {
    routeName: 'Shop',
    label: 'Shop',
    icon: tabIcons.shop,
  },
];

export function SpeechTrainerStudioTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.SpeechTrainerStudioTabBarWrapper, {paddingBottom: insets.bottom}]}>
      <LinearGradient
        colors={['rgba(7, 3, 26, 0)', 'rgba(7, 3, 26, 0.98)']}
        style={styles.SpeechTrainerStudioTabBarFade}
        pointerEvents="none"
      />
      <View style={styles.SpeechTrainerStudioTabBarBar}>
        {TABS.map((tab, index) => {
          const active = state.index === index;
          return (
            <Pressable
              key={tab.routeName}
              onPress={() => navigation.navigate(tab.routeName)}
              style={styles.SpeechTrainerStudioTabBarTab}>
              <View style={styles.SpeechTrainerStudioTabBarIndicatorSlot}>
                {active && (
                  <LinearGradient
                    colors={[colors.buttonGradientStart, colors.tabActive]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.SpeechTrainerStudioTabBarActiveLine}
                  />
                )}
              </View>
              <Image
                source={tab.icon}
                style={[styles.SpeechTrainerStudioTabBarIcon, active && styles.SpeechTrainerStudioTabBarIconActive]}
                resizeMode="contain"
              />
              <Text style={[styles.SpeechTrainerStudioTabBarLabel, active && styles.SpeechTrainerStudioTabBarLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SpeechTrainerStudioTabBarWrapper: {
    backgroundColor: 'rgba(7, 3, 26, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.15)',
  },
  SpeechTrainerStudioTabBarFade: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 24,
  },
  SpeechTrainerStudioTabBarBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  SpeechTrainerStudioTabBarTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 4,
  },
  SpeechTrainerStudioTabBarIndicatorSlot: {
    width: 32,
    height: 2,
    marginBottom: 6,
    right: 1,
  },
  SpeechTrainerStudioTabBarActiveLine: {
    width: 32,
    height: 2,
    borderRadius: 999,
  },
  SpeechTrainerStudioTabBarIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
    marginBottom: 4,
  },
  SpeechTrainerStudioTabBarIconActive: {
    tintColor: colors.tabActive,
  },
  SpeechTrainerStudioTabBarLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: 0.19,
    color: colors.textSecondary,
  },
  SpeechTrainerStudioTabBarLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.tabActive,
  },
});
