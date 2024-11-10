import { Search } from "@assets/Icons";

type InputSearchType = {
  value: string;
  setValue: (v: string) => void;
  activeLiId: string | null;
  isListBoxOpen: boolean;
};

export default function InputSearch({
  value,
  setValue,
  activeLiId,
  isListBoxOpen,
}: InputSearchType) {
  return (
    <div className="flex bg-white dark:bg-dark-elements pl-4 py-1 rounded-md shadow-sm">
      <label htmlFor="search" className="flex gap-2 items-center mr-4">
        <Search />
        <span className="sr-only">Search for a country</span>
      </label>
      <input
        id="search"
        name="search"
        type="search"
        role="combobox"
        aria-controls="search-results"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-expanded={isListBoxOpen}
        aria-activedescendant={activeLiId ? activeLiId : ""}
        placeholder="Search for a country..."
        className="bg-transparent p-1.5 md:py-2 text-xs sm:text-sm w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
