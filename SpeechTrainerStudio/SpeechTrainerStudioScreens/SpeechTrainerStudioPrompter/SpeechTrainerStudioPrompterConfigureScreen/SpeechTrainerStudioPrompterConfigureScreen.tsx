import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {SegmentedControl} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioSegmentedControl';
import {getCategoryById} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioPrompterTexts';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioShadow/SpeechTrainerStudioShadow';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {
  PrompterText,
  SessionConfig,
  TextSize,
  TextSpeed,
} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';

type Props = {
  text: PrompterText;
  onBack: () => void;
  onBegin: (config: SessionConfig) => void;
};

export function PrompterConfigureScreen({text, onBack, onBegin}: Props) {
  const insets = useSafeAreaInsets();
  const category = getCategoryById(text.categoryId);
  const [speed, setSpeed] = useState<TextSpeed>('medium');
  const [size, setSize] = useState<TextSize>('medium');

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.speechTrainerStudioHeader}>
          <Pressable onPress={onBack} style={styles.speechTrainerStudioBackButton}>
            <Text style={styles.speechTrainerStudioBackIcon}>‹</Text>
          </Pressable>
          <View>
            <Text style={styles.speechTrainerStudioEyebrow}>Configure</Text>
            <Text style={styles.speechTrainerStudioTitle}>{text.title}</Text>
          </View>
        </View>

        <View style={styles.speechTrainerStudioSummaryCard}>
          <View style={styles.speechTrainerStudioSummaryMeta}>
            <Text style={styles.speechTrainerStudioSummaryEmoji}>{category.emoji}</Text>
            <Text style={styles.speechTrainerStudioSummaryCategory}>
              {category.title} · {text.wordCount} words
            </Text>
          </View>
          <Text style={styles.speechTrainerStudioSummaryDescription}>{text.description}</Text>
        </View>

        <SettingCard
          label="Text Speed"
          icon="⚡"
          value={speed}
          options={['slow', 'medium', 'fast'] as TextSpeed[]}
          onChange={setSpeed}
        />

        <SettingCard
          label="Text Size"
          icon="Aa"
          value={size}
          options={['small', 'medium', 'large'] as TextSize[]}
          onChange={setSize}
        />

        <View style={styles.speechTrainerStudioTipCard}>
          <Text style={styles.speechTrainerStudioTipText}>
            <Text style={styles.speechTrainerStudioTipLabel}>💡 Coach Marcus: </Text>
            If this is your first time with this text, start on Slow. Speed
            increases comprehension only after you know the material.
          </Text>
        </View>

        <Pressable
          onPress={() => onBegin({text, speed, size})}
          style={styles.speechTrainerStudioBeginWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            style={styles.speechTrainerStudioBeginButton}>
            <Text style={styles.speechTrainerStudioBeginIcon}>▶</Text>
            <Text style={styles.speechTrainerStudioBeginText}>Begin Session</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </AppBackground>
  );
}

function SettingCard<T extends string>({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.speechTrainerStudioSettingCard}>
      <View style={styles.speechTrainerStudioSettingHeader}>
        <View style={styles.speechTrainerStudioSettingLabelRow}>
          <Text style={styles.speechTrainerStudioSettingIcon}>{icon}</Text>
          <Text style={styles.speechTrainerStudioSettingLabel}>{label}</Text>
        </View>
        <View style={styles.speechTrainerStudioValuePill}>
          <Text style={styles.speechTrainerStudioValuePillText}>{value}</Text>
        </View>
      </View>
      <SegmentedControl options={options} value={value} onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  speechTrainerStudioBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioBackIcon: {
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: -2,
  },
  speechTrainerStudioEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  speechTrainerStudioSummaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    marginBottom: 20,
  },
  speechTrainerStudioSummaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  speechTrainerStudioSummaryEmoji: {
    fontSize: 16,
  },
  speechTrainerStudioSummaryCategory: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  speechTrainerStudioSummaryDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  speechTrainerStudioSettingCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 20,
    marginBottom: 16,
  },
  speechTrainerStudioSettingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  speechTrainerStudioSettingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  speechTrainerStudioSettingIcon: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  speechTrainerStudioSettingLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  speechTrainerStudioValuePill: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  speechTrainerStudioValuePillText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textAccent,
    textTransform: 'capitalize',
  },
  speechTrainerStudioTipCard: {
    backgroundColor: colors.coachTipBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.coachTipBorder,
    padding: 16,
    marginBottom: 24,
  },
  speechTrainerStudioTipText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  speechTrainerStudioTipLabel: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.coachTipText,
  },
  speechTrainerStudioBeginWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  speechTrainerStudioBeginButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  speechTrainerStudioBeginIcon: {
    color: colors.white,
    fontSize: 14,
  },
  speechTrainerStudioBeginText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: colors.white,
  },
});
