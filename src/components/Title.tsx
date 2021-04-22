import { FC } from "react";

const Title: FC<{}> = ({ children }) => {
  return (
    <div className="flex justify-center items-center p-0  shadow-md bg-blue-400 dark:bg-gray-700">
      {children}
    </div>
  );
};

export default Title;
