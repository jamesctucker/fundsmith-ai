import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type MenuItem = {
  name: string;
  href?: string;
  action?: string;
};

type Props = {
  menuItems: MenuItem[];
  onClick?: (action: string) => void;
};

const Dropdown = ({ menuItems, onClick }: Props) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center rounded-full text-primary hover:text-gray-600 focus:outline-none">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-none bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menuItems.map((item) => (
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-base-200 text-neutral" : "text-neutral",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={(e) => {
                        if (onClick && item.action) {
                          e.preventDefault();
                          onClick(item.action);
                        }
                      }}
                      href={item.href ? item.href : undefined}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Dropdown;
