// React hook that intakes data from multiple forms in multiple components and returns a single object with all the data
import { useState } from "react";

// type DefaultFields = {
//     tone: string;
//     numberofVariants: number;
// };

type FormData = {
  tone: string;
  numberofVariants: number;
};

export const useContentTypeFormData = () => {
  //   store data from parameter form
  const [formData, setFormData] = useState({} as FormData);

  // update parameterFormData
  const handleUpdateFormData = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);

  return {
    formData,
    handleUpdateFormData,
  };
};
