import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

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
    <View style={styles.SegmentedControlRow}>
      {options.map(option => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[styles.SegmentedControlOption, active && styles.SegmentedControlOptionActive]}>
            <Text style={[styles.SegmentedControlLabel, active && styles.SegmentedControlLabelActive]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  SegmentedControlRow: {
    flexDirection: 'row',
    gap: 4,
  },
  SegmentedControlOption: {
    flex: 1,
    height: 38,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  SegmentedControlOptionActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  SegmentedControlLabel: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  SegmentedControlLabelActive: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.white,
  },
});
