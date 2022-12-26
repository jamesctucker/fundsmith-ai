import { useRouter } from "next/router";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md">
      <SignIn />
    </div>
  );
}
