import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/clerk-react";
import DocumentCard from "@/components/documents/DocumentCard";
import CreateNewDocumentMenu from "@/components/documents/CreateNewDocumentMenu";
import DocumentSearch from "@/components/documents/DocumentSearch";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const DocumentList = () => {
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");

  const {
    data: documents,
    error: getDocumentError,
    refetch,
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

  useEffect(() => {
    refetch();
  }, [searchText]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="document-list-header flex flex-col sm:flex-row items-center justify-between ">
          <h2 className="text-2xl font-bold pr-4 py-5 mr-4 flex items-center">
            Documents
          </h2>
          <DocumentSearch handleSearchTermSubmit={setSearchText} />
          <CreateNewDocumentMenu />
        </div>
        {/* render flex container of all documents - each document should be a card */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {documents?.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
