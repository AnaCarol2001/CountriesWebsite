import { createContext, useContext } from "react";

export const HeadingContext = createContext<number | undefined>(undefined);

export const useHeadingContext = () => {
  const hLevel = useContext(HeadingContext);

  if (hLevel === undefined)
    throw new Error("useHeading should be uses inside HeadingContext");

  return hLevel;
};
