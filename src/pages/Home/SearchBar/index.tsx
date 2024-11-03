import InputSearch from "@pages/Home/SearchBar/Input";
import ListBox, { ListBoxRefMethodsType } from "@pages/Home/SearchBar/ListBox";
import useDebounce from "@hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@util/fetchData";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Country } from "types";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputInitialValue = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(inputInitialValue);
  const listBoxRef = useRef<ListBoxRefMethodsType>(null);
  const [isListBoxOpen, seIstListBoxOpen] = useState(false);
  const [activeLiID, setActiveLiID] = useState<string | null>(null);

  const searchValue = useDebounce(inputValue);
  const { data, isLoading } = useQuery({
    queryKey: ["countries", "searchField", searchValue],
    queryFn: () => fetchData<Country[]>(`name/${searchValue}?fields=name`),
    staleTime: Infinity,
    enabled: !!searchValue,
  });

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!isListBoxOpen && value) return seIstListBoxOpen(true);
    if (!value) {
      seIstListBoxOpen(false);
      if (searchParams.get("search")) {
        searchParams.delete("search");
        setSearchParams(searchParams);
        return;
      }
    }
  };

  const handleKeyEvents = (e: React.KeyboardEvent) => {
    const validKeys = ["ArrowDown", "ArrowUp", "Escape", "Enter", "Space"];
    if (!validKeys.includes(e.code)) return;

    e.preventDefault();
    e.stopPropagation();
    switch (e.code) {
      case "ArrowDown": {
        if (!activeLiID) return listBoxRef.current?.focusFirstLI();
        listBoxRef.current?.focusNextLI();
        break;
      }
      case "ArrowUp": {
        if (!activeLiID) return;
        listBoxRef.current?.focusPreviousLI();
        break;
      }
      case "Space":
      case "Enter": {
        if (!activeLiID && data && data?.length > 0) {
          setSearchParams({ search: inputValue });
          seIstListBoxOpen(false);
          return;
        }

        if (activeLiID) listBoxRef.current?.clickActiveLI();
        break;
      }
      case "Escape": {
        if (isListBoxOpen) return seIstListBoxOpen(false);
        handleInputChange("");
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      className="relative w-full max-w-md grid items-center gap-2 py-1.5 sm:py-2"
      onKeyDown={handleKeyEvents}
    >
      <InputSearch
        value={inputValue}
        setValue={handleInputChange}
        activeLiId={activeLiID}
      />
      {isListBoxOpen && (
        <ListBox
          ref={listBoxRef}
          activeLiID={activeLiID}
          data={data}
          setActiveLiID={setActiveLiID}
          isLoading={isLoading || !searchValue}
        />
      )}
    </div>
  );
}
