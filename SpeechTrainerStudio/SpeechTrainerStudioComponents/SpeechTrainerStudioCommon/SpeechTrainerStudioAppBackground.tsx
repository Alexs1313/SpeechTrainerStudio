import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

export function AppBackground({children}: PropsWithChildren) {
  return (
    <View style={styles.AppBackgroundContainer}>
      <LinearGradient
        colors={['rgba(109, 40, 217, 0.12)', 'rgba(0, 0, 0, 0)']}
        style={styles.AppBackgroundGlow}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  AppBackgroundContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  AppBackgroundGlow: {
    ...StyleSheet.absoluteFillObject,
  },
});
