import Link from "next/link";
import SignUpForm from "../../components/forms/SignUpForm";
import { useSessionContext } from "@supabase/auth-helpers-react";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const { supabaseClient } = useSessionContext();

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-md">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Join Fundsmith.</h1>
            <p className="text-md">Lorem ipsum, ipsum dipsum.</p>
            <SignUpForm onSubmit={onSubmit} />
            <p>
              Already have an account?{" "}
              <Link className="btn-link btn" href="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
