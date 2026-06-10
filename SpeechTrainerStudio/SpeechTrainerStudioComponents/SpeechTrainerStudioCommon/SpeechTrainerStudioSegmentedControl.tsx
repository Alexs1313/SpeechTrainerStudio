import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';

type Props<T extends string> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.speechTrainerStudioRow}>
      {options.map(option => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[styles.speechTrainerStudioOption, active && styles.speechTrainerStudioOptionActive]}>
            <Text style={[styles.speechTrainerStudioLabel, active && styles.speechTrainerStudioLabelActive]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioRow: {
    flexDirection: 'row',
    gap: 4,
  },
  speechTrainerStudioOption: {
    flex: 1,
    height: 38,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  speechTrainerStudioOptionActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  speechTrainerStudioLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  speechTrainerStudioLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.white,
  },
});
