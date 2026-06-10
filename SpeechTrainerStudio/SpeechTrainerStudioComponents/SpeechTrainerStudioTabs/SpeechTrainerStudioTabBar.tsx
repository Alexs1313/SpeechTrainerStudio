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

import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';

type TabItem = {
  routeName: string;
  label: string;
  icon: ImageSourcePropType;
};

const TABS: TabItem[] = [
  {
    routeName: 'Prompter',
    label: 'Prompter',
    icon: require('../../SpeechTrainerStudioAssets/images/prompter.png'),
  },
  {
    routeName: 'Workshop',
    label: 'Workshop',
    icon: require('../../SpeechTrainerStudioAssets/images/workshop.png'),
  },
  {
    routeName: 'Blog',
    label: 'Blog',
    icon: require('../../SpeechTrainerStudioAssets/images/blog.png'),
  },
  {
    routeName: 'Tips',
    label: 'Tips',
    icon: require('../../SpeechTrainerStudioAssets/images/tips.png'),
  },
  {
    routeName: 'Game',
    label: 'Game',
    icon: require('../../SpeechTrainerStudioAssets/images/game.png'),
  },
  {
    routeName: 'Shop',
    label: 'Shop',
    icon: require('../../SpeechTrainerStudioAssets/images/shop.png'),
  },
];

export function SpeechTrainerStudioTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.speechTrainerStudioWrapper, {paddingBottom: insets.bottom}]}>
      <LinearGradient
        colors={['rgba(7, 3, 26, 0)', 'rgba(7, 3, 26, 0.98)']}
        style={styles.speechTrainerStudioFade}
        pointerEvents="none"
      />
      <View style={styles.speechTrainerStudioBar}>
        {TABS.map((tab, index) => {
          const active = state.index === index;
          return (
            <Pressable
              key={tab.routeName}
              onPress={() => navigation.navigate(tab.routeName)}
              style={styles.speechTrainerStudioTab}>
              <View style={styles.speechTrainerStudioIndicatorSlot}>
                {active && (
                  <LinearGradient
                    colors={[colors.buttonGradientStart, colors.tabActive]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.speechTrainerStudioActiveLine}
                  />
                )}
              </View>
              <Image
                source={tab.icon}
                style={[styles.speechTrainerStudioIcon, active && styles.speechTrainerStudioIconActive]}
                resizeMode="contain"
              />
              <Text style={[styles.speechTrainerStudioLabel, active && styles.speechTrainerStudioLabelActive]}>
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
  speechTrainerStudioWrapper: {
    backgroundColor: 'rgba(7, 3, 26, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.15)',
  },
  speechTrainerStudioFade: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 24,
  },
  speechTrainerStudioBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  speechTrainerStudioTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 4,
  },
  speechTrainerStudioIndicatorSlot: {
    width: 32,
    height: 2,
    marginBottom: 6,
    right: 1,
  },
  speechTrainerStudioActiveLine: {
    width: 32,
    height: 2,
    borderRadius: 999,
  },
  speechTrainerStudioIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
    marginBottom: 4,
  },
  speechTrainerStudioIconActive: {
    tintColor: colors.tabActive,
  },
  speechTrainerStudioLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: 0.19,
    color: colors.textSecondary,
  },
  speechTrainerStudioLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.tabActive,
  },
});
