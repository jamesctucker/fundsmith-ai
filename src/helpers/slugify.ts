export const slugify = (str: string) => {
  return str.toLowerCase().split(" ").join("-");
};
