import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useInfiniteScroll<T>(
  data: T[] | undefined,
  itemsPerPage = 5
) {
  const [displayData, setDisplayData] = useState<T[]>([]);
  const lastElementObserver = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

  const displayMoreItems = useCallback(() => {
    if (!data) return;
    setDisplayData((prev) => {
      let newData = [];
      if (data.length === prev.length) return data;
      if (data.length <= prev.length + itemsPerPage) return data;
      else newData = data.slice(prev.length, prev.length + itemsPerPage);
      return [...prev, ...newData];
    });
  }, [data, setDisplayData, itemsPerPage]);

  const lastElementRef = useCallback(
    (node: HTMLElement) => {
      if (lastElementObserver.current) lastElementObserver.current.disconnect();

      lastElementObserver.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) displayMoreItems();
        },
        { root: null, rootMargin: "0px 0px 200px" }
      );
      if (node) lastElementObserver.current.observe(node);
    },
    [displayMoreItems]
  );

  useEffect(() => {
    if (data) {
      setDisplayData(() => []); // Reset display data if location changes
      displayMoreItems();
    }
  }, [location, displayMoreItems, setDisplayData, data]);

  return { displayData, lastElementRef };
}
