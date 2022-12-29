import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

const NewPage = () => {
  const router = useRouter();
  const contentTypeName = router.query.contentType as string;

  const { data } = trpc.content_types.getContentTypeParameters.useQuery({
    name: contentTypeName,
  });

  return (
    <>
      {data && (
        <div>
          <label className="label" htmlFor="name">
            Document Name
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            placeholder={data.name}
          />
        </div>
      )}
      {data?.parameters.map((parameter) => (
        <div key={parameter.id}>
          <label className="label" htmlFor={parameter.name}>
            {parameter.name}
          </label>
          {parameter.displayType === "TEXTAREA" && (
            <textarea
              id={parameter.name}
              name={parameter.name}
              rows={5}
              placeholder={parameter.placeholder}
            />
          )}
          {parameter.displayType === "TEXT" && (
            <input
              id={parameter.name}
              name={parameter.name}
              rows={5}
              placeholder={parameter.placeholder}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default NewPage;
