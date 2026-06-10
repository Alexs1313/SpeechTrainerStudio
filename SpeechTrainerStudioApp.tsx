import React, {useCallback, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SpeechTrainerStudioTabs} from './SpeechTrainerStudioTabs';
import {SpeechTrainerStudioLoaderScreen} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioLoader/SpeechTrainerStudioLoaderScreen/SpeechTrainerStudioLoaderScreen';
import {SpeechTrainerStudioOnboardingScreen} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioOnboarding/SpeechTrainerStudioOnboardingScreen/SpeechTrainerStudioOnboardingScreen';

type AppPhase = 'loading' | 'onboarding' | 'main';

export function SpeechTrainerStudioApp() {
  const [phase, setPhase] = useState<AppPhase>('loading');

  const finishLoading = useCallback(() => {
    setPhase('onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('main');
  }, []);

  if (phase === 'loading') {
    return <SpeechTrainerStudioLoaderScreen onComplete={finishLoading} />;
  }

  if (phase === 'onboarding') {
    return (
      <SpeechTrainerStudioOnboardingScreen onComplete={finishOnboarding} />
    );
  }

  return (
    <NavigationContainer>
      <SpeechTrainerStudioTabs />
    </NavigationContainer>
  );
}
