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

import {AppBackground} from '../components/common/AppBackground';
import {GAME_DURATION_SEC} from '../constants/gameTopics';

import {countWords} from '../utils/wordCount';
import {colors, fonts, speechTrainerStudioShadow} from '../constants/theme';

type Props = {
  topic: string;
  onSubmit: (response: string, durationMs: number) => void;
};

export function GameChallengeScreen({topic, onSubmit}: Props) {
  const insets = useSafeAreaInsets();
  const [responseText, setResponseText] = useState('');
  const [secondsLeftQuantity, setSecondsLeftQuantity] =
    useState(GAME_DURATION_SEC);
  const startTimeRef = useRef(Date.now());

  const submittedRef = useRef(false);

  const wordCount = countWords(responseText);
  const hasContent = wordCount > 0;
  const progress = 1 - secondsLeftQuantity / GAME_DURATION_SEC;

  const responseRef = useRef(responseText);
  responseRef.current = responseText;

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
      setSecondsLeftQuantity(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsLeftQuantity === 0) {
      handleSubmit();
    }
  }, [secondsLeftQuantity, handleSubmit]);

  return (
    <AppBackground>
      <KeyboardAvoidingView
        style={styles.GameChallengeScreenFlex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.GameChallengeScreenProgressTrack}>
          <View
            style={[
              styles.GameChallengeScreenProgressFill,
              {width: `${progress * 100}%`},
            ]}
          />
        </View>

        <ScrollView
          style={styles.GameChallengeScreenFlex}
          contentContainerStyle={[
            styles.GameChallengeScreenContent,
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 100,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.GameChallengeScreenStatsRow}>
            <View style={styles.GameChallengeScreenTimerRow}>
              <Text style={styles.GameChallengeScreenTimerIcon}>⏱</Text>
              <Text style={styles.GameChallengeScreenTimerText}>
                {secondsLeftQuantity}s
              </Text>
            </View>
            <Text style={styles.GameChallengeScreenWordCount}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Text>
          </View>

          <View style={styles.GameChallengeScreenTopicCard}>
            <LinearGradient
              colors={['rgba(109, 40, 217, 0.3)', 'rgba(139, 92, 246, 0.15)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.GameChallengeScreenTopicGradient}>
              <View style={styles.GameChallengeScreenTopicInner}>
                <Text style={styles.GameChallengeScreenTopicLabel}>
                  Your Topic
                </Text>
                <Text style={styles.GameChallengeScreenTopicText}>{topic}</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.GameChallengeScreenInputWrapper}>
            <TextInput
              value={responseText}
              onChangeText={setResponseText}
              placeholder="Start writing your speech here... Don't overthink it. Just write what comes to you."
              placeholderTextColor={colors.textSecondary}
              style={styles.GameChallengeScreenInput}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          <Pressable
            onPress={handleSubmit}
            style={styles.GameChallengeScreenSubmitWrapper}>
            <LinearGradient
              colors={
                hasContent
                  ? [colors.successDark, colors.success]
                  : [colors.buttonGradientStart, colors.buttonGradientEnd]
              }
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.GameChallengeScreenSubmitButton}>
              <Text style={styles.GameChallengeScreenSubmitText}>
                Submit Response
              </Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  GameChallengeScreenFlex: {flex: 1},
  GameChallengeScreenProgressTrack: {
    height: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  GameChallengeScreenProgressFill: {
    height: 6,
    backgroundColor: '#8b5cf6',
    borderRadius: 999,
  },

  GameChallengeScreenContent: {paddingHorizontal: 20},
  GameChallengeScreenStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  GameChallengeScreenTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  GameChallengeScreenTimerIcon: {fontSize: 16},
  GameChallengeScreenTimerText: {
    fontFamily: fonts.outfitExtraBold,
    fontSize: 22,
    lineHeight: 33,
    color: '#8b5cf6',
  },
  GameChallengeScreenWordCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  GameChallengeScreenTopicCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  GameChallengeScreenTopicGradient: {borderRadius: 16},
  GameChallengeScreenTopicInner: {padding: 16},
  GameChallengeScreenTopicLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    letterSpacing: 1.1,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  GameChallengeScreenTopicText: {
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  GameChallengeScreenInputWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.06)',
    minHeight: 320,
    marginBottom: 16,
  },
  GameChallengeScreenInput: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 26,
    color: colors.textPrimary,
    padding: 16,
    minHeight: 320,
  },

  GameChallengeScreenSubmitWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 8,
    }),
  },
  GameChallengeScreenSubmitButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  GameChallengeScreenSubmitText: {
    fontFamily: fonts.dmSansBold,
    fontSize: 16,
    color: colors.white,
  },
});
