import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useContext } from "react";
import { DargAndDropContext } from "../context/DragAndDropContext";
import { SelectedNotesContext } from "../context/SelectedNotesContext";
import { removeHTML } from "../helper/removeHTML";

const NoteCard: FC<{ singleNote: Note; onSelect: () => void }> = ({
  children,
  singleNote,
  onSelect,
}) => {
  const { setIsDragged } = useContext(DargAndDropContext);
  const selectedNotesList = useContext(SelectedNotesContext);
  return (
    <AnimatePresence>
      {!singleNote.removed && (
        <motion.div
          layout
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 1000,
          }}
          initial={{ height: 0, overflowY: "hidden", zIndex: 10 }}
          animate={{ opacity: 1, height: "auto", zIndex: 5 }}
          exit={{
            height: 0,
            overflowY: "hidden",
            zIndex: 10,
            x: -100,
            transition: {
              stiffness: 10,
            },
          }}
          style={{ minHeight: 70 }}
          className="hover:bg-gray-100 dark:bg-gray-500 dark:hover:bg-gray-600 hover:shadow-sm bg-white transition duration-100 w-full flex z-0"
        >
          <div
            className="flex-1 p-2"
            style={{ cursor: "grab" }}
            draggable="true"
            onDragEnd={() => {
              setIsDragged(false, true);
            }}
            onDragStart={(event) => {
              console.log("object")
              const isAllowed: boolean = !selectedNotesList.find(
                (sn) => sn.id === singleNote.id
              );
              event.dataTransfer.setData("noteid", singleNote.id);
              event.dataTransfer.setData(
                "isAllowed",
                isAllowed ? "true" : "false"
              );
              setIsDragged(true, isAllowed);
            }}
          >
            <h3 className="text-gray-800 text-lg font-medium dark:text-white ">
              <span
                role="button"
                onClick={() => {
                  onSelect();
                }}
                className="cursor-pointer hover:underline pr-4 capitalize"
              >
                {`${singleNote.title.slice(0, 15)}${
                  singleNote.title.length > 15 ? "..." : ""
                }`}
              </span>
            </h3>
            <p className="text-gray-800 dark:text-white">
              {removeHTML(singleNote.content).slice(0, 20)}
            </p>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteCard;
