import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sortList } from "../logic-sort-button";
import { setFilters } from "../../../redux/slices/filterSlice";
import { fetchBooks } from "../../../redux/slices/booksSlice";
import { useBookFilters } from "../useBookFilter";
import {
  categoryIdSelector,
  sortPropertySelector,
} from "../../../redux/selectors";
import qs from "qs";

export const useURLParameterLogic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = useSelector(categoryIdSelector);
  const sortType = useSelector(sortPropertySelector);

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { fetchBooksByFilters } = useBookFilters();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      const queryParams = fetchBooksByFilters(categoryId, sortType);
      dispatch(fetchBooks(queryParams));
    }

    isSearch.current = false;
  }, [categoryId, sortType]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
      });

      navigate(`/?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType]);
};
