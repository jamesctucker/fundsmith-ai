import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { slugify } from "@/helpers/slugify";

type Props = {
  contentModelId: number;
  contentModelName: string;
  userEmail: string;
};

export const useCreateDocument = () => {
  const mutation = trpc.documents.createDocument.useMutation();
  const router = useRouter();

  const createDocument = ({
    contentModelName,
    contentModelId,
    userEmail,
  }: Props) => {
    mutation.mutate(
      {
        userEmail: userEmail,
        contentModelId: contentModelId,
      },
      {
        onSuccess: (data) => {
          router.push(`/new/${slugify(contentModelName)}/${data.id}`);
        },
      }
    );
  };

  return {
    createDocument,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
