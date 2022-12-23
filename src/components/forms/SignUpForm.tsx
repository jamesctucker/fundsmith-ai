import { useForm } from "react-hook-form";

type SignUpFormProps = {
  onSubmit: (data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
};

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const inputErrorStyles = "input input-bordered input-error w-full max-w-sm";
  const inputStyles = "input input-bordered w-full max-w-sm";

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="form-control w-full max-w-sm"
    >
      <div className="space-y-1">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
          <span className="label-text-alt">No spam ever, we promise!</span>
        </label>
        <input
          id="email"
          className={errors.email ? inputErrorStyles : inputStyles}
          placeholder="Email"
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email?.type === "required" && (
          <p className="text-sm text-error" role="alert">
            Email is required
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="label text-sm" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={errors.password ? inputErrorStyles : inputStyles}
          placeholder="Password"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        {errors.password?.type === "required" && (
          <p className="ml-1 text-sm text-error" role="alert">
            Password is required
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="ml-1 text-sm text-error" role="alert">
            Password must be at least 8 characters
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="label text-sm" htmlFor="password">
          Confirm Your Password
        </label>
        <input
          id="password-confirm"
          className={errors.passwordConfirm ? inputErrorStyles : inputStyles}
          placeholder="Confirm your password"
          type="password"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
        />
        {errors.passwordConfirm && (
          <p className="text-sm text-error" role="alert">
            Your passwords do not match
          </p>
        )}
      </div>

      <button className="btn-primary btn mt-4" type="submit">
        Create Account
      </button>
    </form>
  );
};

export default SignUpForm;
