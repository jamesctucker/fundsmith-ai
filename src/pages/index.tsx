import Wrapper from "@/components/Wrapper";
import { trpc } from "../utils/trpc";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  // const hello = trpc.hello.useQuery({ text: "client" });
  const { user } = useUser();

  return (
    <Wrapper title={"Home"}>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <h1>
            👋 Hello, {user?.firstName}! What would you like to create today?
          </h1>
          {/* {!hello.data ? <div>Loading...</div> : <h2>{hello.data.greeting}</h2>} */}
        </div>
      </div>
    </Wrapper>
  );
}
