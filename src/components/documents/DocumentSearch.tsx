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
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Search for a document"
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
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
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
