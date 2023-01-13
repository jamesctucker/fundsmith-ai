import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  variants: string[];
  documentData: any;
};

const SavedVariants = ({ variants, documentData }: Props) => {
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
      className="mt-4 rounded-none overflow-visible bg-base-100 max-w-3xl mx-auto border border-gray-300 shadow-md"
      ref={parent}
    >
      {/* TODO: display a series of random copy saying things like "cooking something up in the kitchen..." */}

      {savedVariants.map((variant, index) => (
        <li key={index} className="hover:bg-base-100">
          <div className="px-4 py-5 sm:p-6 whitespace-pre-line ">{variant}</div>
          {/* word count */}
          <div className="px-4 py-5 sm:p-6 flex justify-between">
            <button
              className="btn-outline text-gray-500 hover:text-white"
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

            <span className="text-gray-500 text-xs">
              {getVariantWordCount(variant)} words
            </span>
          </div>
          {/* divider */}
          {index !== variants.length - 1 && (
            <div className="border-t border-gray-200 p-0" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SavedVariants;
