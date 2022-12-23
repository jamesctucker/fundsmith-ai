import { useForm } from "react-hook-form";

// type onSubmit as a parent function prop
type SignInFormProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

type FormData = {
  email: string;
  password: string;
};

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const inputErrorStyles = "input input-bordered input-error w-full max-w-sm";
  const inputStyles = "input input-bordered w-full max-w-sm";

  return (
    <form className="form-control max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label className="label text-sm" htmlFor="email">
        Email
      </label>
      <input
        className={errors.email ? inputErrorStyles : inputStyles}
        type="email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <label className="label text-sm" htmlFor="password">
        Password
      </label>
      <input
        className={errors.password ? inputErrorStyles : inputStyles}
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}

      <button className="btn-primary btn mt-4" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
