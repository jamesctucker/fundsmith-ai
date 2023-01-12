import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { trpc } from "@/utils/trpc";
import { useCreateDocument } from "@/hooks/useCreateDocument";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateNewDocumentMenu() {
  const { user } = useUser();
  const { data: contentModels, error } =
    trpc.content_models.getContentModels.useQuery();

  const userEmail = user ? user.emailAddresses[0]!.emailAddress : "";

  const {
    createDocument,
    isLoading,
    error: mutationError,
  } = useCreateDocument();

  if (mutationError) {
    toast.error("Sorry, something went wrong.");
  }

  return (
    <Menu as="div" className="relative inline-block text-left my-3 sm:my-0">
      <Menu.Button className="btn-outline w-full">
        Create New Document
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-base-100 shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
          {contentModels?.map((contentModel) => (
            <div className="py-1" key={`cm` + contentModel.id}>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-base-200 text-neutral" : "text-neutral",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() =>
                      createDocument({
                        contentModelId: contentModel.id,
                        contentModelName: contentModel.name,
                        userEmail: userEmail,
                      })
                    }
                  >
                    {contentModel.displayName}
                  </a>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
