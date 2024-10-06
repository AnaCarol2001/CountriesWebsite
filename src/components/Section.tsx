import React from "react";
import { HeadingContext, useHeadingContext } from "@contexts/headingContext";

type Section = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function Section({
  children,
  as = "section",
  ...props
}: Section) {
  const headingLevel = useHeadingContext();

  return (
    <HeadingContext.Provider value={headingLevel + 1}>
      {React.createElement(as, { ...props }, children)}
    </HeadingContext.Provider>
  );
}
