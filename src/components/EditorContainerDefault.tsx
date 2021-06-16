import React, {FC, useCallback} from 'react';
import EditIcon from '../icons/EditIcon';
const EditorContainerDefault: FC<{onClick: () => void}> = ({onClick}) => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col col-span-2">
      <div>
        <h3 className="dark:text-white text-black text-3xl mb-4 opacity-75 font-extrabold flex">
          Editor Playground... <EditIcon />
        </h3>
      </div>
      <div>
        <p className="text-black tracking-wider dark:text-white">
          Drag a file or
          <button
            onClick={onClick}
            className="outline-none focus:outline-none bg-blue-400 px-2 mx-1 rounded text-white font-semibold shadow dark:bg-gray-500"
          >
            Create new File
          </button>
          to start editing.
        </p>
      </div>
    </div>
  );
};

export default EditorContainerDefault;
