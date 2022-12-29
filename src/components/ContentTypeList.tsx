import { trpc } from "../utils/trpc";

const ContentTypeList = () => {
  const contentTypes = trpc.content_types.getContentTypes.useQuery();

  return (
    <ul className="flex flex-row p-4">
      {contentTypes.data?.map((contentType) => (
        <li
          key={contentType.id}
          className="card card-side basis-1/3 m-2 bg-base-100 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <figure>
            <img src="https://placeimg.com/120/120/nature" alt="nature" />
          </figure>
          <div className="card-body">
            <h2 className="text-base font-bold">{contentType.name}</h2>
            <p className="text-sm">{contentType.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContentTypeList;
