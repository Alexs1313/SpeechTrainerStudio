import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {OnboardingPagination} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioOnboarding/SpeechTrainerStudioOnboardingPagination';
import {ONBOARDING_STEPS} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioOnboardingSteps';
import {speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioShadow/SpeechTrainerStudioShadow';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';

type Props = {
  onComplete: () => void;
};

export function SpeechTrainerStudioOnboardingScreen({onComplete}: Props) {
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);

  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;
  const showSkip = step.showSkip !== false;

  const goNext = useCallback(() => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setStepIndex(prev => prev + 1);
  }, [isLastStep, onComplete]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <View style={styles.speechTrainerStudioContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <LinearGradient
        colors={step.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={[
          styles.speechTrainerStudioScrollContent,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        {showSkip && (
          <Pressable
            onPress={handleSkip}
            style={styles.speechTrainerStudioSkipButton}
            hitSlop={12}>
            <Text style={styles.speechTrainerStudioSkipText}>Skip</Text>
          </Pressable>
        )}

        {!showSkip && <View style={styles.speechTrainerStudioSkipPlaceholder} />}

        <View style={styles.speechTrainerStudioImageFrame}>
          <View style={styles.speechTrainerStudioImageInner}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.133)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.speechTrainerStudioImageGradient}>
              <Image source={step.image} style={styles.speechTrainerStudioImage} />
            </LinearGradient>
          </View>
        </View>

        <View style={styles.speechTrainerStudioTextBlock}>
          <Text style={[styles.speechTrainerStudioLabel, {color: step.labelColor}]}>
            {step.label.toUpperCase()}
          </Text>
          <Text style={styles.speechTrainerStudioTitle}>{step.title}</Text>
          <Text style={styles.speechTrainerStudioBody}>{step.body}</Text>
        </View>

        <View style={styles.speechTrainerStudioFooter}>
          <OnboardingPagination activeIndex={stepIndex} />

          <Pressable onPress={goNext} style={styles.speechTrainerStudioButtonWrapper}>
            <LinearGradient
              colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.speechTrainerStudioButton}>
              <Text style={styles.speechTrainerStudioButtonText}>
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
  speechTrainerStudioContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  speechTrainerStudioScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  speechTrainerStudioSkipButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  speechTrainerStudioSkipPlaceholder: {
    height: 21,
    marginBottom: 32,
  },
  speechTrainerStudioSkipText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  speechTrainerStudioImageFrame: {
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
  speechTrainerStudioImageInner: {
    flex: 1,
  },
  speechTrainerStudioImageGradient: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  speechTrainerStudioImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  speechTrainerStudioTextBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  speechTrainerStudioLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    letterSpacing: 1.44,
    textAlign: 'center',
    marginBottom: 12,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 26,
    lineHeight: 33,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  speechTrainerStudioBody: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  speechTrainerStudioFooter: {
    marginTop: 'auto',
    gap: 32,
  },
  speechTrainerStudioButtonWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  speechTrainerStudioButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioButtonText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: colors.white,
  },
});
