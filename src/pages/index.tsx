import Wrapper from "@/components/Wrapper";
import { trpc } from "../utils/trpc";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const contentTypes = trpc.content_types.getContentTypes.useQuery();
  const { user } = useUser();

  return (
    <Wrapper title={"Home"}>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <h1>
            👋 Hello, {user?.firstName}! What would you like to create today?
          </h1>
          {/* render list of cards for each content type - should show name and description */}
          {contentTypes.data?.map((contentType) => (
            <div
              key={contentType.id}
              className="card card-side bg-base-100 shadow-xl"
            >
              <figure>
                <img src="https://placeimg.com/200/280/arch" alt="Movie" />
              </figure>
              <div className="card-body">
                <h2>{contentType.name}</h2>
                <p>{contentType.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
