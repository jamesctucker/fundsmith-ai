import Wrapper from "@/components/Wrapper";
import { trpc } from "../utils/trpc";
import { useUser } from "@clerk/clerk-react";
import ContentTypeList from "@/components/content-type/ContentTypeList";

export default function Home() {
  const { user } = useUser();

  return (
    <Wrapper title={"Dashboard"}>
      <div className="flex flex-col justify-center p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl text-center text-serif font-bold">
          👋 Hello, {user?.firstName}! What would you like to create today?
        </h1>
        <p className="text-center">
          You can choose one of the content types below to get started.
        </p>
        <section className="content-types mt-4">
          <ContentTypeList />
        </section>
      </div>
    </Wrapper>
  );
}
