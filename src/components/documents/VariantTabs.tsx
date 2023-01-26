import { useState } from "react";
import { Tab } from "@headlessui/react";
import NewVariants from "@/components/documents/NewVariants";
import SavedVariants from "@/components/documents/SavedVariants";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  variants: string[];
  documentData: any;
};

export default function VariantTabs({ variants, documentData }: Props) {
  let [categories] = useState(["new", "saved"]);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    duration: 300,
  });

  return (
    <div className="w-full px-2 py-16 sm:px-0" ref={parent}>
      <Tab.Group>
        <Tab.List className="flex justify-start">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full p-6 text-sm leading-5 font-medium",
                  selected
                    ? "border-r border-l border-t border-b-none border-primary text-neutral focus:outline-none focus:shadow-outline-none focus:border-primary shadow-md"
                    : "text-neutral border-b border-primary hover:text-base-100 hover:bg-secondary"
                )
              }
            >
              {category}
              {category === "saved" && (
                <span className="inline-flex items-center px-2.5 py-0.5 ml-2 rounded-full text-xs font-medium leading-4 bg-primary text-base-100">
                  {documentData?.savedVariants?.length}
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <NewVariants variants={variants} documentData={documentData} />
          </Tab.Panel>
          <Tab.Panel>
            <SavedVariants documentData={documentData} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
