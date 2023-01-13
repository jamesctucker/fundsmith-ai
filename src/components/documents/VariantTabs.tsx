import { useState } from "react";
import { Tab } from "@headlessui/react";
import NewVariants from "@/components/documents/NewVariants";
import SavedVariants from "@/components/documents/SavedVariants";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  variants: string[];
  documentData: any;
};

export default function VariantTabs({ variants, documentData }: Props) {
  let [categories] = useState(["new", "saved"]);

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-none bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-none py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <NewVariants variants={variants} documentData={documentData} />
          </Tab.Panel>

          <Tab.Panel>
            <SavedVariants variants={variants} documentData={documentData} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
