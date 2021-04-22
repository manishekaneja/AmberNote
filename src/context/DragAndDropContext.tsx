import { createContext } from "react";

export const DargAndDropContext = createContext<{
  isDragged: boolean;
  isAllowed: boolean;
  setIsDragged: (isDragged: boolean, isAllowed: boolean) => void;
}>({
  isDragged: false,
  isAllowed: true,
  setIsDragged: () => {},
});
