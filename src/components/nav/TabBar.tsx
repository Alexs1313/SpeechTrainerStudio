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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors, fonts} from '../../constants/theme';
import {tabIcons} from '../../data/assets';
import type {MainTab} from '../../navigation/types';

type Props = {
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
};

type TabItem = {
  routeName: MainTab;
  label: string;
  icon: ImageSourcePropType;
};

const TABS: TabItem[] = [
  {routeName: 'Prompter', label: 'Prompter', icon: tabIcons.prompter},
  {routeName: 'Workshop', label: 'Workshop', icon: tabIcons.workshop},
  {routeName: 'Blog', label: 'Blog', icon: tabIcons.blog},
  {routeName: 'Tips', label: 'Tips', icon: tabIcons.tips},
  {routeName: 'Game', label: 'Game', icon: tabIcons.game},
  {routeName: 'Shop', label: 'Shop', icon: tabIcons.shop},
];

export function TabBar({activeTab, onSelectTab}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.TabBarWrapper,
        {paddingBottom: insets.bottom},
      ]}>
      <LinearGradient
        colors={['rgba(7, 3, 26, 0)', 'rgba(7, 3, 26, 0.98)']}
        style={styles.TabBarFade}
        pointerEvents="none"
      />
      <View style={styles.TabBarBar}>
        {TABS.map(tab => {
          const active = activeTab === tab.routeName;
          return (
            <Pressable
              key={tab.routeName}
              onPress={() => onSelectTab(tab.routeName)}
              style={styles.TabBarTab}>
              <View style={styles.TabBarIndicatorSlot}>
                {active && (
                  <LinearGradient
                    colors={[colors.buttonGradientStart, colors.tabActive]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.TabBarActiveLine}
                  />
                )}
              </View>
              <Image
                source={tab.icon}
                style={[
                  styles.TabBarIcon,
                  active && styles.TabBarIconActive,
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.TabBarLabel,
                  active && styles.TabBarLabelActive,
                ]}>
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
  TabBarWrapper: {
    backgroundColor: 'rgba(7, 3, 26, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.15)',
  },
  TabBarFade: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 24,
  },
  TabBarBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  TabBarTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 4,
  },
  TabBarIndicatorSlot: {
    width: 32,
    height: 2,
    marginBottom: 6,
    right: 1,
  },
  TabBarActiveLine: {
    width: 32,
    height: 2,
    borderRadius: 999,
  },
  TabBarIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
    marginBottom: 4,
  },
  TabBarIconActive: {
    tintColor: colors.tabActive,
  },
  TabBarLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: 0.19,
    color: colors.textSecondary,
  },
  TabBarLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.tabActive,
  },
});
