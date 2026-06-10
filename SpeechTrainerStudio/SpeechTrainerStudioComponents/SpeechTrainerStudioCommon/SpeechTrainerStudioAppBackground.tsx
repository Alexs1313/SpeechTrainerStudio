import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';

export function AppBackground({children}: PropsWithChildren) {
  return (
    <View style={styles.speechTrainerStudioContainer}>
      <LinearGradient
        colors={['rgba(109, 40, 217, 0.12)', 'rgba(0, 0, 0, 0)']}
        style={styles.speechTrainerStudioGlow}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  speechTrainerStudioGlow: {
    ...StyleSheet.absoluteFillObject,
  },
});
