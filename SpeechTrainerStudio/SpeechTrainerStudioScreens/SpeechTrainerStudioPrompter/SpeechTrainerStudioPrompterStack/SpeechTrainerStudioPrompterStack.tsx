import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  PrompterCategoryId,
  PrompterScreen,
  PrompterText,
  SessionConfig,
  SessionResult,
} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {getUnlockedShopTextsFromStorage} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioShop/SpeechTrainerStudioShopStorage/SpeechTrainerStudioShopStorage';
import {PrompterChooseScreen} from '../SpeechTrainerStudioPrompterChooseScreen/SpeechTrainerStudioPrompterChooseScreen';
import {PrompterConfigureScreen} from '../SpeechTrainerStudioPrompterConfigureScreen/SpeechTrainerStudioPrompterConfigureScreen';
import {PrompterResultsScreen} from '../SpeechTrainerStudioPrompterResultsScreen/SpeechTrainerStudioPrompterResultsScreen';
import {PrompterSessionScreen} from '../SpeechTrainerStudioPrompterSessionScreen/SpeechTrainerStudioPrompterSessionScreen';

export function PrompterStack() {
  const [screen, setScreen] = useState<PrompterScreen>('choose');
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<PrompterCategoryId>('public-speaking');
  const [selectedText, setSelectedText] = useState<PrompterText | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(
    null,
  );
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(
    null,
  );
  const [premiumTexts, setPremiumTexts] = useState<PrompterText[]>([]);

  const refreshPremiumTexts = useCallback(async () => {
    const texts = await getUnlockedShopTextsFromStorage();
    setPremiumTexts(texts);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshPremiumTexts();
    }, [refreshPremiumTexts]),
  );

  const handleSelectText = useCallback((text: PrompterText) => {
    setSelectedText(text);
    setScreen('configure');
  }, []);

  const handleBegin = useCallback((config: SessionConfig) => {
    setSessionConfig(config);
    setScreen('session');
  }, []);

  const handleComplete = useCallback((result: SessionResult) => {
    setSessionResult(result);
    setScreen('results');
  }, []);

  const resetToChoose = useCallback(() => {
    setScreen('choose');
    setSelectedText(null);
    setSessionConfig(null);
    setSessionResult(null);
  }, []);

  if (screen === 'session' && sessionConfig) {
    return (
      <PrompterSessionScreen
        config={sessionConfig}
        onClose={resetToChoose}
        onComplete={handleComplete}
      />
    );
  }

  if (screen === 'results' && sessionResult) {
    return (
      <PrompterResultsScreen
        result={sessionResult}
        onBack={resetToChoose}
        onPracticeAgain={() => {
          if (sessionConfig) {
            setScreen('session');
          }
        }}
        onChooseDifferent={resetToChoose}
      />
    );
  }

  if (screen === 'configure' && selectedText) {
    return (
      <PrompterConfigureScreen
        text={selectedText}
        onBack={() => setScreen('choose')}
        onBegin={handleBegin}
      />
    );
  }

  return (
    <PrompterChooseScreen
      selectedCategoryId={selectedCategoryId}
      premiumTexts={premiumTexts}
      onSelectCategory={setSelectedCategoryId}
      onSelectText={handleSelectText}
    />
  );
}
