import { trpc } from "../../utils/trpc";
import Link from "next/link";
import { slugify } from "@/helpers/slugify";

const ContentTypeList = () => {
  const contentTypes = trpc.content_types.getContentTypes.useQuery();

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {contentTypes.data?.map((contentType) => (
        <li key={contentType.id}>
          <Link
            className="card basis-1/4  rounded-md border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400 cursor-pointer"
            href={`/new/${slugify(contentType.name)}`}
          >
            <figure>
              <img src="https://placeimg.com/300/175/nature" alt="nature" />
            </figure>
            <div className="pt-5">
              <h2 className="text-base font-bold">{contentType.name}</h2>
              <p className="text-sm">{contentType.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ContentTypeList;
