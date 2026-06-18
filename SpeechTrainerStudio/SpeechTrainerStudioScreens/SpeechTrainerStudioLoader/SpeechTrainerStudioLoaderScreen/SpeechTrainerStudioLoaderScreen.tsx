import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {icons} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioAssets';

const LOADER_DURATION_MS = 5000;

type Props = {
  onComplete: () => void;
};

export function SpeechTrainerStudioLoaderScreen({onComplete}: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.SpeechTrainerStudioLoaderScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#07031a" />
      <ImageBackground
        source={icons.loaderBg}
        style={styles.SpeechTrainerStudioLoaderScreenBackground}
        resizeMode="cover">
        <View style={styles.SpeechTrainerStudioLoaderScreenLogoContainer}>
          <Image
            source={
              Platform.OS === 'ios' ? icons.loaderLogo : icons.loaderIcon
            }
            style={[
              styles.SpeechTrainerStudioLoaderScreenLogo,
              Platform.OS === 'android' && {
                width: 200,
                height: 200,
                borderRadius: 50,
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  SpeechTrainerStudioLoaderScreenContainer: {
    flex: 1,
    backgroundColor: '#07031a',
  },
  SpeechTrainerStudioLoaderScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  SpeechTrainerStudioLoaderScreenLogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SpeechTrainerStudioLoaderScreenLogo: {},
});
