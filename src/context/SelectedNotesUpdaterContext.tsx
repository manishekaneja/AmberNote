import { createContext } from "react";

export const SelectedNotesUpdaterContext = createContext<{
  addNewNote: (note: Pick<Note, "id" | "title">) => void;
  toggleNotePinnedState: (note: Pick<Note, "id" | "pinned">) => void;
  removeNote: (note: Pick<Note, "id">) => void;
  selectNoteForEditor: (note: Pick<Note, "id">) => void;
  updateNoteFromEditor: (note: Note) => void;
  closeEditor: (note: Pick<Note, "id">) => void;
}>({
  addNewNote: () => {},
  toggleNotePinnedState: () => {},
  removeNote: () => {},
  selectNoteForEditor: () => {},
  closeEditor: () => {},
  updateNoteFromEditor: () => {},
});
