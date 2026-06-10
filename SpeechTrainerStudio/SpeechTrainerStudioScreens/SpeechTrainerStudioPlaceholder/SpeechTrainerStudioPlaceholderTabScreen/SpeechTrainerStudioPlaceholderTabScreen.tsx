import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';

type Props = {
  title: string;
};

export function PlaceholderTabScreen({title}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <AppBackground>
      <View style={[styles.speechTrainerStudioContainer, {paddingTop: insets.top + 24}]}>
        <Text style={styles.speechTrainerStudioTitle}>{title}</Text>
        <Text style={styles.speechTrainerStudioSubtitle}>Coming soon</Text>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  speechTrainerStudioSubtitle: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    color: colors.textSecondary,
  },
});
