import { ArrowUpRight } from "@assets/Icons";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Link } from "react-router-dom";
import { Country } from "types";

type ListBoxType = {
  activeLiID: string | null;
  setActiveLiID: (v: string | null) => void;
  data: Country[] | undefined;
  isLoading: boolean;
};

export type ListBoxRefMethodsType = {
  focusFirstLI: () => void;
  focusNextLI: () => void;
  focusPreviousLI: () => void;
  clickActiveLI: () => void;
};

const ListBox = forwardRef<ListBoxRefMethodsType, ListBoxType>(function (
  props,
  ref
) {
  const { activeLiID, data, setActiveLiID, isLoading } = props;
  const ulRef = useRef<HTMLUListElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focusFirstLI() {
          const firstLI = ulRef.current?.firstElementChild;
          if (!firstLI) return;
          return setActiveLiID(firstLI.id);
        },

        focusNextLI() {
          const activeLIEl = ulRef.current?.querySelector(`#${activeLiID}`);
          const nextLIEl = activeLIEl?.nextElementSibling;
          if (!nextLIEl) return;
          nextLIEl.scrollIntoView(false);
          return setActiveLiID(nextLIEl.id);
        },

        focusPreviousLI() {
          const activeLIEl = ulRef.current?.querySelector(`#${activeLiID}`);
          const previousLI = activeLIEl?.previousElementSibling;
          setActiveLiID(previousLI ? previousLI.id : null);
          previousLI?.scrollIntoView(false);
        },
        clickActiveLI() {
          const activeLIEl = ulRef.current?.querySelector(`#${activeLiID}`);
          if (!activeLIEl) return;
          activeLIEl.querySelector("a")?.click();
        },
      };
    },
    [activeLiID, setActiveLiID]
  );

  if (isLoading) {
    return (
      <ul
        role="listbox"
        aria-label="countries"
        className="absolute w-full top-16 max-h-32 overflow-y-auto bg-white dark:bg-dark-elements text-xs sm:text-sm rounded-md overflow-hidden"
      >
        <li className="mx-4 py-1.5 ">Loading...</li>
      </ul>
    );
  }

  return (
    <ul
      ref={ulRef}
      id="search-results"
      role="listbox"
      aria-label="countries"
      className="absolute w-full top-16 max-h-32 overflow-y-auto bg-white dark:bg-dark-elements text-xs sm:text-sm rounded-md overflow-hidden"
    >
      {data ? (
        data.map((obj) => {
          const countryName = obj.name.official;
          const id = countryName.replace(/\W/g, "");
          return (
            <li
              key={countryName}
              id={id}
              className={
                (id === activeLiID ? "listbox-focus" : "") + " listbox-hover"
              }
            >
              <Link
                to={`countries/${countryName}`}
                role="option"
                tabIndex={-1}
                className="flex items-center justify-between mx-4 py-1.5 "
              >
                <span>{countryName}</span>
                <ArrowUpRight />
              </Link>
            </li>
          );
        })
      ) : (
        <li className="italic mx-4 py-1.5">No results</li>
      )}
    </ul>
  );
});

export default ListBox;
