import React, { FC, Fragment, useContext, useState } from "react";
import ReactQuill from "react-quill";
import { SelectedNotesUpdaterContext } from "../context/SelectedNotesUpdaterContext";
import debounce from "../helper/debounce";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import Title from "./Title";
import TitleInput from "./TitleInput";
const NoteEditor: FC<{ note: Note }> = ({ note }) => {
  const { updateNoteFromEditor, closeEditor } = useContext(
    SelectedNotesUpdaterContext
  );
  const [isEditable, setIsEditable] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="flex flex-col flex-1 text-white">
        <Title>
          <TitleInput
            isEditable={isEditable}
            defaultEditableInput={note.title}
            fallback={
              <>
                <p className="text-white font-bold text-xl flex-1 py-2 px-5 bg-transparent">
                  {note.title}
                </p>
                <button
                  className="px-5 py-2 text-white focus:outline-none"
                  onClick={() => setIsEditable(true)}
                >
                  <EditIcon />
                </button>
              </>
            }
            onSubmit={(title: string) => {
              updateNoteFromEditor({
                ...note,
                title: title,
              });
              setIsEditable(false);
            }}
          />

          <button
            className="px-5 py-2 focus:outline-none"
            onClick={() => closeEditor(note)}
          >
            <CloseIcon />
          </button>
        </Title>
        <ReactQuill
          defaultValue={note.content}
          onChange={debounce((content) => {
            updateNoteFromEditor({
              ...note,
              content: content,
            });
          }, 500)}
        />
      </div>
    </Fragment>
  );
};

export default NoteEditor;
