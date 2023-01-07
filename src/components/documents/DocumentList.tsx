import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

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
        <h1 className="text-2xl font-bold px-4 py-5 sm:p-6 flex items-center">
          Documents
        </h1>
        {/* render flex container of all documents - each document should be a card */}
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {documents?.map((document) => (
            <li
              className="card basis-1/4 rounded-md border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400 cursor-pointer"
              key={document.id}
            >
              <Link href={`/documents/${document.id}`}>
                <p>{document.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentList;
