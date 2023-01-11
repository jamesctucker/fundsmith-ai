import { trpc } from "../../utils/trpc";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useCreateDocument } from "@/hooks/useCreateDocument";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ContentModelList = () => {
  const { user } = useUser();
  const userEmail = user ? user.emailAddresses[0]!.emailAddress : "";
  const [parent, enableAnimations] = useAutoAnimate<HTMLUListElement>();

  const contentModels = trpc.content_models.getContentModels.useQuery();

  const { createDocument, error: mutationError } = useCreateDocument();

  if (mutationError) {
    toast.error("Something went wrong");
  }

  return (
    <ul
      className="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-3 sm:mt-4"
      ref={parent}
    >
      {contentModels.data?.map((contentModel) => (
        <li
          key={contentModel.id}
          className="card rounded-md border basis-1/4 h-64 border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:bg-gray-50 hover:border-gray-200 cursor-pointer"
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
