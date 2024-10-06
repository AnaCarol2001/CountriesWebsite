import { createElement } from "react";
import { useHeadingContext } from "@contexts/headingContext";

type Heading = {
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ children, ...props }: Heading) {
  const hLevel = useHeadingContext();
  const validLevels = [1, 2, 3, 4, 5, 6];

  const element = validLevels.includes(hLevel) ? "h" + hLevel : "p";

  const H = createElement(element, props, children);

  return H;
}
