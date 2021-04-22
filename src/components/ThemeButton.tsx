import React, { useEffect, useState } from "react";
import ThemeIcon from "../icons/ThemeIcon";
function ThemeButton() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <button
      className="px-5 py-2 focus:outline-none"
      onClick={() => {
        if (
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.remove("dark");
          localStorage.removeItem("theme");
          setIsDark(false);
        } else {
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";
          setIsDark(true);
        }
      }}
    >
      <ThemeIcon dark={isDark} />
    </button>
  );
}

export default ThemeButton;
