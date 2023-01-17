import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-model/DefaultFields";
import { useForm, FormProvider } from "react-hook-form";
import { Document, Prisma } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SavedResponses } from "@/types/types";
import VariantTabs from "@/components/documents/VariantTabs";
import SubmitButton from "@/components/SubmitButton";

type DocumentProps = {
  documentData: Document;
  //   TODO: figure out why typing this as ContentModel doesn't work
  contentModelData: any;
};

const Document = ({ documentData, contentModelData }: DocumentProps) => {
  const methods = useForm();

  const [variants, setVariants] = useState<string[]>([]);

  const updateDocumentMutation = trpc.documents.updateDocument.useMutation();
  const generateVariantsMutation =
    trpc.prompts.generateVariantsByContentModelName.useMutation();

  const onSubmit = () => {
    generateVariants();
    saveDocument();
  };

  // TODO: type this function
  const saveDocument = () => {
    const data = methods.getValues();
    const savedResponses: SavedResponses = {
      ...data,
      tone: data.tone,
      numberOfVariants: data.numberOfVariants,
    };

    updateDocumentMutation.mutate(
      {
        id: documentData.id,
        name: data.documentName,
        savedResponses: savedResponses,
      },
      {
        onSuccess: () => {
          toast.success("Document saved");
        },
        // onError: (error) => {
        //   toast.error(error.message);
        // },
      }
    );
  };

  const generateVariants = () => {
    const data = methods.getValues();

    generateVariantsMutation.mutate(
      {
        content_model_name: contentModelData.name,
        responses:
          Object.keys(data).length === 0 ? documentData.savedResponses : data,
        max_tokens: Number(contentModelData.rules.maxTokens),
      },
      {
        onSuccess: (result) => {
          setVariants(result.variants);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const savedVariants = documentData?.savedVariants as Prisma.JsonObject;

  const contentModelNameFormatted = contentModelData?.name
    ?.replace(/_/g, " ")
    ?.replace(/-/g, " ")
    ?.replace(
      /\w\S*/g,
      (txt: any) => txt.charAt(0).toUpperCase() + txt.substr(1)
    );

  return (
    <>
      <div className="bg-base-100 max-w-3xl mx-auto rounded-t-none border border-b-0 border-primary shadow-md">
        <h1 className="text-2xl font-bold px-4 py-5 sm:p-6 flex items-center">
          {contentModelData?.name ? contentModelNameFormatted : "Loading..."}
        </h1>
        <div className="border-t border-primary p-0" />
      </div>
      <div className="overflow-hidden rounded-b-none bg-base-100 max-w-3xl mx-auto border border-t-0 border-primary shadow-md">
        <div className="px-4 py-5 sm:p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <DefaultFields documentData={documentData} />
              {contentModelData && (
                <ParameterForm
                  parameters={contentModelData.parameters}
                  documentData={documentData}
                />
              )}

              <div className="mt-6 flex items-center justify-between">
                <SubmitButton
                  loading={generateVariantsMutation.isLoading}
                  cta="Get Your Copy"
                />
                <button
                  type="button"
                  className="border-b border-primary hover:text-secondary hover:border-secondary hover:-translate-y-1 transition ease-in-out delay-50"
                  onClick={saveDocument}
                >
                  save your changes
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      {(variants?.length > 0 || savedVariants) && (
        <div className="max-w-3xl mx-auto">
          <VariantTabs documentData={documentData} variants={variants} />
        </div>
      )}
    </>
  );
};

export default Document;
