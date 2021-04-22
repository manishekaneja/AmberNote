import React from "react";
import EditIcon from "../icons/EditIcon";
function EditorContainerDefault() {
  return (
    <div className="h-full w-full flex items-center justify-center col-span-2">
      <h3 className=" dark:text-white text-black text-3xl h-20 mb-10 opacity-75 font-extrabold flex">
        Edit Here ... <EditIcon />
      </h3>
    </div>
  );
}

export default EditorContainerDefault;
