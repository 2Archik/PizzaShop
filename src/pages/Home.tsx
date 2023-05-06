import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { Pizza, selectPizzaData, setItems } from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const items = useSelector(selectPizzaData);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const onChangeCategory = (i: number) => dispatch(setCategoryId(i));

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  const getPizzas = async () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      const { data } = await axios.get<Pizza[]>(
        `https://643db30fc72fda4a0be61ecf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      dispatch(setItems(data));
    } catch (error) {
      alert("Ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
