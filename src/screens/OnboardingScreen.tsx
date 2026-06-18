import React, {useCallback, useState} from 'react';
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

import {OnboardingPagination} from '../components/nav/OnboardingPagination';
import {ONBOARDING_STEPS} from '../constants/onboardingSteps';
import {colors, fonts, speechTrainerStudioShadow} from '../constants/theme';

type Props = {
  onComplete: () => void;
};

export function OnboardingScreen({onComplete}: Props) {
  const insets = useSafeAreaInsets();
  const [stepIndexCurrent, setStepIndexCurrent] = useState(0);

  const step = ONBOARDING_STEPS[stepIndexCurrent];
  const isLastStep = stepIndexCurrent === ONBOARDING_STEPS.length - 1;
  const showSkip = step.showSkip !== false;

  const goNext = useCallback(() => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setStepIndexCurrent(prev => prev + 1);
  }, [isLastStep, onComplete]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <View style={styles.SpeechTrainerStudioOnboardingScreenContainer}>
      <LinearGradient
        colors={step.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={[
          styles.SpeechTrainerStudioOnboardingScreenScrollContent,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        {showSkip && (
          <Pressable
            onPress={handleSkip}
            style={styles.SpeechTrainerStudioOnboardingScreenSkipButton}
            hitSlop={12}>
            <Text style={styles.SpeechTrainerStudioOnboardingScreenSkipText}>
              Skip
            </Text>
          </Pressable>
        )}

        {!showSkip && (
          <View
            style={styles.SpeechTrainerStudioOnboardingScreenSkipPlaceholder}
          />
        )}

        <View style={styles.SpeechTrainerStudioOnboardingScreenImageFrame}>
          <View style={styles.SpeechTrainerStudioOnboardingScreenImageInner}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.133)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.SpeechTrainerStudioOnboardingScreenImageGradient}>
              <Image
                source={step.image}
                style={styles.SpeechTrainerStudioOnboardingScreenImage}
              />
            </LinearGradient>
          </View>
        </View>

        <View style={styles.SpeechTrainerStudioOnboardingScreenTextBlock}>
          <Text
            style={[
              styles.SpeechTrainerStudioOnboardingScreenLabel,
              {color: step.labelColor},
            ]}>
            {step.label.toUpperCase()}
          </Text>
          <Text style={styles.SpeechTrainerStudioOnboardingScreenTitle}>
            {step.title}
          </Text>
          <Text style={styles.SpeechTrainerStudioOnboardingScreenBody}>
            {step.body}
          </Text>
        </View>

        <View style={styles.SpeechTrainerStudioOnboardingScreenFooter}>
          <OnboardingPagination activeIndex={stepIndexCurrent} />

          <Pressable
            onPress={goNext}
            style={styles.SpeechTrainerStudioOnboardingScreenButtonWrapper}>
            <LinearGradient
              colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.SpeechTrainerStudioOnboardingScreenButton}>
              <Text
                style={styles.SpeechTrainerStudioOnboardingScreenButtonText}>
                {step.buttonText ?? 'Continue'}
                {!step.buttonText && '  ›'}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SpeechTrainerStudioOnboardingScreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  SpeechTrainerStudioOnboardingScreenScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  SpeechTrainerStudioOnboardingScreenSkipButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  SpeechTrainerStudioOnboardingScreenSkipPlaceholder: {
    height: 21,
    marginBottom: 32,
  },
  SpeechTrainerStudioOnboardingScreenSkipText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  SpeechTrainerStudioOnboardingScreenImageFrame: {
    alignSelf: 'center',
    width: 288,
    height: 288,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.imageBorder,
    overflow: 'hidden',
    marginBottom: 40,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.19,
      shadowRadius: 50,
      elevation: 8,
    }),
  },
  SpeechTrainerStudioOnboardingScreenImageInner: {
    flex: 1,
  },
  SpeechTrainerStudioOnboardingScreenImageGradient: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  SpeechTrainerStudioOnboardingScreenImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  SpeechTrainerStudioOnboardingScreenTextBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  SpeechTrainerStudioOnboardingScreenLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    letterSpacing: 1.44,
    textAlign: 'center',
    marginBottom: 12,
  },
  SpeechTrainerStudioOnboardingScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 26,
    lineHeight: 33,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  SpeechTrainerStudioOnboardingScreenBody: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  SpeechTrainerStudioOnboardingScreenFooter: {
    marginTop: 'auto',
    gap: 32,
  },
  SpeechTrainerStudioOnboardingScreenButtonWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  SpeechTrainerStudioOnboardingScreenButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SpeechTrainerStudioOnboardingScreenButtonText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: colors.white,
  },
});
