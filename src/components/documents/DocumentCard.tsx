// import { Document } from "@prisma/client";
import Link from "next/link";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import EllipsisDropdownMenu from "@/components/ui/EllipsisDropdownMenu";

type DocumentCardProps = {
  // TODO: figure out how to type Prisma associations
  document: any;
};

const DocumentCard = ({ document }: DocumentCardProps) => {
  console.log(document);

  const menuItems = [
    {
      name: "Delete",
      href: `/documents/${document.id}`,
      action: "delete",
      icon: "trash",
    },
  ];

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <Link
        href={`/documents/${document.id}`}
        className="card basis-1/4 rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400 cursor-pointer hover:shadow-md"
        key={document.id}
      >
        <div className="document-card-header px-6 py-5 h-1/3 flex items-center">
          {/* vertically align */}
          <h2 className="font-semibold truncate" title={document.name}>
            {document.name}
          </h2>
        </div>
        {/* divider */}
        <div className="border-t border-gray-300" />
        <div className="document-card-body px-6 py-5 h-1/3">
          <p className="text-sm">{document.contentModel.displayName}</p>
        </div>
        <div className="border-t border-gray-300" />
        {/* footer */}
        <div className="document-card-footer px-6 py-5 flex justify-between h-1/3">
          <p className="text-sm italic">
            Updated: <span className="text-gray-400 ">1/22/22</span>
          </p>
          <EllipsisDropdownMenu menuItems={menuItems} onClick={handleDelete} />
        </div>
      </Link>
    </>
  );
};

export default DocumentCard;
