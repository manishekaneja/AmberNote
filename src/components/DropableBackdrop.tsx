import React, { FC, useContext } from "react";
import { DargAndDropContext } from "../context/DragAndDropContext";
import { SelectedNotesUpdaterContext } from "../context/SelectedNotesUpdaterContext";
const DropableBackdrop: FC<{}> = () => {
  const { selectNoteForEditor } = useContext(SelectedNotesUpdaterContext);
  const { isDragged, isAllowed, setIsDragged } = useContext(DargAndDropContext);

  if (!isDragged) {
    return null;
  }
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event?.preventDefault();
        let data = event.dataTransfer.getData("noteid");
        let isAllowed = event.dataTransfer.getData("isAllowed") === "true";
        if (isAllowed) {
          selectNoteForEditor({ id: data });
          setIsDragged(false, true);
        }
      }}
      className=" display-none lg:block  absolute z-10 dark:bg-white dark:bg-opacity-30 bg-black bg-opacity-20 flex items-stretch p-5 justify-center w-full h-full"
    >
      <div className="flex-1 flex items-center h-full justify-center border-2 border-dashed border-gray-900">
        <p className="text-gray-80 text-center  font-bold text-xl flex-1 py-2 px-5 bg-transparent">
          {isAllowed ? "Drop here to add" : "This Note is Already Open"}
        </p>
      </div>
    </div>
  );
};

export default DropableBackdrop;
