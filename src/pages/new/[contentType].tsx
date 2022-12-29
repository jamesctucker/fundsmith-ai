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
      {data && <DefaultFields data={data} />}
      {data && <ParameterForm parameters={data.parameters} />}
      {/* create variants button */}
      {/* list of variation results */}
    </>
  );
};

export default NewPage;
