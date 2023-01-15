import { trpc } from "../../utils/trpc";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useCreateDocument } from "@/hooks/useCreateDocument";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ContentModelList = () => {
  const { user } = useUser();
  const userEmail = user ? user.emailAddresses[0]!.emailAddress : "";
  const [parent] = useAutoAnimate<HTMLUListElement>();

  const contentModels = trpc.content_models.getContentModels.useQuery();

  const { createDocument, error: mutationError } = useCreateDocument();

  if (mutationError) {
    toast.error("Something went wrong");
  }

  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-3 sm:mt-4"
      ref={parent}
    >
      {contentModels.data?.map((contentModel) => (
        <li
          key={contentModel.id}
          className="card rounded-none border basis-1/4 h-64 border-primary bg-base-200 px-6 py-5 shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:bg-base-100 hover:border-primary cursor-pointer hover:-translate-y-1"
        >
          <a
            onClick={() =>
              createDocument({
                contentModelName: contentModel.displayName,
                contentModelId: contentModel.id,
                userEmail: userEmail,
              })
            }
          >
            <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
              ✏️
            </div>
            <div className="pt-5">
              <h2 className="text-md font-bold mb-2">
                {contentModel.displayName}
              </h2>
              <p className="text-xs">{contentModel.description}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ContentModelList;
