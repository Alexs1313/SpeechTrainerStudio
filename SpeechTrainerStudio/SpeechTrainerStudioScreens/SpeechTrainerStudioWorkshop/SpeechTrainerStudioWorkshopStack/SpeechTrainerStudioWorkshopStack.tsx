import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {colors} from '../../../SpeechTrainerStudioTheme/SpeechTrainerStudioColors/SpeechTrainerStudioColors';
import {WorkshopFilterId, WorkshopScreen, WorkshopText} from '../../../SpeechTrainerStudioTypes/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';
import {
  createWorkshopText,
  loadWorkshopTexts,
  saveWorkshopTexts,
  updateWorkshopText,
} from '../../../../SpeechTrainerStudioUtils/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshopStorage/SpeechTrainerStudioWorkshopStorage';
import {
  WorkshopEditorDraft,
  WorkshopEditorScreen,
} from '../SpeechTrainerStudioWorkshopEditorScreen/SpeechTrainerStudioWorkshopEditorScreen';
import {WorkshopListScreen} from '../SpeechTrainerStudioWorkshopListScreen/SpeechTrainerStudioWorkshopListScreen';

export function WorkshopStack() {
  const [screen, setScreen] = useState<WorkshopScreen>('list');
  const [texts, setTexts] = useState<WorkshopText[]>([]);
  const [filterId, setFilterId] = useState<WorkshopFilterId>('all');
  const [editingText, setEditingText] = useState<WorkshopText | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkshopTexts()
      .then(setTexts)
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(async (next: WorkshopText[]) => {
    setTexts(next);
    await saveWorkshopTexts(next);
  }, []);

  const handleNew = useCallback(() => {
    setEditingText(null);
    setScreen('editor');
  }, []);

  const handleEdit = useCallback((text: WorkshopText) => {
    setEditingText(text);
    setScreen('editor');
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      await persist(texts.filter(t => t.id !== id));
    },
    [persist, texts],
  );

  const handleSave = useCallback(
    async (draft: WorkshopEditorDraft) => {
      if (editingText) {
        const updated = updateWorkshopText(editingText, draft);
        await persist(texts.map(t => (t.id === editingText.id ? updated : t)));
      } else {
        await persist([createWorkshopText(draft), ...texts]);
      }
      setEditingText(null);
      setScreen('list');
    },
    [editingText, persist, texts],
  );

  const handleCloseEditor = useCallback(() => {
    setEditingText(null);
    setScreen('list');
  }, []);

  if (loading) {
    return (
      <View style={styles.speechTrainerStudioLoading}>
        <ActivityIndicator color={colors.tabActive} />
      </View>
    );
  }

  if (screen === 'editor') {
    return (
      <WorkshopEditorScreen
        editingText={editingText}
        onClose={handleCloseEditor}
        onSave={handleSave}
      />
    );
  }

  return (
    <WorkshopListScreen
      texts={texts}
      filterId={filterId}
      onFilterChange={setFilterId}
      onNew={handleNew}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

const styles = StyleSheet.create({
  speechTrainerStudioLoading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
