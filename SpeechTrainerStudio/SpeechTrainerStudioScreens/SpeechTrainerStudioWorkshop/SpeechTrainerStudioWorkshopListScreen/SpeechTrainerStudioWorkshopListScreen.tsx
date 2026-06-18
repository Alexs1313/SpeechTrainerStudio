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
import {WorkshopFilterId, WorkshopText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {colors, fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioTheme';

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
    <View style={styles.WorkshopListScreenCard}>
      <View style={styles.WorkshopListScreenCardInner}>
        <View style={styles.WorkshopListScreenCardBody}>
          <Text style={styles.WorkshopListScreenCardEmoji}>
            {getCategoryEmoji(text.categoryId)}
          </Text>
          <Text style={styles.WorkshopListScreenCardTitle}>{text.title}</Text>
          <Text style={styles.WorkshopListScreenCardDescription} numberOfLines={2}>
            {text.description}
          </Text>
          <Text style={styles.WorkshopListScreenCardWordCount}>{text.wordCount} words</Text>
        </View>

        <View style={styles.WorkshopListScreenCardActions}>
          <Pressable
            onPress={() => onEdit(text)}
            style={styles.WorkshopListScreenEditButton}
            hitSlop={4}>
            <Text style={styles.WorkshopListScreenEditIcon}>✎</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDelete(text)}
            style={styles.WorkshopListScreenDeleteButton}
            hitSlop={4}>
            <Text style={styles.WorkshopListScreenDeleteIcon}>🗑</Text>
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
        style={styles.WorkshopListScreenList}
        contentContainerStyle={[
          styles.WorkshopListScreenContent,
          {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 100},
        ]}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={
          <>
            <Text style={styles.WorkshopListScreenEyebrow}>Text Workshop</Text>

            <View style={styles.WorkshopListScreenHeaderRow}>
              <Text style={styles.WorkshopListScreenTitle}>Your Texts</Text>
              <Pressable onPress={onNew} style={styles.WorkshopListScreenNewButtonWrapper}>
                <LinearGradient
                  colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.WorkshopListScreenNewButton}>
                  <Text style={styles.WorkshopListScreenNewButtonIcon}>+</Text>
                  <Text style={styles.WorkshopListScreenNewButtonText}>New</Text>
                </LinearGradient>
              </Pressable>
            </View>

            <View style={styles.WorkshopListScreenFilters}>
              <WorkshopCategoryPills
                selectedId={filterId}
                onSelect={onFilterChange}
              />
            </View>

            <Text style={styles.WorkshopListScreenCount}>
              {filtered.length} {filtered.length === 1 ? 'text' : 'texts'}
            </Text>
          </>
        }
      />
    </AppBackground>
  );
}

function ListSeparator() {
  return <View style={styles.WorkshopListScreenSeparator} />;
}

const styles = StyleSheet.create({
  WorkshopListScreenList: {
    flex: 1,
  },
  WorkshopListScreenContent: {
    paddingHorizontal: 20,
  },
  WorkshopListScreenSeparator: {
    height: 12,
  },
  WorkshopListScreenEyebrow: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  WorkshopListScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  WorkshopListScreenTitle: {
    fontFamily: fonts.outfitBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
    flex: 1,
  },
  WorkshopListScreenNewButtonWrapper: {
    borderRadius: 20,
  },
  WorkshopListScreenNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    width: 60,
    justifyContent: 'center',
    borderRadius: 20,
    gap: 4,
  },
  WorkshopListScreenNewButtonIcon: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 16,
    color: colors.white,
    lineHeight: 18,
  },
  WorkshopListScreenNewButtonText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    color: colors.white,
    lineHeight: 20,
  },
  WorkshopListScreenFilters: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  WorkshopListScreenCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  WorkshopListScreenCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  WorkshopListScreenCardInner: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  WorkshopListScreenCardBody: {
    flex: 1,
    paddingRight: 8,
  },
  WorkshopListScreenCardEmoji: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  WorkshopListScreenCardTitle: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  WorkshopListScreenCardDescription: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  WorkshopListScreenCardWordCount: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  WorkshopListScreenCardActions: {
    gap: 8,
  },
  WorkshopListScreenEditButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WorkshopListScreenEditIcon: {
    fontSize: 14,
    color: colors.tabActive,
  },
  WorkshopListScreenDeleteButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WorkshopListScreenDeleteIcon: {
    fontSize: 13,
  },
});
