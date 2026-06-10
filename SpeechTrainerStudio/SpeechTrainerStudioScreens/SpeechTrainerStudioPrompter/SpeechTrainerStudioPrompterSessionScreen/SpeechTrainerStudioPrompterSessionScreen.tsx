import React, {useCallback, useEffect, useRef, useState} from 'react';
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

import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {SessionConfig, SessionResult} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {formatTimer} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioFormatDuration/SpeechTrainerStudioFormatDuration';
import {
  SCROLL_SPEED_PX,
  TEXT_LINE_HEIGHT,
  TEXT_SIZE_PX,
} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompterSettings/SpeechTrainerStudioPrompterSettings';

type Props = {
  config: SessionConfig;
  onClose: () => void;
  onComplete: (result: SessionResult) => void;
};

const TICK_MS = 50;

export function PrompterSessionScreen({config, onClose, onComplete}: Props) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [playing, setPlaying] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const scrollYRef = useRef(0);

  const maxScroll = Math.max(contentHeight - viewportHeight, 1);
  const progress = Math.min(Math.round((scrollY / maxScroll) * 100), 100);
  const fontSize = TEXT_SIZE_PX[config.size];
  const lineHeight = TEXT_LINE_HEIGHT[config.size];
  const scrollSpeed = SCROLL_SPEED_PX[config.speed];

  const finishSession = useCallback(() => {
    const durationMs = Math.max(elapsedMs, 1000);
    const wordsPerMinute = Math.round(
      (config.text.wordCount / durationMs) * 60000,
    );
    onComplete({
      text: config.text,
      durationMs,
      wordCount: config.text.wordCount,
      wordsPerMinute,
    });
  }, [config.text, elapsedMs, onComplete]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedMs(prev => prev + TICK_MS);

      const nextY = scrollYRef.current + (scrollSpeed * TICK_MS) / 1000;
      if (nextY >= maxScroll) {
        scrollYRef.current = maxScroll;
        setScrollY(maxScroll);
        scrollRef.current?.scrollTo({y: maxScroll, animated: false});
        clearInterval(interval);
        setPlaying(false);
        setTimeout(finishSession, 400);
        return;
      }

      scrollYRef.current = nextY;
      setScrollY(nextY);
      scrollRef.current?.scrollTo({y: nextY, animated: false});
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [playing, scrollSpeed, maxScroll, finishSession]);

  const handleReset = () => {
    scrollYRef.current = 0;
    setScrollY(0);
    setElapsedMs(0);
    scrollRef.current?.scrollTo({y: 0, animated: false});
    setPlaying(true);
  };

  return (
    <View style={styles.speechTrainerStudioContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.sessionBackground} />

      <View style={styles.speechTrainerStudioProgressTrack}>
        <LinearGradient
          colors={[colors.buttonGradientStart, colors.tabActive]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.speechTrainerStudioProgressFill, {width: `${progress}%`}]}
        />
      </View>

      <View style={[styles.speechTrainerStudioTopBar, {paddingTop: insets.top + 8}]}>
        <View style={styles.speechTrainerStudioTimerRow}>
          <Text style={styles.speechTrainerStudioMetaIcon}>🕐</Text>
          <Text style={styles.speechTrainerStudioMetaText}>{formatTimer(elapsedMs)}</Text>
        </View>
        <Text style={styles.speechTrainerStudioMetaText}>{progress}%</Text>
      </View>

      <View
        style={styles.speechTrainerStudioTextViewport}
        onLayout={event => setViewportHeight(event.nativeEvent.layout.height)}>
        <ScrollView
          ref={scrollRef}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.speechTrainerStudioScrollContent}
          onContentSizeChange={(_, height) => setContentHeight(height)}>
          <View style={styles.speechTrainerStudioTopFade} />
          <Text
            style={[
              styles.speechTrainerStudioPrompterText,
              {fontSize, lineHeight},
            ]}>
            {config.text.body}
          </Text>
          <View style={styles.speechTrainerStudioBottomSpacer} />
        </ScrollView>
        <LinearGradient
          colors={['transparent', colors.sessionBackground]}
          style={styles.speechTrainerStudioBottomFade}
          pointerEvents="none"
        />
      </View>

      <View style={[styles.speechTrainerStudioControls, {paddingBottom: insets.bottom + 90}]}>
        <Pressable onPress={onClose} style={styles.speechTrainerStudioCloseButton}>
          <Text style={styles.speechTrainerStudioCloseIcon}>✕</Text>
        </Pressable>

        <Pressable
          onPress={() => setPlaying(prev => !prev)}
          style={styles.speechTrainerStudioPlayWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            style={styles.speechTrainerStudioPlayButton}>
            <Image
              source={
                playing
                  ? require('../../../SpeechTrainerStudioAssets/images/pause.png')
                  : require('../../../SpeechTrainerStudioAssets/images/start.png')
              }
              style={styles.speechTrainerStudioPlayIcon}
              resizeMode="contain"
            />
          </LinearGradient>
        </Pressable>

        <Pressable onPress={handleReset} style={styles.speechTrainerStudioResetButton}>
          <Text style={styles.speechTrainerStudioResetIcon}>↺</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContainer: {
    flex: 1,
    backgroundColor: colors.sessionBackground,
  },
  speechTrainerStudioProgressTrack: {
    height: 4,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  speechTrainerStudioProgressFill: {
    height: 4,
    borderRadius: 999,
  },
  speechTrainerStudioTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  speechTrainerStudioTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speechTrainerStudioMetaIcon: {
    fontSize: 14,
  },
  speechTrainerStudioMetaText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  speechTrainerStudioTextViewport: {
    flex: 1,
    overflow: 'hidden',
  },
  speechTrainerStudioScrollContent: {
    paddingHorizontal: 32,
    paddingTop: 120,
  },
  speechTrainerStudioTopFade: {
    height: 0,
  },
  speechTrainerStudioPrompterText: {
    fontFamily: fonts.dmSansRegular,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  speechTrainerStudioBottomSpacer: {
    height: 240,
  },
  speechTrainerStudioBottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 96,
  },
  speechTrainerStudioControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.1)',
    backgroundColor: 'rgba(5, 2, 18, 0.95)',
  },
  speechTrainerStudioCloseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioCloseIcon: {
    color: colors.white,
    fontSize: 16,
  },
  speechTrainerStudioPlayWrapper: {
    shadowColor: '#8b5cf6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  speechTrainerStudioPlayButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioPlayIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  speechTrainerStudioResetButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioResetIcon: {
    color: colors.textPrimary,
    fontSize: 20,
  },
});
