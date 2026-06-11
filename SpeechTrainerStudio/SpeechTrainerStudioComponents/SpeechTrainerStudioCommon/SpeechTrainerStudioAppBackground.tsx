import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';

export function AppBackground({children}: PropsWithChildren) {
  return (
    <View style={styles.speechTrainerStudioContainer}>
      <LinearGradient
        colors={['rgb(51, 5, 83)', 'rgba(37, 2, 47, 0.98)']}
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
