export const addClickOutsideListener = (element, callback) => {
  const handleClickOutside = (event) => {
    if (!event.composedPath().includes(element)) {
      callback();
    }
  };

  document.body.addEventListener("click", handleClickOutside);

  return () => document.body.removeEventListener("click", handleClickOutside);
};

export const sortList = [
  { name: "по умолчанию", sortProperty: "all" },
  { name: "популярности", sortProperty: "rating" },
  { name: "алфавиту ", sortProperty: "title" },
];
