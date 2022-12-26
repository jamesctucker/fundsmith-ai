import { SignUp } from "@clerk/nextjs";
import { useSignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) {
    // handle loading state
    return null;
  }

  if (signUp.status === "complete") {
    console.log("creating a default workspace for the user");
  }

  return (
    <div className="mx-auto max-w-md">
      <SignUp />
    </div>
  );
}
