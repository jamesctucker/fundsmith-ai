import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  documentData: any;
};

const SavedVariants = ({ documentData }: Props) => {
  const utils = trpc.useContext();
  const [parent] = useAutoAnimate<HTMLUListElement>();
  //   TODO: move to reusable hook
  const unsaveVariant = trpc.documents.unsaveVariant.useMutation({
    onSuccess: () => {
      utils.documents.getDocument.invalidate();
    },
    onError: () => {
      toast.error("Oops, something went wrong");
    },
  });

  //   TODO: also move to reusable hook or util/helper
  const getVariantWordCount = (variant: string) => {
    return variant.split(" ").length;
  };

  const savedVariants: string[] = documentData?.savedVariants;
  return (
    <ul
      className="rounded-none overflow-visible bg-base-100 max-w-3xl mx-auto border-l border-r border-b border-primary shadow-md"
      ref={parent}
    >
      {savedVariants.length < 1 && (
        <div className="h-32 flex justify-center items-center">
          <div className="w-3/4 px-3 py-2 sm:p-2 whitespace-pre-line">
            <p className="text-neutral ">
              No saved copy yet. Click the heart icon to save a copy.
            </p>
          </div>
        </div>
      )}

      {savedVariants?.map((variant, index) => (
        <li key={index} className="hover:bg-base-100">
          <div className="px-4 py-5 sm:p-6 whitespace-pre-line ">{variant}</div>
          {/* word count */}
          <div className="px-4 py-5 sm:p-6 flex justify-between">
            <button
              className="btn-outline"
              onClick={() => {
                unsaveVariant.mutate({
                  id: documentData.id,
                  variant: variant,
                  existingSavedVariants: savedVariants,
                });
              }}
            >
              <SolidHeartIcon className="h-5 w-5 mr-1" />
              Remove
            </button>

            <span className="text-neutral text-xs">
              {getVariantWordCount(variant)} words
            </span>
          </div>
          {/* divider */}
          {index !== savedVariants.length - 1 && (
            <div className="border-t border-primary p-0" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SavedVariants;
