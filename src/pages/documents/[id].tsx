import { trpc } from "@/utils/trpc";
import Document from "@/components/documents/Document";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";

const DocumentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: documentData, error: documentError } =
    trpc.documents.getDocument.useQuery(
      {
        id: Number(id),
      },
      { enabled: !!id }
    );

  const { data: contentModelData, error: contentModelError } =
    trpc.content_models.getContentModel.useQuery(
      {
        id: documentData?.contentModelId as number,
      },
      { enabled: !!documentData }
    );

  return (
    <div>
      <Wrapper title={documentData?.name ? documentData.name : "Your document"}>
        {documentData && contentModelData && (
          <Document
            documentData={documentData}
            contentModelData={contentModelData}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default DocumentPage;
