import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import ParameterForm from "@/components/forms/ParameterForm";
import DefaultFields from "@/components/content-type/DefaultFields";

const NewPage = () => {
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

  return (
    <>
      <div className="overflow-hidden rounded-none bg-secondary max-w-3xl mx-auto">
        {/* TODO: add document's content-type at the top */}
        <div className="px-4 py-5 sm:p-6">
          {data && <DefaultFields data={data} />}
          {data && <ParameterForm parameters={data.parameters} />}
          <button className="btn btn-primary my-2">Generate</button>
        </div>
      </div>
      {/* list of variation results */}
      <div className="overflow-hidden rounded-none bg-secondary mt-4 max-w-3xl mx-auto">
        <div className="px-4 py-5 sm:p-6">
          {/* TODO: display a series of random copy saying things like "cooking something up in the kitchen..." */}
          <p>loading...</p>
        </div>
      </div>
    </>
  );
};

export default NewPage;
