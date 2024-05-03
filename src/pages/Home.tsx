import React, { useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux"
import { selectFilter, setCategoryId } from "../Redux/slices/filterSlice";
import {setFilters} from '../Redux/slices/filterSlice'

import axios  from "axios";
import qs from "qs";
import {Link, useNavigate} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import {optionsTypes} from '../components/Sort/index'

import Pagination from "../Pagination";



import styles from "./Home.module.scss";
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from "../Redux/slices/pizzaSlice";

import {setPageCurrent} from "../Redux/slices/filterSlice";
import { useAppDispatch } from "../Redux/Store";


const Home = () => {
 const dispatch = useAppDispatch()
const navigate = useNavigate()

 const { categoryId, sort, currentPage, searchValue } =
 useSelector(selectFilter);


  const isMounted = React.useRef(false) 

  const {status, items} = useSelector(selectPizzaData)
 
  const onChangePage = (number:any) => {
    dispatch(setPageCurrent(number));
  };


const isSeacrch = React.useRef(false)
 
async function getPizzas(){
  
  const order = sort.sortProperty.includes("-") ? 'asc' : 'desc'
  const sortBy = sort.sortProperty.replace('-', '')
  const category = categoryId > 0 ? `category=${categoryId}`: ``
  const search = searchValue  ? `&search=${searchValue}`: ``
  

    dispatch(
      fetchPizzas({
      sortBy,
      order,  
      category,
      search,
      currentPage: String(currentPage)
    })
    
    )
};


// 1. Вшивание параметров фильтрации и/или сортировки в адресную строку при их изменении
React.useEffect(() =>{
  if (isMounted.current){
    const quryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    })
    navigate(`?${quryString}`)
  }
  isMounted.current = true 
}, [categoryId, sort.sortProperty, searchValue, currentPage])

// 2. Парсинг заданных параметров фильтрации и/или сортировки и сохранение их в Редакс
React.useEffect(() => {
  if (window.location.hash === "#/") {
    window.location.hash.substring(3);
  } else if (window.location.hash) {
    const params = qs.parse(
      window.location.hash.substring(3)
    ) as unknown as SearchPizzaParams;

    const sort = optionsTypes.find((obj) => obj.sortProperty === params.sortBy)!
    
      dispatch(
      setFilters({
        currentPage: Number(params.currentPage),
        categoryId: Number(params.category),
        sort,
        searchValue: params.search,
      })
    );
    isSeacrch.current = true;
  }
}, []);

// React.useEffect(() =>{
//   if (window.location.search){  
//     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams ;
//     const sort = optionsTypes.find((obj) => obj.sortProperty === params.sortBy) 
    
//    dispatch(
//     setFilters({
//     ...params,
     
//     sort
//     })
//    );
//    isSeacrch.current = true 
//   }
// }, [])

 // 3. Получение пицц
React.useEffect(() => {
  if (!isSeacrch.current) {
    getPizzas();
  }

  isSeacrch.current = false;
}, [currentPage, categoryId, sort.sortProperty, searchValue]);




const pizzas = items.map((obj:any) => <Link to={`/pizza/${obj.id}`} key={obj.id}><PizzaBlock  {...obj}/> </Link> )
const onChangeCategory = (id:any)=>{
  dispatch(setCategoryId(id))
}




const skeletons =  [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  return (
    <div>
         <div className={styles.layout1}>
          <Categories  
          categoryId={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
/>  {  /*@ts-ignore*/ }
          <Sort />
        
        </div>
        <div className="layout2">
          { status ===  'error' ? (
             <div className={styles.root}>
            <h2>
             произошла ошибка <span>😕</span>
            </h2>
            <p>
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            </div>
            ): (status==='loading' ? skeletons : pizzas) }
        </div>  
        {  /*@ts-ignore*/ }
       <Pagination  pageCurrent={currentPage} onChangePage={onChangePage}  />
       {/* onChangePage={(number) => setCurrentPage(number)} */}
    </div>
  )
}

export default Home 
