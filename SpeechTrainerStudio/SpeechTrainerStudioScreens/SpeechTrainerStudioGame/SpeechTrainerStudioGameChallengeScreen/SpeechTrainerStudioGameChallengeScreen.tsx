import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {GAME_DURATION_SEC} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioGameTopics';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioShadow/SpeechTrainerStudioShadow';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {countWords} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

type Props = {
  topic: string;
  onSubmit: (response: string, durationMs: number) => void;
};

export function GameChallengeScreen({topic, onSubmit}: Props) {
  const insets = useSafeAreaInsets();
  const [response, setResponse] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(GAME_DURATION_SEC);
  const startTimeRef = useRef(Date.now());
  const submittedRef = useRef(false);

  const wordCount = countWords(response);
  const hasContent = wordCount > 0;
  const progress = 1 - secondsLeft / GAME_DURATION_SEC;

  const responseRef = useRef(response);
  responseRef.current = response;

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) {
      return;
    }
    submittedRef.current = true;
    const durationMs = Date.now() - startTimeRef.current;
    onSubmit(responseRef.current.trim(), durationMs);
  }, [onSubmit]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleSubmit]);

  return (
    <AppBackground>
      <KeyboardAvoidingView
        style={styles.speechTrainerStudioFlex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.speechTrainerStudioProgressTrack}>
          <View style={[styles.speechTrainerStudioProgressFill, {width: `${progress * 100}%`}]} />
        </View>

        <ScrollView
          style={styles.speechTrainerStudioFlex}
          contentContainerStyle={[
            styles.speechTrainerStudioContent,
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 100,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.speechTrainerStudioStatsRow}>
            <View style={styles.speechTrainerStudioTimerRow}>
              <Text style={styles.speechTrainerStudioTimerIcon}>⏱</Text>
              <Text style={styles.speechTrainerStudioTimerText}>{secondsLeft}s</Text>
            </View>
            <Text style={styles.speechTrainerStudioWordCount}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Text>
          </View>

          <View style={styles.speechTrainerStudioTopicCard}>
            <LinearGradient
              colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.15)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.speechTrainerStudioTopicGradient}>
              <View style={styles.speechTrainerStudioTopicInner}>
                <Text style={styles.speechTrainerStudioTopicLabel}>Your Topic</Text>
                <Text style={styles.speechTrainerStudioTopicText}>{topic}</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.speechTrainerStudioInputWrapper}>
            <TextInput
              value={response}
              onChangeText={setResponse}
              placeholder="Start writing your speech here... Don't overthink it. Just write what comes to you."
              placeholderTextColor={colors.textSecondary}
              style={styles.speechTrainerStudioInput}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          <Pressable onPress={handleSubmit} style={styles.speechTrainerStudioSubmitWrapper}>
            <LinearGradient
              colors={
                hasContent
                  ? [colors.successDark, colors.success]
                  : [colors.buttonGradientStart, colors.buttonGradientEnd]
              }
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.speechTrainerStudioSubmitButton}>
              <Text style={styles.speechTrainerStudioSubmitText}>Submit Response</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioFlex: {flex: 1},
  speechTrainerStudioProgressTrack: {
    height: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  speechTrainerStudioProgressFill: {
    height: 6,
    backgroundColor: '#8b5cf6',
    borderRadius: 999,
  },
  speechTrainerStudioContent: {paddingHorizontal: 20},
  speechTrainerStudioStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  speechTrainerStudioTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speechTrainerStudioTimerIcon: {fontSize: 16},
  speechTrainerStudioTimerText: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 22,
    lineHeight: 33,
    color: '#8b5cf6',
  },
  speechTrainerStudioWordCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  speechTrainerStudioTopicCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  speechTrainerStudioTopicGradient: {borderRadius: 16},
  speechTrainerStudioTopicInner: {padding: 16},
  speechTrainerStudioTopicLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 1.1,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  speechTrainerStudioTopicText: {
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  speechTrainerStudioInputWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.06)',
    minHeight: 320,
    marginBottom: 16,
  },
  speechTrainerStudioInput: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 26,
    color: colors.textPrimary,
    padding: 16,
    minHeight: 320,
  },
  speechTrainerStudioSubmitWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 8,
    }),
  },
  speechTrainerStudioSubmitButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioSubmitText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 16,
    color: colors.white,
  },
});
