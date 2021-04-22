import { motion } from "framer-motion";
import React, { FC, useRef, useState } from "react";
import SidebarMinimizeIcon from "../icons/SidebarMinimizeIcon";

const DragableContainer: FC<{
  side: React.ReactNode;
}> = ({ children, side }) => {
  const [width, setWidth] = useState(350);
  const canResize = useRef(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  return (
    <div
      className="h-screen w-screen flex justify-start items-stretch"
      onMouseMove={(event) => {
        if (!canResize.current) {
          return;
        }
        setWidth(Math.min(Math.max(event.clientX, 300), 450));
      }}
      onMouseUp={() => {
        canResize.current = false;
      }}
    >
      <motion.div
        transition={{
          width: {
            ease: "linear",
          },
        }}
        animate={isMinimized ? { width: 0 } : { width: width }}
        className={`h-full bg-gray-100 dark:bg-gray-700 overflow-auto shadow-2xl flex flex-col items-stretch justify-start transition duration-100 ${
          isMinimized ? " overflow-hidden  " : " "
        } `}
      >
        <div className="flex-1 flex flex-col">{side}</div>
        <div
          className={`h-12 items-center bg-blue-500 dark:bg-gray-700 px-2 py-2 flex  justify-end `}
        >
          <button
            onClick={() => {
              setIsMinimized(true);
            }}
          >
            <SidebarMinimizeIcon />
          </button>
        </div>
      </motion.div>
      <div
        onClick={() => {
          setIsMinimized(false);
        }}
        style={{ cursor: "col-resize" }}
        onMouseDown={() => {
          canResize.current = true;
        }}
        className="bg-gray-200 z-20 dark:bg-gray-900 w-3 shadow-2xl flex items-center justify-center"
      >
        <div className="bg-blue-400 dark:bg-gray-500 rounded w-2 h-8 shadow-md"></div>
      </div>
      <motion.div
        transition={{
          width: {
            ease: "linear",
          },
        }}
        className="h-full shadow-md overflow-auto flex-1 flex items-stretch justify-start  "
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DragableContainer;
