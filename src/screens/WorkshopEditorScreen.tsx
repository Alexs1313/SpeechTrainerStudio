import React, {useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppBackground} from '../components/common/AppBackground';
import {WorkshopCategoryPills} from '../components/workshop/WorkshopCategoryPills';
import {WORKSHOP_EDITOR_CATEGORIES} from '../constants/workshopCategories';
import {PrompterCategoryId} from '../types/prompter';
import {WorkshopText} from '../types/workshop';
import {countWords} from '../utils/wordCount';
import {colors, fonts} from '../constants/theme';

export type WorkshopEditorDraft = {
  categoryId: PrompterCategoryId;
  title: string;
  description: string;
  body: string;
};

type Props = {
  editingText: WorkshopText | null;
  onClose: () => void;
  onSave: (draft: WorkshopEditorDraft) => void;
};

export function WorkshopEditorScreen({editingText, onClose, onSave}: Props) {
  const insets = useSafeAreaInsets();
  const [categoryId, setCategoryId] = useState<PrompterCategoryId>(
    editingText?.categoryId ?? 'public-speaking',
  );
  const [title, setTitle] = useState(editingText?.title ?? '');
  const [description, setDescription] = useState(
    editingText?.description ?? '',
  );
  const [body, setBody] = useState(editingText?.body ?? '');

  const wordCount = useMemo(() => countWords(body), [body]);
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const handleSave = () => {
    if (!canSave) {
      return;
    }
    onSave({
      categoryId,
      title: title.trim(),
      description: description.trim(),
      body: body.trim(),
    });
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        style={styles.WorkshopEditorScreenFlex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.WorkshopEditorScreenFlex}
          contentContainerStyle={[
            styles.WorkshopEditorScreenContent,
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 100,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.WorkshopEditorScreenHeader}>
            <Pressable
              onPress={onClose}
              style={styles.WorkshopEditorScreenCloseButton}
              hitSlop={8}>
              <Text style={styles.WorkshopEditorScreenCloseIcon}>✕</Text>
            </Pressable>
            <Text style={styles.WorkshopEditorScreenHeaderTitle}>
              {editingText ? 'Edit Text' : 'New Text'}
            </Text>
            <Pressable
              onPress={handleSave}
              disabled={!canSave}
              style={[
                styles.WorkshopEditorScreenSaveButton,
                !canSave && styles.WorkshopEditorScreenSaveButtonDisabled,
              ]}>
              <Text
                style={[
                  styles.WorkshopEditorScreenSaveIcon,
                  !canSave && styles.WorkshopEditorScreenSaveTextDisabled,
                ]}>
                ✓
              </Text>
              <Text
                style={[
                  styles.WorkshopEditorScreenSaveText,
                  !canSave && styles.WorkshopEditorScreenSaveTextDisabled,
                ]}>
                Save
              </Text>
            </Pressable>
          </View>

          <Text style={styles.WorkshopEditorScreenLabel}>Category</Text>
          <View style={styles.WorkshopEditorScreenCategoryPills}>
            <WorkshopCategoryPills
              categories={WORKSHOP_EDITOR_CATEGORIES}
              selectedId={categoryId}
              onSelect={id => setCategoryId(id as PrompterCategoryId)}
            />
          </View>

          <Text style={styles.WorkshopEditorScreenLabel}>Title *</Text>
          <View style={styles.WorkshopEditorScreenInputWrapper}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter text title..."
              placeholderTextColor={colors.textSecondary}
              style={styles.WorkshopEditorScreenInput}
            />
          </View>

          <Text style={styles.WorkshopEditorScreenLabel}>
            Short Description
          </Text>
          <View style={styles.WorkshopEditorScreenInputWrapper}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description of this text..."
              placeholderTextColor={colors.textSecondary}
              style={styles.WorkshopEditorScreenInput}
            />
          </View>

          <View style={styles.WorkshopEditorScreenContentHeader}>
            <Text style={styles.WorkshopEditorScreenLabel}>Content *</Text>
            <Text style={styles.WorkshopEditorScreenWordCount}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Text>
          </View>
          <View style={styles.WorkshopEditorScreenTextAreaWrapper}>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Write or paste your teleprompter text here. Use double line breaks to separate paragraphs..."
              placeholderTextColor={colors.textSecondary}
              style={styles.WorkshopEditorScreenTextArea}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  WorkshopEditorScreenFlex: {
    flex: 1,
  },
  WorkshopEditorScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  WorkshopEditorScreenCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WorkshopEditorScreenCloseIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  WorkshopEditorScreenHeaderTitle: {
    flex: 1,
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  WorkshopEditorScreenSaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    gap: 4,
  },
  WorkshopEditorScreenSaveButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    opacity: 0.5,
  },
  WorkshopEditorScreenSaveIcon: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 14,
  },
  WorkshopEditorScreenSaveText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  WorkshopEditorScreenSaveTextDisabled: {
    color: colors.textSecondary,
  },
  WorkshopEditorScreenContent: {
    paddingHorizontal: 20,
  },
  WorkshopEditorScreenLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.96,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  WorkshopEditorScreenCategoryPills: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  WorkshopEditorScreenInputWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    marginBottom: 16,
  },
  WorkshopEditorScreenInput: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  WorkshopEditorScreenContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  WorkshopEditorScreenWordCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },

  WorkshopEditorScreenTextAreaWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    minHeight: 274,
  },

  WorkshopEditorScreenTextArea: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 274,
  },
});
