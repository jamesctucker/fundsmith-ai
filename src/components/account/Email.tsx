import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

type EmailData = {
  email: string;
};

const Email = () => {
  const { user } = useUser();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [updateEmailErrors, setUpdateEmailErrors] = useState<Error[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailData>();

  const updateEmail = async (data: EmailData) => {
    if (user) {
      const response = await user.createEmailAddress({ email: data.email });

      await user
        .update({
          primaryEmailAddressId: response.id,
        })
        .then(() => {
          // clear errors
          setUpdateEmailErrors([]);
          // clear formState
          reset();
          toast.success("Email updated!");
          // hide form
          setShowEmailForm(false);
        })
        .catch((error) => {
          setUpdateEmailErrors(error.errors);
        });
    }
  };

  return (
    <section className="account-email space-y-2">
      <h2 className="text-base font-bold">Emails</h2>
      {!showEmailForm && user?.emailAddresses && (
        <div className="flex items-center">
          <ul className="text-base">
            {user.emailAddresses.map((email) => (
              <div className="flex items-center space-x-2">
                <li key={email.emailAddress}>{email.emailAddress}</li>
                <div className="flex items-center">
                  {email.verification.status === "verified" ? (
                    <div className="bg-secondary text-base-100 text-xs px-2 py-1">
                      verified
                    </div>
                  ) : (
                    <div className="h-4 bg-error text-base-100">unverified</div>
                  )}
                </div>
              </div>
            ))}
          </ul>

          {/* <PencilIcon
          className="ml-2 h-4 w-4 text-neutral cursor-pointer"
          onClick={() => {
            setShowEmailForm(true);
          }}
        /> */}
        </div>
      )}
      {showEmailForm && (
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit((data) => updateEmail(data))}
        >
          <input
            className="border border-gray-300 rounded-none w-full sm:w-3/4 md:w-2/3 lg:1/2"
            type="email"
            placeholder={user?.emailAddresses[0]?.emailAddress || "Your email"}
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-sm text-error" role="alert">
              Email is required
            </p>
          )}
          <div className="flex items-center justify-end">
            <button
              className="text-neutral underline mr-4"
              type="button"
              onClick={() => {
                setShowEmailForm(false);
              }}
            >
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              Update email
            </button>
          </div>
          {updateEmailErrors.length > 0 && (
            <ul className="text-sm text-error" role="alert">
              {updateEmailErrors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          )}
        </form>
      )}
      {/* add email address */}
      <button className="bg-transparent py-2 inline-flex items-center justify-center text-primary font-semibold">
        <span>
          <PlusSmallIcon className="h-4 w-4 mr-2" />
        </span>
        Add email address
      </button>
    </section>
  );
};

export default Email;
