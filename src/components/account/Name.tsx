import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type NameData = {
  firstName: string;
  lastName: string;
};

type Error = {
  message: string;
  long_message: string;
};

const Name = () => {
  const { user } = useUser();
  const [showNameForm, setShowNameForm] = useState(false);
  const [updateNameErrors, setUpdateNameErrors] = useState<Error[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NameData>();

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

  return (
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
            className="border border-gray-300 rounded-none w-full sm:w-3/4 md:w-2/3 lg:1/2"
            type="text"
            placeholder={user?.firstName || "Your first name"}
            {...register("firstName", { required: true })}
          />
          {errors.firstName?.type === "required" && (
            <p className="text-sm text-error" role="alert">
              First name is required
            </p>
          )}
          <input
            className="border border-gray-300 rounded-none w-full sm:w-3/4 md:w-2/3 lg:1/2"
            type="text"
            placeholder={user?.lastName || "Your last name"}
            {...register("lastName", { required: true })}
          />
          {errors.lastName?.type === "required" && (
            <p className="text-sm text-error" role="alert">
              Last name is required
            </p>
          )}
          <div className="flex items-center justify-end w-full sm:w-3/4 md:w-2/3 lg:1/3">
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
  );
};

export default Name;
