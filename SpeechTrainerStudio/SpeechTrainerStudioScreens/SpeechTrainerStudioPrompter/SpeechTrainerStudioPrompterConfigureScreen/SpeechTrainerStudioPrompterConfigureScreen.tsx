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
import {colors, fonts, speechTrainerStudioShadow} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';
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
          styles.PrompterConfigureScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.PrompterConfigureScreenHeader}>
          <Pressable onPress={onBack} style={styles.PrompterConfigureScreenBackButton}>
            <Text style={styles.PrompterConfigureScreenBackIcon}>‹</Text>
          </Pressable>
          <View>
            <Text style={styles.PrompterConfigureScreenEyebrow}>Configure</Text>
            <Text style={styles.PrompterConfigureScreenTitle}>{text.title}</Text>
          </View>
        </View>

        <View style={styles.PrompterConfigureScreenSummaryCard}>
          <View style={styles.PrompterConfigureScreenSummaryMeta}>
            <Text style={styles.PrompterConfigureScreenSummaryEmoji}>{category.emoji}</Text>
            <Text style={styles.PrompterConfigureScreenSummaryCategory}>
              {category.title} · {text.wordCount} words
            </Text>
          </View>
          <Text style={styles.PrompterConfigureScreenSummaryDescription}>{text.description}</Text>
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

        <View style={styles.PrompterConfigureScreenTipCard}>
          <Text style={styles.PrompterConfigureScreenTipText}>
            <Text style={styles.PrompterConfigureScreenTipLabel}>💡 Coach Marcus: </Text>
            If this is your first time with this text, start on Slow. Speed
            increases comprehension only after you know the material.
          </Text>
        </View>

        <Pressable
          onPress={() => onBegin({text, speed, size})}
          style={styles.PrompterConfigureScreenBeginWrapper}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            style={styles.PrompterConfigureScreenBeginButton}>
            <Text style={styles.PrompterConfigureScreenBeginIcon}>▶</Text>
            <Text style={styles.PrompterConfigureScreenBeginText}>Begin Session</Text>
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
    <View style={styles.PrompterConfigureScreenSettingCard}>
      <View style={styles.PrompterConfigureScreenSettingHeader}>
        <View style={styles.PrompterConfigureScreenSettingLabelRow}>
          <Text style={styles.PrompterConfigureScreenSettingIcon}>{icon}</Text>
          <Text style={styles.PrompterConfigureScreenSettingLabel}>{label}</Text>
        </View>
        <View style={styles.PrompterConfigureScreenValuePill}>
          <Text style={styles.PrompterConfigureScreenValuePillText}>{value}</Text>
        </View>
      </View>
      <SegmentedControl options={options} value={value} onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  PrompterConfigureScreenContent: {
    paddingHorizontal: 20,
  },
  PrompterConfigureScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  PrompterConfigureScreenBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrompterConfigureScreenBackIcon: {
    fontSize: 24,
    color: colors.textPrimary,
    marginTop: -2,
  },
  PrompterConfigureScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  PrompterConfigureScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  PrompterConfigureScreenSummaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 16,
    marginBottom: 20,
  },
  PrompterConfigureScreenSummaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  PrompterConfigureScreenSummaryEmoji: {
    fontSize: 16,
  },
  PrompterConfigureScreenSummaryCategory: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  PrompterConfigureScreenSummaryDescription: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  PrompterConfigureScreenSettingCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 20,
    marginBottom: 16,
  },
  PrompterConfigureScreenSettingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  PrompterConfigureScreenSettingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  PrompterConfigureScreenSettingIcon: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  PrompterConfigureScreenSettingLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  PrompterConfigureScreenValuePill: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  PrompterConfigureScreenValuePillText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    color: colors.textAccent,
    textTransform: 'capitalize',
  },
  PrompterConfigureScreenTipCard: {
    backgroundColor: colors.coachTipBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.coachTipBorder,
    padding: 16,
    marginBottom: 24,
  },
  PrompterConfigureScreenTipText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  PrompterConfigureScreenTipLabel: {
    fontFamily: fonts.dmSansSemiBold,
    color: colors.coachTipText,
  },
  PrompterConfigureScreenBeginWrapper: {
    borderRadius: 16,
    ...speechTrainerStudioShadow({
      shadowColor: '#8b5cf6',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    }),
  },
  PrompterConfigureScreenBeginButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  PrompterConfigureScreenBeginIcon: {
    color: colors.white,
    fontSize: 14,
  },
  PrompterConfigureScreenBeginText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: colors.white,
  },
});
