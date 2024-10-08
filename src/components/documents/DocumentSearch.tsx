import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {
  handleSearchTermSubmit: (searchTerm: string) => void;
};

export default function DocumentSearch({ handleSearchTermSubmit }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Document Search
      </label>
      <div className="flex rounded-none">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-none border-primary bg-base-200 focus:border-primary focus:ring-primary sm:text-sm px-4"
            placeholder="Search documents"
            onChange={(e) => {
              setSearchTerm(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearchTermSubmit(e.currentTarget.value);
              }

              // if input is empty, call handleSearchTermSubmit with empty string
              if (e.currentTarget.value === "") {
                handleSearchTermSubmit("");
              }
            }}
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 border border-primary bg-base-200 px-4 py-2 text-sm font-medium text-neutral focus:border-primary focus:ring-primary"
          onClick={(e) => {
            handleSearchTermSubmit(searchTerm);
          }}
        >
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
