import { trpc } from "../../utils/trpc";
import { slugify } from "@/helpers/slugify";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const ContentModelList = () => {
  const { user } = useUser();
  const router = useRouter();
  const contentModels = trpc.content_models.getContentModels.useQuery();
  const createDocument = trpc.documents.createDocument.useMutation();

  const handleCreateDocument = (
    contentModelName: string,
    contentModelId: number
  ) => {
    if (!user) {
      toast.error("Sorry, something went wrong.");
      return;
    }

    createDocument.mutate(
      {
        userEmail: user.emailAddresses[0]!.emailAddress,
        contentModelId: contentModelId,
      },
      {
        onSuccess: (data) => {
          router.push(`/new/${slugify(contentModelName)}/${data.id}`);
        },
      }
    );
  };

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {contentModels.data?.map((contentModel) => (
        <li key={contentModel.id}>
          <a
            className="card basis-1/4 rounded-md border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400 cursor-pointer"
            onClick={() =>
              handleCreateDocument(contentModel.name, contentModel.id)
            }
          >
            <figure>
              <img src="https://placeimg.com/300/175/nature" alt="nature" />
            </figure>
            <div className="pt-5">
              <h2 className="text-base font-bold">
                {contentModel.displayName}
              </h2>
              <p className="text-sm">{contentModel.description}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ContentModelList;
