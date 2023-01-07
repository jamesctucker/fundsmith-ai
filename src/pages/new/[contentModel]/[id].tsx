import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import Document from "@/components/documents/Document";

const NewPage = () => {
  const router = useRouter();
  const contentModelName = router.query.contentModel as string;
  const documentId = Number(router.query.id);

  // get the parameters for the content model
  const { data: contentModelData, error } =
    trpc.content_models.getContentModelParametersByName.useQuery(
      {
        name: contentModelName,
      },
      { enabled: !!contentModelName }
    );

  if (error) {
    toast.error("Oops, something went wrong");
  }

  // get data from freshly-created document
  const { data: documentData, error: documentError } =
    trpc.documents.getDocument.useQuery(
      {
        id: documentId,
      },
      { enabled: !!documentId }
    );

  return (
    <>
      {documentData && (
        <Document
          documentData={documentData}
          contentModelData={contentModelData}
        />
      )}
    </>
  );
};

export default NewPage;
