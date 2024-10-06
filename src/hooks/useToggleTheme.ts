import { useEffect, useState } from "react";

export default function useToggleTheme(): {
  theme: string;
  toggleTheme: () => void;
} {
  const savedTheme =
    localStorage.getItem("theme") || windowPrefersColorScheme();

  const [theme, setTheme] = useState(savedTheme);

  const toggleTheme = () => {
    if (theme == "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    if (theme == "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    console.log("useEffect");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
}

const windowPrefersColorScheme = () => {
  return window.matchMedia("(prefers-color-scheme : dark)").matches
    ? "dark"
    : "light";
};
