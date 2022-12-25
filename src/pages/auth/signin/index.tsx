import SignInForm from "@/components/forms/SignInForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignIn } from "@clerk/nextjs";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();

  // const onSubmit = async (formData: FormData) => {
  //   let { data, error } = await supabaseClient.auth.signInWithPassword({
  //     email: formData.email,
  //     password: formData.password,
  //   });

  //   if (error) {
  //     console.log(error);
  //   }

  //   if (data) router.push("/");
  // };

  return (
    <div className="mx-auto max-w-md">
      {/* <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">
            Sign In or
            <Link className="btn-link btn" href="/auth/signup">
              Sign Up
            </Link>
          </h1>
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div> */}
      <SignIn />
    </div>
  );
}
