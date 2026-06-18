import React from 'react';
import {StyleSheet, View} from 'react-native';

import {ONBOARDING_STEPS} from '../../constants/onboardingSteps';
import {colors} from '../../constants/theme';

type Props = {
  activeIndex: number;
};

export function OnboardingPagination({activeIndex}: Props) {
  const activeColor = ONBOARDING_STEPS[activeIndex].dotColor;

  return (
    <View style={styles.OnboardingPaginationContainer}>
      {ONBOARDING_STEPS.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.OnboardingPaginationDot,
              isActive ? styles.OnboardingPaginationDotActive : styles.OnboardingPaginationDotInactive,
              isActive && {backgroundColor: activeColor},
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingPaginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 8,
  },
  OnboardingPaginationDot: {
    borderRadius: 999,
    height: 8,
  },
  OnboardingPaginationDotActive: {
    width: 24,
  },
  OnboardingPaginationDotInactive: {
    width: 8,
    backgroundColor: colors.dotInactive,
    opacity: 0.4,
  },
});
