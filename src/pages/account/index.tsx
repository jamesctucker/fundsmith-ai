import AccountLayout from "@/components/AccountLayout";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-hot-toast";

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
  const [uploading, setUploading] = useState(false);

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
          toast.success("Name updated!");
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
          toast.success("Password updated!");
          // hide form
          setShowPasswordForm(false);
        })
        .catch((error) => {
          setChangePasswordErrors(error.errors);
        });
    }
  };

  // set avatar
  const setAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user && e.target.files) {
      setUploading(true);
      // get file
      const file = e.target.files[0];
      const fileReader = new FileReader();

      if (!file) {
        setUploading(false);
        return;
      }

      fileReader.readAsArrayBuffer(file);
      fileReader.onloadend = async () => {
        const arrayBuffer = fileReader.result;

        if (!arrayBuffer) {
          return toast.error(
            "Ope! There was an error uploading the file. Please try again."
          );
        }

        const newBlob = new Blob([arrayBuffer], { type: file.type });

        // now you can use the `newBlob` object to upload the image file
        const response = await user.setProfileImage({ file: newBlob });

        if (response) {
          toast.success("Avatar updated!");
        }

        setUploading(false);
      };
    }
  };

  return (
    <AccountLayout title="Your account">
      <h1 className="text-xl py-2 mb-6">Your Account</h1>
      <div className="account-info space-y-6">
        {/* Avatar */}
        <section className="account-avatar">
          {user?.profileImageUrl && (
            // avatar with hidden input to trigger file upload
            <div className="relative h-24 w-24">
              <img
                src={user.profileImageUrl}
                className="rounded-full object-cover h-24 w-24 hover:bg-gray-700"
                alt="Avatar"
              />
              <input
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                onChange={setAvatar}
              />
              {/* if uploading, show overlay with loading indicator */}
              {uploading && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full"
                  role="status"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          )}
        </section>
        {/* Name */}
        <section className="account-name space-y-2">
          <h2 className="text-base font-bold">Name</h2>
          {!showNameForm && user?.firstName && user?.lastName && (
            <div className="flex items-center">
              <p className="text-base hidden md:block">
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
                className="border border-gray-300 rounded-none"
                type="text"
                placeholder="First name"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName || ""}
              />
              {errors.firstName?.type === "required" && (
                <p className="text-sm text-error" role="alert">
                  First name is required
                </p>
              )}
              <input
                className="border border-gray-300 rounded-none"
                type="text"
                placeholder="Last name"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName || ""}
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
            <p className="text-base hidden md:block">
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
                className="btn-primary"
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
                  className="border border-gray-300 rounded-none"
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
                  className="border border-gray-300 rounded-none"
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
