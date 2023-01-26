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
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import WordEditor from "@/components/WordEditor";

type DocumentProps = {
  documentData: Document;
  //   TODO: figure out why typing this as ContentModel doesn't work
  contentModelData: any;
};

const Document = ({ documentData, contentModelData }: DocumentProps) => {
  const methods = useForm();

  const [variants, setVariants] = useState<string[]>([]);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [showSaveSuccessIcon, setShowSaveSuccessIcon] =
    useState<boolean>(false);
  const [showSaveSuccessMessage, setShowSaveSuccessMessage] =
    useState<boolean>(false);
  const [showWordEditor, setShowWordEditor] = useState<boolean>(false);

  const updateDocumentMutation = trpc.documents.updateDocument.useMutation();

  const generateVariantsMutation =
    trpc.prompts.generateVariantsByContentModelName.useMutation();

  // watch to see if user has made any changes to the form
  // if so, show the save button
  useEffect(() => {
    methods.watch((data) => {
      setShowSaveSuccessIcon(false);
      setShowSaveSuccessMessage(false);
      setShowSaveButton(true);
    });
  }, [methods]);

  // after 2 seconds, hide the save success message
  useEffect(() => {
    if (showSaveSuccessMessage) {
      setTimeout(() => {
        setShowSaveSuccessMessage(false);
      }, 2000);
    }
  }, [showSaveSuccessMessage]);

  const handleManualSave = () => {
    setShowSaveButton(false);
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
          setShowSaveSuccessIcon(true);
          setShowSaveSuccessMessage(true);
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
    <div className="document flex gap-4">
      <div className="w-full">
        <section className="document-name bg-base-100 max-w-2xl mx-auto rounded-t-none border border-b-0 border-primary shadow-md">
          <h1 className="text-2xl font-bold px-4 py-5 sm:p-6 flex items-center">
            {contentModelData?.name ? contentModelNameFormatted : "Loading..."}
          </h1>
          <div className="border-t border-primary p-0" />
        </section>
        <section className="document-form overflow-hidden rounded-b-none bg-base-100 max-w-2xl mx-auto border border-t-0 border-primary shadow-md">
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
                      cta="Save Your Changes"
                    />
                  )}
                  {updateDocumentMutation.isLoading && (
                    <div className="w-5 h-5 rounded-full animate-spin border-4 border-solid border-neutral border-t-transparent" />
                  )}
                  {showSaveSuccessIcon && (
                    <div className="flex items-center text-neutral">
                      <DocumentCheckIcon
                        className="h-5 w-5"
                        title="All changes saved"
                      />
                      {showSaveSuccessMessage && (
                        <span className="ml-1 text-sm">All changes saved</span>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </section>
        {(variants?.length > 0 || savedVariants) && (
          <section className="variants max-w-2xl mx-auto mt-8">
            <VariantTabs documentData={documentData} variants={variants} />
          </section>
        )}
      </div>
      <button
        className="btn-primary"
        onClick={() => setShowWordEditor(!showWordEditor)}
      >
        {showWordEditor ? "close editor" : "open editor"}
      </button>
      <div
        className={
          showWordEditor
            ? "w-full mx-auto rounded-t-none border border-primary shadow-md"
            : "hidden"
        }
      >
        <WordEditor />
      </div>
    </div>
  );
};

export default Document;
