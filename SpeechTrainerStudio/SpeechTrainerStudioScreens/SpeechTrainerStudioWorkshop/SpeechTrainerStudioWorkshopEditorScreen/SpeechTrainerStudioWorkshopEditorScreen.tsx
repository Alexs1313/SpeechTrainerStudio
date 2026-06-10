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

import {AppBackground} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioCommon/SpeechTrainerStudioAppBackground';
import {WorkshopCategoryPills} from '../../../SpeechTrainerStudioComponents/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshopCategoryPills';
import {WORKSHOP_EDITOR_CATEGORIES} from '../../../SpeechTrainerStudioConstants/SpeechTrainerStudioWorkshopCategories';
import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {fonts} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioFonts/SpeechTrainerStudioFonts';
import {PrompterCategoryId} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {WorkshopText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {countWords} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioFormatting/SpeechTrainerStudioWordCount/SpeechTrainerStudioWordCount';

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
  const [description, setDescription] = useState(editingText?.description ?? '');
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
        style={styles.speechTrainerStudioFlex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.speechTrainerStudioFlex}
          contentContainerStyle={[
            styles.speechTrainerStudioContent,
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 100,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.speechTrainerStudioHeader}>
            <Pressable onPress={onClose} style={styles.speechTrainerStudioCloseButton} hitSlop={8}>
              <Text style={styles.speechTrainerStudioCloseIcon}>✕</Text>
            </Pressable>
            <Text style={styles.speechTrainerStudioHeaderTitle}>
              {editingText ? 'Edit Text' : 'New Text'}
            </Text>
            <Pressable
              onPress={handleSave}
              disabled={!canSave}
              style={[styles.speechTrainerStudioSaveButton, !canSave && styles.speechTrainerStudioSaveButtonDisabled]}>
              <Text
                style={[styles.speechTrainerStudioSaveIcon, !canSave && styles.speechTrainerStudioSaveTextDisabled]}>
                ✓
              </Text>
              <Text
                style={[styles.speechTrainerStudioSaveText, !canSave && styles.speechTrainerStudioSaveTextDisabled]}>
                Save
              </Text>
            </Pressable>
          </View>

          <Text style={styles.speechTrainerStudioLabel}>Category</Text>
          <View style={styles.speechTrainerStudioCategoryPills}>
            <WorkshopCategoryPills
              categories={WORKSHOP_EDITOR_CATEGORIES}
              selectedId={categoryId}
              onSelect={id => setCategoryId(id as PrompterCategoryId)}
            />
          </View>

          <Text style={styles.speechTrainerStudioLabel}>Title *</Text>
          <View style={styles.speechTrainerStudioInputWrapper}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter text title..."
              placeholderTextColor={colors.textSecondary}
              style={styles.speechTrainerStudioInput}
            />
          </View>

          <Text style={styles.speechTrainerStudioLabel}>Short Description</Text>
          <View style={styles.speechTrainerStudioInputWrapper}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description of this text..."
              placeholderTextColor={colors.textSecondary}
              style={styles.speechTrainerStudioInput}
            />
          </View>

          <View style={styles.speechTrainerStudioContentHeader}>
            <Text style={styles.speechTrainerStudioLabel}>Content *</Text>
            <Text style={styles.speechTrainerStudioWordCount}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </Text>
          </View>
          <View style={styles.speechTrainerStudioTextAreaWrapper}>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Write or paste your teleprompter text here. Use double line breaks to separate paragraphs..."
              placeholderTextColor={colors.textSecondary}
              style={styles.speechTrainerStudioTextArea}
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
  speechTrainerStudioFlex: {
    flex: 1,
  },
  speechTrainerStudioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  speechTrainerStudioCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechTrainerStudioCloseIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  speechTrainerStudioHeaderTitle: {
    flex: 1,
    fontFamily: fonts.outfitBold,
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  speechTrainerStudioSaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    gap: 4,
  },
  speechTrainerStudioSaveButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    opacity: 0.5,
  },
  speechTrainerStudioSaveIcon: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 14,
  },
  speechTrainerStudioSaveText: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  speechTrainerStudioSaveTextDisabled: {
    color: colors.textSecondary,
  },
  speechTrainerStudioContent: {
    paddingHorizontal: 20,
  },
  speechTrainerStudioLabel: {
    fontFamily: fonts.dmSansSemiBold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.96,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  speechTrainerStudioCategoryPills: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  speechTrainerStudioInputWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    marginBottom: 16,
  },
  speechTrainerStudioInput: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  speechTrainerStudioContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  speechTrainerStudioWordCount: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 11,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  speechTrainerStudioTextAreaWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    minHeight: 274,
  },
  speechTrainerStudioTextArea: {
    fontFamily: fonts.dmSansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 274,
  },
});
