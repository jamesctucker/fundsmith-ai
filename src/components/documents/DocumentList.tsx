import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/clerk-react";
import DocumentCard from "@/components/documents/DocumentCard";
import CreateNewDocumentMenu from "@/components/documents/CreateNewDocumentMenu";

const DocumentList = () => {
  const { user } = useUser();
  const { data: documents, error } = trpc.documents.getDocuments.useQuery(
    {
      userEmail: user ? user.emailAddresses[0]!.emailAddress : "",
    },
    { enabled: !!user }
  );

  return (
    <div>
      <div className="flex flex-col">
        <div className="document-list-header flex items-center justify-between">
          <h2 className="text-2xl font-bold pr-4 py-5 flex items-center">
            Documents
          </h2>
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
