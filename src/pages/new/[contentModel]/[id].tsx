import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-model/DefaultFields";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { SavedResponses } from "@/types/types";

const NewPage = () => {
  const methods = useForm();
  const router = useRouter();
  const contentModelName = router.query.contentModel as string;
  const documentId = Number(router.query.id);
  const [variants, setVariants] = useState<string[]>([]);

  // get the parameters for the content model
  const { data, error } =
    trpc.content_models.getContentModelParameters.useQuery(
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

  const updateDocument = trpc.documents.updateDocument.useMutation();
  const generateVariants = trpc.prompts.generateVariants.useMutation();

  const onSubmit = (data: any) => {
    console.log("data", data);
    // generateVariants.mutate(
    //   {
    //     content_type: contentModelName,
    //     organization_name: data.organization_name,
    //     support_description: data.support_description,
    //     supported_project: data.supported_project,
    //     tone: data.tone,
    //     max_tokens: 1000,
    //     n: Number(data.numberOfVariants),
    //   },
    //   {
    //     onSuccess: (data) => {
    //       setVariants(data.variants);
    //     },
    //   }
    // );

    const savedResponses: SavedResponses = {
      organization_name: data.organization_name,
      support_description: data.support_description,
      supported_project: data.supported_project,
      tone: data.tone,
      numberOfVariants: data.numberOfVariants,
    };

    // update document
    updateDocument.mutate(
      {
        id: documentId,
        name: data.documentName,
        savedResponses: savedResponses,
      },
      {
        onSuccess: () => {
          toast.success("Document saved");
        },
      }
    );
  };
  // End variant generation

  const contentModelNameFormatted = contentModelName
    ?.replace(/_/g, " ")
    ?.replace(/-/g, " ")
    ?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));

  return (
    <>
      <div className="bg-white max-w-3xl mx-auto rounded-t-md">
        <h1 className="text-2xl font-bold px-4 py-5 sm:p-6 flex items-center">
          {contentModelName ? contentModelNameFormatted : "Loading..."}
        </h1>
        <div className="border-t border-gray-200 p-0" />
      </div>
      <div className="overflow-hidden rounded-b-md bg-white max-w-3xl mx-auto shadow-md">
        <div className="px-4 py-5 sm:p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {data && <DefaultFields documentData={documentData} />}
              {data && (
                <ParameterForm
                  parameters={data.parameters}
                  documentData={documentData}
                />
              )}
              <button
                className=" btn-primary mt-4 sm:mt-6 md:mt-8"
                type="submit"
              >
                Generate
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
      {/* TODO: move to separate component */}
      {/* list of variation results */}
      {variants.length > 0 && (
        <ul className="mt-4 rounded-md overflow-visible bg-white max-w-3xl mx-auto shadow-md">
          {/* TODO: display a series of random copy saying things like "cooking something up in the kitchen..." */}
          {generateVariants.isLoading && <p>Loading...</p>}

          {variants.map((variant, index) => (
            <li key={index} className="hover:bg-base-100">
              <div className="px-4 py-5 sm:p-6">{variant}</div>
              {/* divider */}
              {index !== variants.length - 1 && (
                <div className="border-t border-gray-200 p-0" />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NewPage;
