import Link from "next/link";
import SignUpForm from "../../components/forms/SignUpForm";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const onSubmit = async (data: FormData) => {
    console.log(data);
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
