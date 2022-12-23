import Head from "next/head";
import Wrapper from "../components/Wrapper";

export default function Home() {
  return (
    <Wrapper title={"Home"}>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <h1>👋 Hello there! What would you like to create today?</h1>
        </div>
      </div>
    </Wrapper>
  );
}
