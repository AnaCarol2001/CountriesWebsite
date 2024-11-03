import { X } from "@assets/Icons";
import { useSearchParams } from "react-router-dom";

export default function FilterByRegion() {
  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get("region") || "";

  const handleRegionChange = (value: string) => {
    if (value === "") {
      searchParams.delete("region");
      setSearchParams(searchParams);
      return;
    }
    return setSearchParams({ region: value });
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="filter" className="sr-only">
        Select a region:
      </label>
      <select
        name="filter"
        id="filter"
        value={region}
        className="p-3 md:p-4 bg-white dark:bg-dark-elements text-xs sm:text-sm rounded-md shadow-sm  cursor-pointer md:order-2"
        onChange={(e) => handleRegionChange(e.target.value)}
      >
        <option value="" disabled>
          Filter by Region
        </option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
      {region && (
        <button
          type="button"
          onClick={() => handleRegionChange("")}
          className="md:order-1"
        >
          <span className="sr-only">Clear region filter</span> <X />
        </button>
      )}
    </div>
  );
}
