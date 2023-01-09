import Link from "next/link";
import EllipsisDropdownMenu from "@/components/ui/EllipsisDropdownMenu";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import { useState } from "react";
import DeleteDocumentConfirmModal from "./DeleteDocumentConfirmModal";

type DocumentCardProps = {
  // TODO: figure out how to type Prisma associations
  document: any;
};

const DropDownMenuActions = {
  DELETE: "delete",
} as const;

const DocumentCard = ({ document }: DocumentCardProps) => {
  const utils = trpc.useContext();
  const [modalOpen, setModalOpen] = useState(false);

  const menuItems = [
    {
      name: "Delete",
      href: `/documents/${document.id}`,
      action: DropDownMenuActions.DELETE,
    },
  ];

  const deleteDocumentMutation = trpc.documents.deleteDocument.useMutation({
    onSuccess: () => {
      utils.documents.getDocumentsBySearch.invalidate();
    },
    onError: () => {
      toast.error("Unable to delete document");
    },
  });

  const handleMenuClick = (action: string) => {
    if (action === DropDownMenuActions.DELETE) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Link
        href={`/documents/${document.id}`}
        className="card basis-1/4 rounded-md border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 cursor-pointer hover:bg-gray-50 hover:border-gray-200"
        key={document.id}
      >
        <div className="document-card-header px-6 py-5 h-1/3 flex items-center">
          <h2 className="font-semibold truncate" title={document.name}>
            {document.name}
          </h2>
        </div>
        <div className="document-card-body px-6 py-5 h-1/3">
          <p className="text-sm">{document.contentModel.displayName}</p>
        </div>
        <div className="border-t border-gray-100" />
        {/* footer */}
        <div className="document-card-footer px-6 py-5 flex justify-between h-1/3">
          <p className="text-sm italic">
            Updated: <span className="text-gray-400 ">1/22/22</span>
          </p>
          <EllipsisDropdownMenu
            menuItems={menuItems}
            onClick={handleMenuClick}
          />
          <DeleteDocumentConfirmModal
            isOpen={modalOpen}
            onDismiss={() => setModalOpen(false)}
            onConfirm={() =>
              document && deleteDocumentMutation.mutate({ id: document.id })
            }
            isLoading={deleteDocumentMutation.isLoading}
          />
        </div>
      </Link>
    </>
  );
};

export default DocumentCard;
