import Link from "next/link";
import SignUpForm from "@/components/forms/SignUpForm";
import { useRouter } from "next/router";
import { SignUp } from "@clerk/nextjs";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUpPage() {
  const router = useRouter();

  // const onSubmit = async (formData: FormData) => {
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabaseClient.auth.signUp({
  //     email: formData.email,
  //     password: formData.password,
  //   });

  //   if (error) {
  //     console.log(error);
  //   }

  //   if (session) {
  //     router.push("/");
  //   } else {
  //     router.push("/auth/verify");
  //   }
  // };

  return (
    <div className="mx-auto max-w-md">
      {/* <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Join Fundsmith.</h1>
            <p className="text-md">Lorem ipsum, ipsum dipsum.</p>
            <SignUpForm onSubmit={onSubmit} />
            <p>
              Already have an account?{" "}
              <Link className="btn-link btn" href="/auth/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div> */}
      <SignUp />
    </div>
  );
}
