import Wrapper from "@/components/Wrapper";
import { trpc } from "../utils/trpc";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const contentTypes = trpc.content_types.getContentTypes.useQuery();
  const { user } = useUser();

  return (
    <Wrapper title={"Dashboard"}>
      <div className="flex flex-col justify-center p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl text-center font-bold">
          👋 Hello, {user?.firstName}! What would you like to create today?
        </h1>
        <p className="text-center">
          You can choose one of the content types below to get started.
        </p>
        <section className="content-types mt-4">
          {/* render list of cards for each content type - should show name and description */}
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
        </section>
      </div>
    </Wrapper>
  );
}
