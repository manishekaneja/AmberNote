type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  removed: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  lastLoginAt: string | firebase.firestore.FieldValue;
  notesVersion: number;
};
