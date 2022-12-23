import SignInForm from "../../components/forms/SignInForm";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">
            Sign In or
            <Link className="btn-link btn" href="/signup">
              Sign Up
            </Link>
          </h1>
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
