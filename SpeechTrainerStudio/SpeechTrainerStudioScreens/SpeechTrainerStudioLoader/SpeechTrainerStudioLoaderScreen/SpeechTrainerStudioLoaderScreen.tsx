import React, {useEffect} from 'react';
import {Image, ImageBackground, StatusBar, StyleSheet, View} from 'react-native';

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
    <View style={styles.speechTrainerStudioContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#07031a" />
      <ImageBackground
        source={require('../../../SpeechTrainerStudioAssets/images/loaderbg.png')}
        style={styles.speechTrainerStudioBackground}
        resizeMode="cover">
        <View style={styles.speechTrainerStudioLogoContainer}>
          <Image
            source={require('../../../SpeechTrainerStudioAssets/images/loaderlogo.png')}
            style={styles.speechTrainerStudioLogo}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContainer: {
    flex: 1,
    backgroundColor: '#07031a',
  },
  speechTrainerStudioBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  speechTrainerStudioLogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioLogo: {
    width: 180,
    height: 180,
  },
});
