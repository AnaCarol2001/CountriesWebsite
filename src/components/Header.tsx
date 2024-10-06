import { Moon, MoonFill } from "@assets/Icons";
import useToggleTheme from "@hooks/useToggleTheme";

export default function Header() {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <header className="bg-white dark:bg-dark-elements w-full shadow-sm">
      <div className="flex justify-between items-center mx-4 md:mx-20 py-6">
        <span className="font-extrabold text-sm sm:text-2xl">
          Where in the world?
        </span>
        <button
          type="button"
          aria-label={theme}
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs sm:text-base"
        >
          {theme == "light" ? <Moon /> : <MoonFill />}
          Dark Mode
        </button>
      </div>
    </header>
  );
}
