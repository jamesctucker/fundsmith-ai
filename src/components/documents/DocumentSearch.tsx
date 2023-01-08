type Props = {
  handleSearchTermSubmit: (searchTerm: string) => void;
};

export default function DocumentSearch({ handleSearchTermSubmit }: Props) {
  return (
    <div className="w-full sm:w-1/4">
      <label htmlFor="price" className="sr-only">
        Document Search
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search for a document"
          //   on enter key press, call handleSearchTermSubmit
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
    </div>
  );
}
