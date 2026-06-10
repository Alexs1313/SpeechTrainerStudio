import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {WorkshopCategoryPills} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshopCategoryPills';
import {getCategoryEmoji} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioWorkshopCategories';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {WorkshopFilterId, WorkshopText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';

type Props = {
  texts: WorkshopText[];
  filterId: WorkshopFilterId;
  onFilterChange: (id: WorkshopFilterId) => void;
  onNew: () => void;
  onEdit: (text: WorkshopText) => void;
  onDelete: (id: string) => void;
};

export function WorkshopListScreen({
  texts,
  filterId,
  onFilterChange,
  onNew,
  onEdit,
  onDelete,
}: Props) {
  const insets = useSafeAreaInsets();

  const filtered =
    filterId === 'all' ? texts : texts.filter(t => t.categoryId === filterId);

  const handleDelete = (text: WorkshopText) => {
    Alert.alert(
      'Delete Text',
      `Delete "${text.title}"? This cannot be undone.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(text.id),
        },
      ],
    );
  };

  const renderItem: ListRenderItem<WorkshopText> = ({item: text}) => (
    <View style={styles.speechTrainerStudioCard}>
      <View style={styles.speechTrainerStudioCardInner}>
        <View style={styles.speechTrainerStudioCardBody}>
          <Text style={styles.speechTrainerStudioCardEmoji}>
            {getCategoryEmoji(text.categoryId)}
          </Text>
          <Text style={styles.speechTrainerStudioCardTitle}>{text.title}</Text>
          <Text style={styles.speechTrainerStudioCardDescription} numberOfLines={2}>
            {text.description}
          </Text>
          <Text style={styles.speechTrainerStudioCardWordCount}>{text.wordCount} words</Text>
        </View>

        <View style={styles.speechTrainerStudioCardActions}>
          <Pressable
            onPress={() => onEdit(text)}
            style={styles.speechTrainerStudioEditButton}
            hitSlop={4}>
            <Text style={styles.speechTrainerStudioEditIcon}>✎</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDelete(text)}
            style={styles.speechTrainerStudioDeleteButton}
            hitSlop={4}>
            <Text style={styles.speechTrainerStudioDeleteIcon}>🗑</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <AppBackground>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.speechTrainerStudioList}
        contentContainerStyle={[
          styles.speechTrainerStudioContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={
          <>
            <Text style={styles.speechTrainerStudioEyebrow}>Text Workshop</Text>

            <View style={styles.speechTrainerStudioHeaderRow}>
              <Text style={styles.speechTrainerStudioTitle}>Your Texts</Text>
              <Pressable onPress={onNew} style={styles.speechTrainerStudioNewButtonWrapper}>
                <LinearGradient
                  colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.speechTrainerStudioNewButton}>
                  <Text style={styles.speechTrainerStudioNewButtonIcon}>+</Text>
                  <Text style={styles.speechTrainerStudioNewButtonText}>New</Text>
                </LinearGradient>
              </Pressable>
            </View>

            <View style={styles.speechTrainerStudioFilters}>
              <WorkshopCategoryPills
                selectedId={filterId}
                onSelect={onFilterChange}
              />
            </View>

            <Text style={styles.speechTrainerStudioCount}>
              {filtered.length} {filtered.length === 1 ? 'text' : 'texts'}
            </Text>
          </>
        }
      />
    </AppBackground>
  );
}

function ListSeparator() {
  return <View style={styles.speechTrainerStudioSeparator} />;
}

const styles = StyleSheet.create({
  speechTrainerStudioList: {
    flex: 1,
  },
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioSeparator: {
    height: 12,
  },
  speechTrainerStudioEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  speechTrainerStudioHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  speechTrainerStudioTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
    flex: 1,
  },
  speechTrainerStudioNewButtonWrapper: {
    borderRadius: 20,
  },
  speechTrainerStudioNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    width: 60,
    justifyContent: 'center',
    borderRadius: 20,
    gap: 4,
  },
  speechTrainerStudioNewButtonIcon: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: colors.white,
    lineHeight: 18,
  },
  speechTrainerStudioNewButtonText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    color: colors.white,
    lineHeight: 20,
  },
  speechTrainerStudioFilters: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  speechTrainerStudioCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  speechTrainerStudioCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  speechTrainerStudioCardInner: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  speechTrainerStudioCardBody: {
    flex: 1,
    paddingRight: 8,
  },
  speechTrainerStudioCardEmoji: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  speechTrainerStudioCardTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  speechTrainerStudioCardDescription: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  speechTrainerStudioCardWordCount: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  speechTrainerStudioCardActions: {
    gap: 8,
  },
  speechTrainerStudioEditButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioEditIcon: {
    fontSize: 14,
    color: colors.tabActive,
  },
  speechTrainerStudioDeleteButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioDeleteIcon: {
    fontSize: 13,
  },
});
