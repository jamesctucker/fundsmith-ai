import { ContentType } from "@prisma/client";
import Select from "../ui/Select";

type ContentTypeProps = {
  data: ContentType;
};

const DefaultFields = ({ data }: ContentTypeProps) => {
  const variantOptions = [
    { id: 1, label: "1", value: 1 },
    { id: 2, label: "2", value: 2 },
    { id: 3, label: "3", value: 3 },
    { id: 4, label: "4", value: 4 },
    { id: 5, label: "5", value: 5 },
  ];

  return (
    <>
      <label className="label" htmlFor="name">
        Document Name
      </label>
      <input
        type="text"
        name="name"
        className="input input-bordered"
        placeholder={data.name}
      />
      {/* Number of variants selection */}
      <Select label="Number of variants" options={variantOptions} />
      {/* Tone Selection */}
      <label className="label" htmlFor="tone">
        Tone
      </label>
      <select name="tone" className="select select-bordered w-full max-w-xs">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </>
  );
};

export default DefaultFields;
