import AccountLayout from "@/components/AccountLayout";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

type PasswordData = {
  newPassword: string;
  newPasswordConfirm: string;
};

type NameData = {
  firstName: string;
  lastName: string;
};

type Error = {
  message: string;
  long_message: string;
};

const AccountPage = () => {
  const { user } = useUser();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [changePasswordErrors, setChangePasswordErrors] = useState<Error[]>([]);
  const [showNameForm, setShowNameForm] = useState(false);
  const [updateNameErrors, setUpdateNameErrors] = useState<Error[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordData & NameData>();

  const updateName = async (data: NameData) => {
    if (user) {
      await user

        .update({
          firstName: data.firstName,
          lastName: data.lastName,
        })
        .then(() => {
          // clear errors
          setUpdateNameErrors([]);
          // clear formState
          reset();
          // hide form
          setShowNameForm(false);
        })
        .catch((error) => {
          setUpdateNameErrors(error.errors);
        });
    }
  };

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
          // hide form
          setShowPasswordForm(false);
        })
        .catch((error) => {
          setChangePasswordErrors(error.errors);
        });
    }
  };

  // set avatar
  // const setAvatar = async (e: Event) => {
  //   if (user) {
  //     const file = (e.target as HTMLInputElement).files![0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = async () => {
  //       const base64 = reader.result as string;
  //       await user.update({
  //         profileImageUrl: base64,
  //       });
  //     };
  //   }
  // };

  return (
    <AccountLayout title="Your account">
      <h1 className="text-xl py-2 mb-6">Your Account</h1>
      <div className="account-info space-y-6">
        {/* Avatar */}
        <section className="account-avatar">
          {user?.profileImageUrl && (
            <Image
              className="p-2 rounded-full cursor-pointer"
              src={user.profileImageUrl}
              alt="profile picture"
              width={80}
              height={80}
            />
          )}
        </section>
        {/* Name */}
        <section className="account-name space-y-2">
          <h2 className="text-base font-bold">Name</h2>
          {!showNameForm && user?.firstName && user?.lastName && (
            <div className="flex items-center">
              <p className="text-base pl-2 hidden md:block">
                {user.firstName} {user.lastName}
              </p>
              <PencilIcon
                className="ml-2 h-4 w-4 text-neutral cursor-pointer"
                onClick={() => {
                  setShowNameForm(true);
                }}
              />
            </div>
          )}
          {showNameForm && (
            <form
              className="flex flex-col space-y-2"
              onSubmit={handleSubmit((data) => updateName(data))}
            >
              <input
                className="border border-gray-300 rounded-none p-2"
                type="text"
                placeholder="First name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName?.type === "required" && (
                <p className="text-sm text-error" role="alert">
                  First name is required
                </p>
              )}
              <input
                className="border border-gray-300 rounded-none p-2"
                type="text"
                placeholder="Last name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName?.type === "required" && (
                <p className="text-sm text-error" role="alert">
                  Last name is required
                </p>
              )}
              <div className="flex items-center justify-end">
                <button
                  className="text-neutral underline mr-4"
                  type="button"
                  onClick={() => {
                    setShowNameForm(false);
                  }}
                >
                  Cancel
                </button>
                <button className="btn-primary" type="submit">
                  Update name
                </button>
              </div>
              {updateNameErrors.length > 0 && (
                <ul className="text-sm text-error" role="alert">
                  {updateNameErrors.map((error) => (
                    <li key={error.message}>{error.message}</li>
                  ))}
                </ul>
              )}
            </form>
          )}
        </section>
        {/* Email */}
        <section className="account-email space-y-2">
          <h2 className="text-base font-bold">Email</h2>
          {user?.emailAddresses && (
            <p className="text-base pl-2 hidden md:block">
              {user.emailAddresses[0]!.emailAddress}
            </p>
          )}
        </section>
        {/* Password */}
        {user?.passwordEnabled && (
          <section className="account-password space-y-2">
            <h2 className="text-base font-bold">Your password</h2>
            {!showPasswordForm && (
              <button
                className="btn-primary ml-2"
                onClick={() => setShowPasswordForm(true)}
              >
                Change password
              </button>
            )}
            {showPasswordForm && (
              <form
                className="flex flex-col space-y-2"
                onSubmit={handleSubmit((data) => updatePassword(data))}
              >
                <input
                  className="border border-gray-300 rounded-none p-2"
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
                  className="border border-gray-300 rounded-none p-2"
                  type="password"
                  placeholder="Confirm new password"
                  {...register("newPasswordConfirm", { required: true })}
                />
                {errors.newPasswordConfirm?.type === "required" && (
                  <p className="text-sm text-error" role="alert">
                    New password confirmation is required
                  </p>
                )}

                <div className="flex items-center justify-end">
                  <button
                    className="text-neutral underline mr-4"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-primary" type="submit">
                    Change password
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
      </div>
    </AccountLayout>
  );
};

export default AccountPage;
