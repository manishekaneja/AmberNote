import {useCallback, useState} from 'react';
import DragableContainer from './components/DragableContainer';
import EditorContainer from './components/EditorContainer';
import LoginPopup from './components/LoginPopup';
import SidebarConatiner from './components/SideBarContainer';

function EntryPoint() {
  const [isCreateNoteActive, setIsCreateNoteActive] = useState<boolean>(false);
  const activateCreateNote = useCallback(() => setIsCreateNoteActive(true), []);
  const deactivateCreateNote = useCallback(
    () => setIsCreateNoteActive(false),
    []
  );

  const toggleCreateNote = useCallback(
    () => setIsCreateNoteActive((pf) => !pf),
    []
  );

  return (
    <>
      <DragableContainer
        side={
          <SidebarConatiner
            createState={isCreateNoteActive}
            onCreateStateChange={toggleCreateNote}
            deactivateCreateNote={deactivateCreateNote}
          />
        }
      >
        <EditorContainer onPlaceholderClick={activateCreateNote} />
      </DragableContainer>
      <LoginPopup />
    </>
  );
}

export default EntryPoint;
