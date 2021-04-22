import React, { useState } from "react";
import { DargAndDropContext } from "./context/DragAndDropContext";
import { LoginPopupContext } from "./context/LoginPopupContext";
import { NotesContext } from "./context/NotesContext";
import { SelectedNotesContext } from "./context/SelectedNotesContext";
import { SelectedNotesUpdaterContext } from "./context/SelectedNotesUpdaterContext";
import { UserContext } from "./context/UserContext";
import EntryPoint from "./EntryPoint";
import { useNotesManagementHook } from "./hooks/useNotesManagementHook";

function App() {
  const {
    notesList,
    selectedNotesList,
    addNewNote,
    updateNoteFromEditor,
    closeEditor,
    removeNote,
    toggleNotePinnedState,
    selectNoteForEditor,
    user,
  } = useNotesManagementHook();

  // Drag & Drop State Context
  const [{ isDragged, isAllowed }, setIsDraggedAndAllowed] = useState<{
    isDragged: boolean;
    isAllowed: boolean;
  }>({
    isAllowed: true,
    isDragged: false,
  });

  // State for Login Pop-up
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  return (
    <>
      {/* Context for Login Popup */}
      <LoginPopupContext.Provider
        value={{
          loginPopupFlag: loginPopup,
          setLoginPopupFlag: (flag: boolean) => {
            setLoginPopup(flag);
          },
        }}
      >
        {/* Drag & Drop Flags Provider */}
        <DargAndDropContext.Provider
          value={{
            isDragged: isDragged,
            isAllowed: isAllowed,
            setIsDragged: (isDragged: boolean, isAllowed: boolean) => {
              setIsDraggedAndAllowed({ isDragged, isAllowed });
            },
          }}
        >
          {/* User & Login State Provider */}
          <UserContext.Provider
            value={{
              user: user,
              isLoggedIn: !!user,
            }}
          >
            {/* Updated Notes Provider */}
            <NotesContext.Provider value={notesList}>
              {/* Updated Selected Notes Provider */}
              <SelectedNotesContext.Provider value={selectedNotesList}>
                <SelectedNotesUpdaterContext.Provider
                  value={{
                    addNewNote,
                    toggleNotePinnedState,
                    removeNote,
                    selectNoteForEditor,
                    updateNoteFromEditor,
                    closeEditor,
                  }}
                >
                  <EntryPoint />
                </SelectedNotesUpdaterContext.Provider>
              </SelectedNotesContext.Provider>
            </NotesContext.Provider>
          </UserContext.Provider>
        </DargAndDropContext.Provider>
      </LoginPopupContext.Provider>
    </>
  );
}

export default App;
