import {nanoid} from 'nanoid';
import React, {FC, useContext, useState} from 'react';
import {NotesContext} from '../context/NotesContext';
import {SelectedNotesUpdaterContext} from '../context/SelectedNotesUpdaterContext';
import CloseIcon from '../icons/CloseIcon';
import FileIcon from '../icons/FileIcon';
import PinnedIcon from '../icons/PinnedIcon';
import TrashIcon from '../icons/TrashIcon';
import NoteCard from './NoteCard';
import Title from './Title';
import TitleInput from './TitleInput';
const SidebarConatiner: FC<{
  createState: boolean;
  onCreateStateChange: () => void;
  deactivateCreateNote: () => void;
}> = ({createState, onCreateStateChange, deactivateCreateNote}) => {
  const notesList = useContext(NotesContext);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const {addNewNote, removeNote, toggleNotePinnedState, selectNoteForEditor} =
    useContext(SelectedNotesUpdaterContext);
  return (
    <>
      <Title>
        <h1 className="text-white font-black text-2xl text-center flex-1 ">
          Amber-Note
        </h1>
        <button
          className="focus:outline-none flex-grow-0 dark:hover:bg-gray-700 hover:bg-blue-500 p-3"
          onClick={onCreateStateChange}
        >
          {createState ? <CloseIcon /> : <FileIcon />}
        </button>
      </Title>
      <div className="flex flex-row w-full text-gray-700">
        <TitleInput
          fallback={null}
          isEditable={createState}
          defaultEditableInput=""
          onSubmit={(title) => {
            addNewNote({
              id: nanoid(),
              title: title,
            });
            deactivateCreateNote();
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y mt-1 divide-gray-200 relative">
        {notesList.map((singleNote) => {
          return (
            <NoteCard
              singleNote={singleNote}
              key={singleNote.id}
              onSelect={() => {
                selectNoteForEditor({
                  id: singleNote.id,
                });
              }}
            >
              {!singleNote.pinned && (
                <button
                  className="hover:bg-red-100 dark:hover:text-black p-2 transition duration-100 flex items-center justify-center focus:outline-none dark:text-white"
                  onClick={() => {
                    removeNote({
                      id: singleNote.id,
                    });
                  }}
                >
                  <TrashIcon />
                </button>
              )}
              <button
                className="hover:bg-purple-100 dark:hover:text-black  p-2 transition duration-100 flex items-center justify-center focus:outline-none dark:text-white"
                onClick={() => {
                  toggleNotePinnedState({
                    id: singleNote.id,
                    pinned: singleNote.pinned,
                  });
                }}
              >
                <PinnedIcon active={singleNote.pinned} />
              </button>
            </NoteCard>
          );
        })}
      </div>
    </>
  );
};

export default SidebarConatiner;
