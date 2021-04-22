import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import ConfirmIcon from "../icons/ConfirmIcon";
const TitleInput: FC<{
  defaultEditableInput: string;
  fallback: React.ReactNode;
  isEditable: boolean;
  onSubmit: (title: string) => void;
}> = ({ defaultEditableInput, fallback, isEditable, onSubmit }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(defaultEditableInput);
  }, [defaultEditableInput]);
  return (
    <Fragment>
      {isEditable ? (
        <>
          <div className="flex-1 flex flex-col">
            <input
              ref={inputRef}
              className="font-bold text-xl w-full flex-1 placeholder-current dark:placeholder-white dark:text-white py-2 px-2 bg-white bg-opacity-20"
              value={title}
              placeholder="Specify Title for Note"
              onChange={({ target: { value } }) => {
                if (value.trim().length <= 0) {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
                setTitle(value);
              }}
            />
            {isError && (
              <p className="px-2 m-0 p-0 bg-white bg-opacity-20 text-xs">
                **Empty Names not Allowed
              </p>
            )}
          </div>
          <button
            className="px-5 py-2 text-white bg-blue-400 focus:outline-none flex items-center justify-center"
            onClick={() => {
              if (title.length <= 0) {
                setIsError(true);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
                return;
              } else {
                setTitle("");
                onSubmit(title.trim());
              }
            }}
          >
            <ConfirmIcon />
          </button>
        </>
      ) : (
        <>{fallback}</>
      )}
    </Fragment>
  );
};

export default TitleInput;
