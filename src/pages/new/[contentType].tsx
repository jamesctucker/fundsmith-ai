import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-type/DefaultFields";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

const NewPage = () => {
  const methods = useForm();
  const router = useRouter();
  const contentTypeName = router.query.contentType as string;
  const [variants, setVariants] = useState<string[]>([]);

  const { data, error } = trpc.content_types.getContentTypeParameters.useQuery(
    {
      name: contentTypeName,
    },
    { enabled: !!contentTypeName }
  );

  if (error) {
    toast.error("Oops, something went wrong");
  }

  // trpc mutation that calls generateVariants in the prompt.tsx router
  const generateVariants = trpc.prompts.generateVariants.useMutation();

  const onSubmit = (data: any) => {
    console.log(data);

    generateVariants.mutate(
      {
        content_type: contentTypeName,
        organization_name: data.organization_name,
        support_description: data.support_description,
        supported_project: data.supported_project,
        tone: data.tone,
        // prompt: "Who is Abraham Lincoln?",
        max_tokens: 1000,
        n: Number(data.numberOfVariants),
      },
      {
        onSuccess: (data) => {
          console.log("data", data);
          setVariants(data.variants);
        },
      }
    );
  };

  return (
    <>
      <div className="overflow-hidden rounded-md bg-white max-w-3xl mx-auto shadow-md">
        {/* TODO: add document's content-type at the top */}
        <div className="px-4 py-5 sm:p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {data && <DefaultFields />}
              {data && <ParameterForm parameters={data.parameters} />}
              <button className=" btn-primary my-2" type="submit">
                Generate
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
      {/* list of variation results */}
      <div className="overflow-visible rounded-md bg-white mt-4 max-w-3xl mx-auto shadow-md">
        <div className="px-4 py-5 sm:p-6">
          {/* TODO: display a series of random copy saying things like "cooking something up in the kitchen..." */}
          {generateVariants.isLoading && <p>Loading...</p>}
          {variants.length > 0 && (
            <ul>
              {variants.map((variant, index) => (
                <li key={index}>{variant}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPage;
