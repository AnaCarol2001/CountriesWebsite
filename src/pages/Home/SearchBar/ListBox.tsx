import { ArrowUpRight } from "@assets/Icons";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { Country } from "types";

type ListBoxType = {
  activeLiID: string | null;
  setActiveLiID: Dispatch<SetStateAction<string | null>>;
  data: Country[] | undefined;
  isLoading: boolean;
  isListBoxVisible: boolean;
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
  const { activeLiID, data, setActiveLiID, isLoading, isListBoxVisible } =
    props;
  const ulRef = useRef<HTMLUListElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focusFirstLI() {
          const firstLI = ulRef.current?.firstElementChild;
          if (!firstLI) return;
          return setActiveLiID(() => firstLI.id);
        },

        focusNextLI() {
          const activeLIEl = ulRef.current?.querySelector(`#${activeLiID}`);
          const nextLIEl = activeLIEl?.nextElementSibling;
          if (!nextLIEl) return;
          nextLIEl.scrollIntoView(false);
          return setActiveLiID(() => nextLIEl.id);
        },

        focusPreviousLI() {
          const activeLIEl = ulRef.current?.querySelector(`#${activeLiID}`);
          const previousLI = activeLIEl?.previousElementSibling;
          setActiveLiID(() => (previousLI ? previousLI.id : null));
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

  const srOnly = !isListBoxVisible && "sr-only";

  return (
    <div
      className={
        "absolute w-full top-16 max-h-32 overflow-y-auto bg-white dark:bg-dark-elements text-xs sm:text-sm rounded-md overflow-hidden " +
        srOnly
      }
    >
      <div
        aria-live="polite"
        className={data && data?.length > 0 ? "sr-only" : ""}
      >
        <p className="mx-4 py-1.5">
          {isLoading ? <LoadingSpinner /> : data && `${data.length} results`}
        </p>
      </div>
      <ul ref={ulRef} id="search-results" role="listbox">
        {data &&
          data.map((obj) => {
            const countryName = obj.name.official;
            const id = countryName.replace(/\W/g, "");
            return (
              <li
                role="option"
                aria-selected="false"
                key={countryName}
                id={id}
                className={
                  (id === activeLiID ? "listbox-focus" : "") + " listbox-hover"
                }
              >
                <Link
                  tabIndex={-1}
                  to={`countries/${countryName}`}
                  className="flex items-center justify-between mx-4 py-1.5 "
                >
                  <span>{countryName}</span>
                  <ArrowUpRight />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default ListBox;

const LoadingSpinner = () => {
  return (
    <span>
      <span className="sr-only">Loading...</span>
      <span aria-hidden="true" className="relative">
        <span className="block circle border-dark dark:border-white opacity-50"></span>
        <span className="block circle absolute inset-0 border-transparent border-r-dark border-t-dark dark:border-r-white dark:border-t-white  animate-spin"></span>
      </span>
    </span>
  );
};
