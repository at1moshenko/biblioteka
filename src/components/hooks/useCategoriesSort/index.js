import { useDispatch, useSelector } from "react-redux";
import { setCloseCategorySort } from "../../../redux/slices/filterSlice";
import { closeCategorySortSelector } from "../../../redux/selectors";

export const useLogicCategoriesSort = (onChangeCategory) => {
  const dispatch = useDispatch();

  const closeCategorySort = useSelector(closeCategorySortSelector);

  const categoriesBook = [
    "Бизнес-книги",
    "Детективы",
    "Детские книги",
    "Зарубежная литература",
    "Истроия",
    "Книги по психологии",
  ];

  const closingTheBurgerMenuAndChoosingCategory = (index) => {
    dispatch(setCloseCategorySort(!closeCategorySort));
    onChangeCategory(index);
  };

  return { categoriesBook, closingTheBurgerMenuAndChoosingCategory };
};
