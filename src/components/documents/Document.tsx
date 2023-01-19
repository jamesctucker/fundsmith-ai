import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-model/DefaultFields";
import { useForm, FormProvider } from "react-hook-form";
import { Document, Prisma } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { SavedResponses } from "@/types/types";
import VariantTabs from "@/components/documents/VariantTabs";
import SubmitButton from "@/components/SubmitButton";
import SaveButton from "@/components/SaveButton";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type DocumentProps = {
  documentData: Document;
  //   TODO: figure out why typing this as ContentModel doesn't work
  contentModelData: any;
};

const Document = ({ documentData, contentModelData }: DocumentProps) => {
  const methods = useForm();

  const [variants, setVariants] = useState<string[]>([]);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const updateDocumentMutation = trpc.documents.updateDocument.useMutation();

  const generateVariantsMutation =
    trpc.prompts.generateVariantsByContentModelName.useMutation();

  // watch to see if user has made any changes to the form
  // if so, show the save button
  useEffect(() => {
    methods.watch((data) => {
      setShowSaveButton(true);
    });
  }, [methods]);

  const handleManualSave = () => {
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
        onSuccess: (result: any) => {
          toast.success("Document saved!");
          setVariants(result.variants);
          setShowSaveButton(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleGenerateVariants = () => {
    methods.handleSubmit((data) => {
      generateVariantsMutation.mutate(
        {
          content_model_name: contentModelData.name,
          responses:
            Object.keys(data).length === 0 ? documentData.savedResponses : data,
          max_tokens: Number(contentModelData.rules.maxTokens),
        },
        {
          onSuccess: (result: any) => {
            setVariants(result.variants);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    })();
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
            <form onSubmit={methods.handleSubmit(handleGenerateVariants)}>
              <DefaultFields documentData={documentData} />

              <ParameterForm
                parameters={contentModelData.parameters}
                documentData={documentData}
              />

              <div className="mt-6 flex items-center justify-between">
                <SubmitButton
                  loading={generateVariantsMutation.isLoading}
                  cta="Get Your Copy"
                />
                {showSaveButton && (
                  <SaveButton
                    onClick={handleManualSave}
                    cta="Save your changes"
                  />
                )}
                {!showSaveButton && (
                  <div className="flex flex-row items-center bg-secondary py-1 px-3 shadow-sm">
                    <CheckCircleIcon className="h-6 w-6 mr-2 text-base-100" />
                    <p className="text-sm text-base-100">Changes Saved</p>
                  </div>
                )}
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
