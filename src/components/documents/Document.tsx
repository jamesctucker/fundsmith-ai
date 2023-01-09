import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-model/DefaultFields";
import { useForm, FormProvider } from "react-hook-form";
import { Document, Prisma } from "@prisma/client";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SavedResponses } from "@/types/types";
import NewVariants from "@/components/documents/NewVariants";
import VariantTabs from "@/components/documents/VariantTabs";

type DocumentProps = {
  documentData: Document;
  //   TODO: figure out why typing this as ContentModel doesn't work
  contentModelData: any;
};

const Document = ({ documentData, contentModelData }: DocumentProps) => {
  const methods = useForm();

  const [variants, setVariants] = useState<string[]>([]);

  const updateDocument = trpc.documents.updateDocument.useMutation();
  const generateVariants = trpc.prompts.generateVariants.useMutation();

  const onSubmit = (data: any) => {
    generateVariants.mutate(
      {
        content_type: contentModelData.name,
        organization_name: data.organization_name,
        support_description: data.support_description,
        supported_project: data.supported_project,
        tone: data.tone,
        max_tokens: 1000,
        n: Number(data.numberOfVariants),
      },
      {
        onSuccess: (data) => {
          setVariants(data.variants);
        },
      }
    );

    // save document
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
        id: documentData.id,
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
      <div className="bg-white max-w-3xl mx-auto rounded-t-md border border-b-0 border-gray-300">
        <h1 className="text-2xl font-bold px-4 py-5 sm:p-6 flex items-center">
          {contentModelData?.name ? contentModelNameFormatted : "Loading..."}
        </h1>
        <div className="border-t border-gray-200 p-0" />
      </div>
      <div className="overflow-hidden rounded-b-md bg-white max-w-3xl mx-auto border border-t-0 border-gray-300">
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
      {(variants?.length > 0 || savedVariants) && (
        <div className="max-w-3xl mx-auto">
          <VariantTabs documentData={documentData} variants={variants} />
        </div>
      )}
    </>
  );
};

export default Document;
