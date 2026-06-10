import React from 'react';
import {StyleSheet, View} from 'react-native';

import {ONBOARDING_STEPS} from '../../SpeechTrainerStudioConstants/SpeechTrainerStudioOnboardingSteps';
import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';

type Props = {
  activeIndex: number;
};

export function OnboardingPagination({activeIndex}: Props) {
  const activeColor = ONBOARDING_STEPS[activeIndex].dotColor;

  return (
    <View style={styles.speechTrainerStudioContainer}>
      {ONBOARDING_STEPS.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.speechTrainerStudioDot,
              isActive ? styles.speechTrainerStudioDotActive : styles.speechTrainerStudioDotInactive,
              isActive && {backgroundColor: activeColor},
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 8,
  },
  speechTrainerStudioDot: {
    borderRadius: 999,
    height: 8,
  },
  speechTrainerStudioDotActive: {
    width: 24,
  },
  speechTrainerStudioDotInactive: {
    width: 8,
    backgroundColor: colors.dotInactive,
    opacity: 0.4,
  },
});
