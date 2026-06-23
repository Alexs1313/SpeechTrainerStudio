import React, {useEffect} from 'react';
import {Image, ImageBackground, Platform, StyleSheet, View} from 'react-native';

import {icons} from '../data/assets';
import {useAdaptive} from '../hooks/useAdaptive';

type Props = {
  onComplete: () => void;
};

export function LoaderScreen({onComplete}: Props) {
  const adaptive = useAdaptive();

  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.LoaderScreenFacetChassis}>
      <ImageBackground
        source={icons.loaderBg}
        style={styles.LoaderScreenBackground}
        resizeMode="cover">
        <View style={styles.LoaderScreenLogoContainer}>
          <Image
            source={Platform.OS === 'ios' ? icons.loaderLogo : icons.loaderIcon}
            style={{
              width: adaptive.loaderLogoSize,
              height: adaptive.loaderLogoSize,
              borderRadius: adaptive.scale(50),
            }}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  LoaderScreenFacetChassis: {
    flex: 1,
    backgroundColor: '#07031a',
  },
  LoaderScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  LoaderScreenLogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
