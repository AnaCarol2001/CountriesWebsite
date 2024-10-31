import Search from "@components/Search";
import { useSearchParams } from "react-router-dom";

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get("region");

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setSearchParams({});
      return;
    }

    return setSearchParams({ region: e.target.value });
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between my-6  md:my-11 gap-10">
      <Search />
      <div>
        <label htmlFor="filter" className="sr-only">
          Select a region:
        </label>
        <select
          name="filter"
          id="filter"
          defaultValue={region || ""}
          className="p-3 md:p-4 bg-white dark:bg-dark-elements text-xs sm:text-sm rounded-md shadow-sm  cursor-pointer"
          onChange={handleRegionChange}
        >
          <option value="" disabled>
            Filter by Region
          </option>
          <option value="all">All</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}
