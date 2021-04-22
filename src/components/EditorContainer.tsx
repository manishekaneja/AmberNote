import React, { useContext, useEffect, useRef, useState } from "react";
import { SelectedNotesContext } from "../context/SelectedNotesContext";
import ColumnIcon from "../icons/ColumnIcon";
import FullscreenIcon from "../icons/FullscreenIcon";
import GridIcon from "../icons/GridIcon";
import RowIcon from "../icons/RowIcon";
import DropableBackdrop from "./DropableBackdrop";
import EditorContainerDefault from "./EditorContainerDefault";
import NoteEditor from "./NoteEditor";
import SyncButton from "./SyncButton";
import ThemeButton from "./ThemeButton";
import Title from "./Title";

function EditorContainer() {
  const [layout, setLayout] = useState<"col" | "row" | "grid">("col");
  const selectedNotesList = useContext(SelectedNotesContext);

  const ref = useRef<HTMLHeadingElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  useEffect(() => {
    const listener = function () {
      var full_screen_element = document.fullscreenElement;
      if (full_screen_element !== null) setIsFullscreen(true);
      else setIsFullscreen(false);
    };
    let element = ref.current;
    if (element) {
      element.addEventListener("fullscreenchange", listener);
    }
    return () => {
      if (element) {
        element.removeEventListener("fullscreenchange", listener);
      }
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className="flex-1 flex items-stretch justify-center flex-col max-w-full max-h-full relative"
    >
      <Title>
        <h3 className="text-white font-bold text-xl flex-1 py-2 px-5 bg-transparent ">
          <span className="hidden lg:block">Amber Note Editor</span>
        </h3>
        <SyncButton />
        <ThemeButton />
        {selectedNotesList.length > 1 && (
          <div className="px-2 hidden lg:block">
            <button
              className={`px-2 py-3 focus:outline-none ${
                layout === "col" ? "bg-blue-300 dark:bg-gray-800" : ""
              }`}
              onClick={() => setLayout("col")}
            >
              <ColumnIcon />
            </button>
            <button
              className={`px-2 py-3 focus:outline-none ${
                layout === "row" ? "bg-blue-300 dark:bg-gray-800" : ""
              }`}
              onClick={() => setLayout("row")}
            >
              <RowIcon />
            </button>
            <button
              className={`px-2 py-3 focus:outline-none ${
                layout === "grid" ? "bg-blue-300 dark:bg-gray-800" : ""
              }`}
              onClick={() => setLayout("grid")}
            >
              <GridIcon />
            </button>
          </div>
        )}
        <button
          className="px-5 py-2 focus:outline-none"
          onClick={() => {
            if (ref.current) {
              if (!isFullscreen && document.fullscreenElement === null) {
                ref.current.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }
          }}
        >
          <FullscreenIcon isMaximum={isFullscreen} />
        </button>
      </Title>
      <div className="border-b"></div>
      <div
        className={`items-stretch justify-start flex-1 bg-gray-100  dark:bg-gray-800 relative flex flex-col max-h-full overflow-y-auto ${
          layout === "grid"
            ? " lg:grid lg:grid-cols-2 lg:max-h-full lg:overflow-y-auto "
            : layout === "row"
            ? " lg:flex lg:flex-col lg:max-h-full lg:overflow-y-auto "
            : "  lg:flex lg:flex-row lg:max-w-full lg:overflow-x-auto "
        }`}
      >
        <DropableBackdrop />

        {selectedNotesList.length > 0 ? (
          selectedNotesList.map((singleNote) => {
            return <NoteEditor note={singleNote} key={singleNote.id} />;
          })
        ) : (
          <EditorContainerDefault />
        )}
      </div>
    </div>
  );
}

export default EditorContainer;
