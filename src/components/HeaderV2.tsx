import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  UserCircleIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  HomeModernIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
// import Select from "./ui/Select";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderV2() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();

    router.push("/auth/signin");
  };

  const isCurrentPath = (name: string) => {
    return router.pathname === name;
  };

  //   const workspaces = [
  //     { id: 1, label: "Default Workspace", value: "default-workspace" },
  //   ];

  return (
    <Disclosure as="nav" className="bg-base-100 shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
            <div className="relative flex h-14 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    className="font-bold text-xl normal-case text-primary hover:bg-secondary rounded-md py-2 px-4"
                    href="/"
                  >
                    fundsmith
                  </Link>
                </div>
                <div className="hidden sm:ml-6 md:flex sm:space-x-6 items-center">
                  <Link
                    href="/"
                    className={
                      isCurrentPath("/") ? "nav-link-current" : "nav-link"
                    }
                  >
                    <HomeModernIcon className="w-5 h-5 mx-2" />
                    Dashboard
                  </Link>
                  <Link
                    href="/documents"
                    className={
                      isCurrentPath("/documents")
                        ? "nav-link-current"
                        : "nav-link"
                    }
                  >
                    <DocumentTextIcon className="w-5 h-5 mx-2" />
                    Documents
                  </Link>
                  <Link
                    href="/projects"
                    className={
                      isCurrentPath("/projects")
                        ? "nav-link-current"
                        : "nav-link"
                    }
                  >
                    <FolderIcon className="w-5 h-5 mx-2" />
                    Projects
                  </Link>
                </div>
                <div className="flex items-center pr-2 absolute right-0 md:static sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex items-center py-2 px-4 hover:bg-secondary rounded-md">
                          <span className="sr-only">Open user menu</span>
                          <p className="text-base font-bold mr-4 hidden md:block">
                            {user.firstName} {user.lastName}
                          </p>
                          {user.profileImageUrl ? (
                            <img
                              className="h-9 w-9 rounded-full"
                              src={user.profileImageUrl}
                              alt="profile picture"
                            />
                          ) : (
                            // TODO: update this to use a placeholder with a solid background that shows the user's initials
                            <img src="https://placeimg.com/80/80/people" />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <p className="px-4 py-2 text-sm font-bold truncate">
                              {user!.emailAddresses[0]!.emailAddress}
                            </p>
                          </Menu.Item>
                          {/* TODO: let user change actual current workspace */}
                          {/* <Menu.Item>
                            <Select
                              options={workspaces}
                              onChange={() => console.log("changed workspace!")}
                            />
                          </Menu.Item> */}
                          <div className="w-full border-t-2 border-accent"></div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                                )}
                              >
                                <UserCircleIcon className="w-5 h-5 mr-2" />
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/settings"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                                )}
                              >
                                <Cog8ToothIcon className="w-5 h-5 mr-2" />
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/billing"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                                )}
                              >
                                <CreditCardIcon className="w-5 h-5 mr-2" />
                                Billing
                              </Link>
                            )}
                          </Menu.Item>
                          <div className="w-full border-t-2 border-accent"></div>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleSignOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                                )}
                              >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link className="btn-primary" href="/auth/signin">
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Documents
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Projects
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
