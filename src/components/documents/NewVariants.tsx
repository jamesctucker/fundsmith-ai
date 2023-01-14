import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type NewVariantsProps = {
  variants: string[];
  documentData: any;
};

const newVariants = ({ variants, documentData }: NewVariantsProps) => {
  const utils = trpc.useContext();
  const [parent] = useAutoAnimate<HTMLUListElement>();

  //   TODO: also move to reusable hook or util/helper
  const getVariantWordCount = (variant: string) => {
    return variant.split(" ").length;
  };

  const savedVariants = documentData?.savedVariants;

  const isVariantSaved = (variant: string) => {
    if (savedVariants) {
      const savedVariantsArray = Object.values(savedVariants);
      return savedVariantsArray.includes(variant);
    }
  };

  //   TODO: move to reusable hook
  const saveVariant = trpc.documents.saveVariant.useMutation({
    onSuccess: () => {
      utils.documents.getDocument.invalidate();
    },
    onError: () => {
      toast.error("Oops, something went wrong");
    },
  });

  const unsaveVariant = trpc.documents.unsaveVariant.useMutation({
    onSuccess: () => {
      utils.documents.getDocument.invalidate();
    },
    onError: () => {
      toast.error("Oops, something went wrong");
    },
  });
  return (
    <ul
      className={
        "rounded-none overflow-visible bg-base-100 max-w-3xl mx-auto border-r border-b border-l border-primary shadow-md min-h-fit"
      }
      ref={parent}
    >
      {/* TODO: display a series of random copy saying things like "cooking something up in the kitchen..." */}

      {variants.length < 1 && (
        <div className="h-32 flex justify-center items-center">
          <div className="w-3/4 px-3 py-2 sm:p-2 whitespace-pre-line">
            <p className="text-neutral ">
              No copy generated yet. Click the "Get Your Copy" button to get
              started.
            </p>
          </div>
        </div>
      )}

      {variants?.map((variant, index) => (
        <li key={index} className="hover:bg-base-100">
          <div className="px-4 py-5 sm:p-6 whitespace-pre-line ">{variant}</div>
          {/* word count */}
          <div className="px-4 py-5 sm:p-6 flex justify-between">
            {isVariantSaved(variant) ? (
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
                saved
              </button>
            ) : (
              <button
                className="btn-outline"
                onClick={() => {
                  saveVariant.mutate({
                    id: documentData.id,
                    variant: variant,
                    existingSavedVariants: savedVariants,
                  });
                }}
              >
                <OutlinedHeartIcon className="h-5 w-5 mr-1" />
                save
              </button>
            )}

            <span className="text-neutral text-xs">
              {getVariantWordCount(variant)} words
            </span>
          </div>
          {/* divider */}
          {index !== variants.length - 1 && (
            <div className="border-t border-primary p-0" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default newVariants;
