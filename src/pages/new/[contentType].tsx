import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-type/DefaultFields";
import { useForm, FormProvider } from "react-hook-form";

const NewPage = () => {
  const methods = useForm();
  const router = useRouter();
  const contentTypeName = router.query.contentType as string;

  const { data, error } = trpc.content_types.getContentTypeParameters.useQuery(
    {
      name: contentTypeName,
    },
    { enabled: !!contentTypeName }
  );

  if (error) {
    toast.error("Oops, something went wrong");
  }

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="overflow-hidden rounded-md bg-secondary max-w-3xl mx-auto">
        {/* TODO: add document's content-type at the top */}
        <div className="px-4 py-5 sm:p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {data && <DefaultFields data={data} />}
              {data && <ParameterForm parameters={data.parameters} />}
              <button className=" btn-primary my-2" type="submit">
                Generate
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
      {/* list of variation results */}
      <div className="overflow-hidden rounded-md bg-secondary mt-4 max-w-3xl mx-auto">
        <div className="px-4 py-5 sm:p-6">
          {/* TODO: display a series of random copy saying things like "cooking something up in the kitchen..." */}
          <p>loading...</p>
        </div>
      </div>
    </>
  );
};

export default NewPage;
