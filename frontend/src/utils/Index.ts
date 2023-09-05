// uper case first letter
export const uperCaseFirstLetter = (str: string) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

// capitalize
export const capitalize = (str: string) => {
  return str.charAt(0)?.toUpperCase() + str.slice(1);
};

// format date
export const formatDate = (date = Date.now() as number) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  return `${day}/${month}/${year} `;
};

// sub string
export const subStringFunc = (str: string, length: number) => {
  if (str?.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};
