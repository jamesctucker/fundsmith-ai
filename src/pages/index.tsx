import Wrapper from "@/components/Wrapper";
import { useUser } from "@clerk/clerk-react";
import ContentModelList from "@/components/content-model/ContentModelList";

export default function Home() {
  const { user } = useUser();

  return (
    <Wrapper title={"Dashboard"}>
      {/* <SignedIn> */}
      <div className="flex flex-col justify-center p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl text-center text-serif font-bold">
          👋 Hello, {user?.firstName}! What would you like to create today?
        </h1>
        <p className="text-center">
          Choose one of the content types below to get started.
        </p>
        <section className="content-types mt-4">
          <ContentModelList />
        </section>
      </div>
    </Wrapper>
  );
}
