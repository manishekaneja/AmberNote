import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState } from "react";
import { increment, projectAuth, projectFirestore, serverTimeStamp } from "..";

export const useNotesManagementHook = () => {
  // User Info Context
  const [user, setUser] = useState<User | null>(null);

  // Current Notes List storage
  const [notesList, setNotesList] = useState<Note[]>([]);
  const versionConter = useRef(0);

  // Notes Operations
  const addNewNote = useCallback(
    ({ id, title }: Pick<Note, "id" | "title">) => {
      const noteToAdd = {
        content: "",
        id,
        pinned: false,
        removed: false,
        title,
      };
      const callbackAction = () => {
        setNotesList((previousNotesList: Note[]) => {
          const copyOfPreviousList: Note[] = [...previousNotesList];
          copyOfPreviousList.push(noteToAdd);
          return copyOfPreviousList;
        });
        versionConter.current++;
      };
      if (user) {
        const batch = projectFirestore.batch();
        const userDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email);
        const noteDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email)
          .collection("notes")
          .doc(id);
        batch.update(userDocumentRef, {
          notesVersion: increment,
        });
        batch.set(noteDocumentRef, noteToAdd);
        batch.commit().then(callbackAction);
      } else {
        callbackAction();
      }
    },
    [user]
  );

  const toggleNotePinnedState = useCallback(
    ({ id, pinned: currnetPinnedState }: Pick<Note, "id" | "pinned">) => {
      const callbackAction = () => {
        setNotesList((previousNotesList) => {
          const copyOfNotesList: Note[] = previousNotesList.map((note) =>
            note.id !== id ? note : { ...note, pinned: !currnetPinnedState }
          );
          return [
            ...copyOfNotesList.filter((node) => node.pinned),
            ...copyOfNotesList.filter((node) => !node.pinned),
          ];
        });
        versionConter.current++;
      };

      if (user) {
        const batch = projectFirestore.batch();
        const userDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email);
        const noteDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email)
          .collection("notes")
          .doc(id);
        batch.update(userDocumentRef, {
          notesVersion: increment,
        });
        batch.update(noteDocumentRef, {
          pinned: !currnetPinnedState,
        });
        batch.commit().then(callbackAction);
      } else {
        callbackAction();
      }
    },
    [user]
  );

  const removeNote = useCallback(
    ({ id }: Pick<Note, "id">) => {
      const callbackAction = () => {
        setNotesList((previousNotesList) =>
          previousNotesList.filter((note) => note.id !== id)
        );
        versionConter.current++;
      };
      if (user) {
        const batch = projectFirestore.batch();
        const userDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email);
        const noteDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email)
          .collection("notes")
          .doc(id);

        batch.update(userDocumentRef, {
          notesVersion: increment,
        });
        batch.delete(noteDocumentRef);
        batch.commit().then(callbackAction);
      } else {
        callbackAction();
      }
    },
    [user]
  );

  const selectNoteForEditor = useCallback(
    ({ id }: Pick<Note, "id">) => {
      setSelectedNotesList((previousNotesList) => {
        const copyOfNotesList = [...previousNotesList];
        const isAlreadySelected = copyOfNotesList.find((ps) => ps.id === id);
        const selectedNote = notesList.find((ps) => ps.id === id);
        if (!isAlreadySelected && selectedNote) {
          copyOfNotesList.push(selectedNote);
        }
        return copyOfNotesList;
      });
    },
    [notesList]
  );

  const closeEditor = useCallback(({ id }: Pick<Note, "id">) => {
    setSelectedNotesList((ps) => {
      return ps.filter((s) => s.id !== id);
    });
  }, []);

  const updateNoteFromEditor = useCallback(
    (note: Note) => {
      const callbackAction = () => {
        versionConter.current++;
        setNotesList((prevousNoteList) => {
          return prevousNoteList.map((singleNoteList) =>
            singleNoteList.id === note.id
              ? {
                  ...singleNoteList,
                  title: note.title,
                  content: note.content,
                }
              : singleNoteList
          );
        });
        setSelectedNotesList((previouslySelectedNotesList) => {
          return previouslySelectedNotesList.map((singleSelectedNotesList) =>
            singleSelectedNotesList.id === note.id
              ? {
                  ...singleSelectedNotesList,
                  title: note.title,
                  content: note.content,
                }
              : singleSelectedNotesList
          );
        });
      };
      if (user) {
        const batch = projectFirestore.batch();
        const userDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email);
        const noteDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email)
          .collection("notes")
          .doc(note.id);

        batch.update(userDocumentRef, {
          notesVersion: increment,
        });

        batch.update(noteDocumentRef, {
          title: note.title,
          content: note.content,
        });
        batch.commit().then(callbackAction);
      } else {
        callbackAction();
      }
    },
    [user]
  );

  // Selected Notes List storage
  const [selectedNotesList, setSelectedNotesList] = useState<Note[]>([]);

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged(
      async (userAuthObject) => {
        if (userAuthObject && userAuthObject.email) {
          const userDocumentRef = projectFirestore
            .collection("amber-note/main-stream-data/users")
            .doc(userAuthObject.email);
          const { exists } = await userDocumentRef.get();
          if (!exists) {
            const user: User = {
              id: nanoid(),
              email: userAuthObject.email,
              name: userAuthObject.displayName || "",
              lastLoginAt: serverTimeStamp(),
              notesVersion: versionConter.current,
            };

            userDocumentRef.set({
              ...user,
            });
            setUser(user);
          } else {
            userDocumentRef.update({
              lastLoginAt: serverTimeStamp(),
            });
            await userDocumentRef.get().then((user) => {
              const userInfo: User = user.data() as User;
              if (userInfo) {
                versionConter.current = userInfo.notesVersion;
                setUser({
                  email: userInfo.email,
                  id: userInfo.id,
                  name: userInfo.name,
                } as User);
              } else {
                setUser(null);
              }

              return;
            });
          }
        } else {
          setUser(null);
        }
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Fetching Data from Local Storage
    const notesListFromLocalStorage = localStorage.getItem("notesList");
    const parsedLocalStorageData =
      notesListFromLocalStorage && JSON.parse(notesListFromLocalStorage);
    if (user) {
      // Checking Local storage & application version
      const isLocalLatest =
        parsedLocalStorageData &&
        "version" in parsedLocalStorageData &&
        parsedLocalStorageData.version > versionConter.current;

      if (
        isLocalLatest &&
        "value" in parsedLocalStorageData &&
        parsedLocalStorageData.value.every((note: Note) =>
          ["id", "title", "content", "pinned", "removed"].every((key) =>
            note.hasOwnProperty(key)
          )
        )
      ) {
        const localNotesList: Note[] = parsedLocalStorageData.value;
        const batch = projectFirestore.batch();
        const userDocumentRef = projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email);
        const userNotesCollectionRef = userDocumentRef.collection("notes");

        localNotesList.forEach((note) => {
          const userNoteDocumentRef = userNotesCollectionRef.doc(note.id);
          batch.set(userNoteDocumentRef, note, {
            merge: true,
          });
        });

        userNotesCollectionRef
          .where(
            "id",
            "not-in",
            localNotesList.map((e) => e.id)
          )
          .get()
          .then((filteredCollectionSnapshot) => {
            filteredCollectionSnapshot.forEach((documentToDelete) => {
              if (documentToDelete.exists) {
                const documentToDeleteReferernce = userNotesCollectionRef.doc(
                  documentToDelete.id
                );
                batch.delete(documentToDeleteReferernce);
              }
            });
          })
          .then(() => {
            batch.update(userDocumentRef, {
              notesVersion: increment,
            });
            batch.commit();
          });
      } else {
        projectFirestore
          .collection("amber-note/main-stream-data/users")
          .doc(user.email)
          .collection("notes")
          .get()
          .then((snapshot) => {
            const projectList: Note[] = [];
            snapshot.forEach((doc) => {
              if (doc.exists) {
                const note: Note = doc.data() as Note;
                projectList.push(note);
              }
            });
            setNotesList((pl) => {
              return [
                ...projectList.filter((e) => e.pinned),
                ...projectList.filter((e) => !e.pinned),
              ];
            });
          });
      }
    } else {
      if (
        parsedLocalStorageData &&
        "version" in parsedLocalStorageData &&
        parsedLocalStorageData.version > versionConter.current &&
        parsedLocalStorageData.value instanceof Array &&
        parsedLocalStorageData.value.every((note: Note) =>
          ["id", "title", "content", "pinned", "removed"].every((key) =>
            note.hasOwnProperty(key)
          )
        )
      ) {
        setNotesList(parsedLocalStorageData.value);
        versionConter.current = parsedLocalStorageData.version;
      }
    }
  }, [user]);

  // Login state Effect
  useEffect(() => {
    localStorage.setItem(
      "notesList",
      JSON.stringify({ version: versionConter.current, value: notesList })
    );
  }, [notesList]);

  return {
    notesList,
    selectedNotesList,
    updateNoteFromEditor,
    closeEditor,
    selectNoteForEditor,
    removeNote,
    toggleNotePinnedState,
    addNewNote,
    user,
  };
};
