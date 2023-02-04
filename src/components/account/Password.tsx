import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import { PencilIcon } from "@heroicons/react/24/outline";

type PasswordData = {
  newPassword: string;
  newPasswordConfirm: string;
};

type Error = {
  message: string;
  long_message: string;
};

const Password = () => {
  const { user } = useUser();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [changePasswordErrors, setChangePasswordErrors] = useState<Error[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordData>();

  const updatePassword = async (data: PasswordData) => {
    if (user) {
      await user
        .update({
          password: data.newPassword,
        })
        .then(() => {
          // clear errors
          setChangePasswordErrors([]);
          // clear formState
          reset();
          toast.success("Password updated!");
          // hide form
          setShowPasswordForm(false);
        })
        .catch((error) => {
          setChangePasswordErrors(error.errors);
        });
    }
  };

  return (
    <>
      {user?.passwordEnabled && (
        <section className="account-password space-y-2">
          <h2 className="text-base font-bold">Password</h2>
          {!showPasswordForm && (
            <button
              className="bg-transparent py-1 px-2 inline-flex items-center justify-center text-primary font-semibold"
              onClick={() => setShowPasswordForm(true)}
            >
              <span>
                <PencilIcon className="h-3 w-3 mr-2" />
              </span>
              Change password
            </button>
          )}
          {showPasswordForm && (
            <form
              className="flex flex-col space-y-2"
              onSubmit={handleSubmit((data) => updatePassword(data))}
            >
              <input
                className="border border-gray-300 rounded-none w-full sm:w-3/4 md:w-2/3 lg:1/3"
                type="password"
                placeholder="New password"
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword?.type === "required" && (
                <p className="text-sm text-error" role="alert">
                  New password is required
                </p>
              )}

              <input
                className="border border-gray-300 rounded-none w-full sm:w-3/4 md:w-2/3 lg:1/3"
                type="password"
                placeholder="Confirm new password"
                {...register("newPasswordConfirm", { required: true })}
              />
              {errors.newPasswordConfirm?.type === "required" && (
                <p className="text-sm text-error" role="alert">
                  New password confirmation is required
                </p>
              )}

              <div className="flex items-center justify-end w-full sm:w-3/4 md:w-2/3 lg:1/3">
                <button
                  className="text-neutral underline mr-4"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </button>
                <button className="btn-primary" type="submit">
                  Confirm
                </button>
              </div>
              {changePasswordErrors.length > 0 && (
                <div className="text-sm text-error">
                  {changePasswordErrors.map((error) => (
                    <p>{error.message}</p>
                  ))}
                </div>
              )}
            </form>
          )}
        </section>
      )}
    </>
  );
};

export default Password;
