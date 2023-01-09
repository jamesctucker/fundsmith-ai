import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/clerk-react";
import DocumentCard from "@/components/documents/DocumentCard";
import CreateNewDocumentMenu from "@/components/documents/CreateNewDocumentMenu";
import DocumentSearch from "@/components/documents/DocumentSearch";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FolderMinusIcon } from "@heroicons/react/24/outline";

const DocumentList = () => {
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");

  const {
    data: documents,
    error: getDocumentError,
    refetch,
    isFetched,
  } = trpc.documents.getDocumentsBySearch.useQuery(
    {
      searchText: searchText,
      userEmail: user ? user.emailAddresses[0]!.emailAddress : "",
    },
    { enabled: false }
  );

  if (getDocumentError) {
    toast.error("There was an issue fetching your documents");
  }

  const noSearchResults =
    isFetched && searchText !== "" && documents?.length === 0;

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [searchText]);

  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="document-list-header flex flex-col sm:flex-row items-center justify-between ">
        <h2 className="text-2xl font-bold pr-4 py-3 mr-4 flex items-center">
          Documents
        </h2>
        <CreateNewDocumentMenu />
      </div>
      <div className="document-list-search sm:mt-4">
        <DocumentSearch handleSearchTermSubmit={setSearchText} />
      </div>
      {noSearchResults && (
        <div className="text-center h-300">
          <h3 className="mt-2 text-sm font-medium text-neutral">
            Sorry, there were no results.
          </h3>
          <p className="mt-1 text-sm text-gray-500">Try a different search.</p>
        </div>
      )}
      {/* render flex container of all documents - each document should be a card */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mt-3 sm:mt-4">
        {documents &&
          documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
      </div>
    </div>
  );
};

export default DocumentList;
