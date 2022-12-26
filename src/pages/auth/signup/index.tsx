import { SignUp } from "@clerk/nextjs";
import { useSignUp } from "@clerk/clerk-react";
import { trpc } from "../../../utils/trpc";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();

  const mutation = trpc.workspaces.createWorkspace.useMutation();

  return (
    <div className="mx-auto max-w-md">
      <SignUp />
    </div>
  );
}
