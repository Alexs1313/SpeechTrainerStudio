import React, {useEffect} from 'react';
import {Image, ImageBackground, Platform, StyleSheet, View} from 'react-native';

import {icons} from '../data/assets';

type Props = {
  onComplete: () => void;
};

export function LoaderScreen({onComplete}: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.SpeechTrainerStudioLoaderScreenContainer}>
      <ImageBackground
        source={icons.loaderBg}
        style={styles.SpeechTrainerStudioLoaderScreenBackground}
        resizeMode="cover">
        <View style={styles.SpeechTrainerStudioLoaderScreenLogoContainer}>
          <Image
            source={Platform.OS === 'ios' ? icons.loaderLogo : icons.loaderIcon}
            style={{width: 200, height: 200, borderRadius: 50}}
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
