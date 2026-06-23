import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {WorkshopFilterId, WorkshopText} from '../types/workshop';
import {
  createWorkshopText,
  loadWorkshopTexts,
  saveWorkshopTexts,
  updateWorkshopText,
} from '../utils/workshopStorage';
import {WorkshopEditorDraft} from '../screens/WorkshopEditorScreen';
import {useAppNavigation} from '../navigation/NavigationContext';

type WorkshopContextValue = {
  texts: WorkshopText[];
  filterId: WorkshopFilterId;
  editingText: WorkshopText | null;
  loading: boolean;
  setFilterId: (id: WorkshopFilterId) => void;
  startNew: () => void;
  startEdit: (text: WorkshopText) => void;
  deleteText: (id: string) => Promise<void>;
  saveDraft: (draft: WorkshopEditorDraft) => Promise<void>;
  closeEditor: () => void;
};

const WorkshopContext = createContext<WorkshopContextValue | null>(null);

export function WorkshopProvider({children}: {children: React.ReactNode}) {
  const {openWorkshopEditor, closeOverlay} = useAppNavigation();
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

  const startNew = useCallback(() => {
    setEditingText(null);
    openWorkshopEditor();
  }, [openWorkshopEditor]);

  const startEdit = useCallback(
    (text: WorkshopText) => {
      setEditingText(text);
      openWorkshopEditor();
    },
    [openWorkshopEditor],
  );

  const deleteText = useCallback(
    async (id: string) => {
      await persist(texts.filter(t => t.id !== id));
    },
    [persist, texts],
  );

  const saveDraft = useCallback(
    async (draft: WorkshopEditorDraft) => {
      if (editingText) {
        const updated = updateWorkshopText(editingText, draft);
        await persist(texts.map(t => (t.id === editingText.id ? updated : t)));
      } else {
        await persist([createWorkshopText(draft), ...texts]);
      }
      setEditingText(null);
      closeOverlay();
    },
    [closeOverlay, editingText, persist, texts],
  );

  const closeEditor = useCallback(() => {
    setEditingText(null);
    closeOverlay();
  }, [closeOverlay]);

  const value = useMemo(
    () => ({
      texts,
      filterId,
      editingText,
      loading,
      setFilterId,
      startNew,
      startEdit,
      deleteText,
      saveDraft,
      closeEditor,
    }),
    [
      texts,
      filterId,
      editingText,
      loading,
      startNew,
      startEdit,
      deleteText,
      saveDraft,
      closeEditor,
    ],
  );

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  );
}

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within WorkshopProvider');
  }
  return context;
}
