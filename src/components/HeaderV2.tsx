import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";

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
    <Disclosure as="nav" className="bg-primary font-serif">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 py-2">
            <div className="relative flex h-8 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-none p-2 text-base-100 hover:bg-base-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
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
                    className="font-bold text-xl normal-case text-base-100 hover:text-primary hover:bg-base-100 rounded-none py-1 px-4"
                    href="/"
                  >
                    Fundsmith
                  </Link>
                </div>
                {user && (
                  <div className="hidden sm:ml-6 md:flex sm:space-x-6 items-center">
                    <Link
                      href="/"
                      className={
                        isCurrentPath("/") ? "nav-link-current" : "nav-link"
                      }
                    >
                      <HomeModernIcon className="w-5 h-5 mr-2 hover:text-primary" />
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
                      <DocumentTextIcon className="w-5 h-5 mr-2 hover:text-primary" />
                      Documents
                    </Link>
                    {/* <Link
                      href="/projects"
                      className={
                        isCurrentPath("/projects")
                          ? "nav-link-current"
                          : "nav-link"
                      }
                    >
                      <FolderIcon className="w-5 h-5 mr-2 hover:text-primary" />
                      Projects
                    </Link> */}
                  </div>
                )}

                <div className="flex items-center pr-2 absolute right-0 md:static sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {user && (
                    <Menu as="div" className="relative ml-3">
                      <>
                        <Menu.Button className="flex items-center py-1 px-4 text-base-100 hover:text-primary hover:bg-base-100 rounded-none">
                          <span className="sr-only">Open user menu</span>
                          <p className="text-base font-bold mr-4 hidden md:block">
                            {user.firstName} {user.lastName}
                          </p>
                          {user.profileImageUrl ? (
                            <img
                              className="h-7 w-7 rounded-full"
                              src={user.profileImageUrl}
                              alt="profile picture"
                            />
                          ) : (
                            // TODO: update this to use a placeholder with a solid background that shows the user's initials
                            <img src="https://placeimg.com/80/80/people" />
                          )}
                        </Menu.Button>
                      </>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-none bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          <div className="w-full border-t border-base-200"></div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/account"
                                className={classNames(
                                  active ? "bg-base-100" : "",
                                  "inline-flex px-4 py-2 text-sm text-primary w-full"
                                )}
                              >
                                <Cog8ToothIcon className="w-5 h-5 mr-2" />
                                Manage account
                              </Link>
                            )}
                          </Menu.Item>
                          <div className="w-full border-t border-base-200"></div>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleSignOut}
                                className={classNames(
                                  active ? "bg-base-200" : "",
                                  "inline-flex px-4 py-2 text-sm text-primary w-full"
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
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {/* Current: "bg-indigo-50 border-primary text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className={
                  isCurrentPath("/")
                    ? "block border-l-4 border-primary bg-base-100 py-2 pl-3 pr-4 text-base font-medium text-primary"
                    : "block bg-primary py-2 pl-3 pr-4 text-base font-medium text-base-100"
                }
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/documents"
                className={
                  isCurrentPath("/documents")
                    ? "block border-l-4 border-primary bg-base-100 py-2 pl-3 pr-4 text-base font-medium text-primary"
                    : "block bg-primary py-2 pl-3 pr-4 text-base font-medium text-base-100"
                }
              >
                Documents
              </Disclosure.Button>
              {/* <Disclosure.Button
                as="a"
                href="/projects"
                className={
                  isCurrentPath("/projects")
                    ? "block border-l-4 border-primary bg-base-100 py-2 pl-3 pr-4 text-base font-medium text-primary"
                    : "block bg-primary py-2 pl-3 pr-4 text-base font-medium text-base-100"
                }
              >
                Projects
              </Disclosure.Button> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
