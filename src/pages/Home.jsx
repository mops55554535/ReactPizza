import React, { useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux"
import { selectFilter, setCategoryId } from "../Redux/slices/filterSlice";
import {setFilters} from '../Redux/slices/filterSlice'

import axios  from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search";
import {optionsTypes} from '../components/Sort/index'

import Pagination from "../Pagination";
import { SearchContext } from "../App";



import styles from "./Home.module.scss";
import { fetchPizzas, selectPizzaData } from "../Redux/slices/pizzaSlice";

import {setPageCurrent} from "../Redux/slices/filterSlice";


const Home = () => {
 const dispatch = useDispatch()
const navigate = useNavigate()

 const { categoryId, sort, currentPage, searchValue } =
 useSelector(selectFilter);


  const isMounted = React.useRef(false) 

  const {status, items} = useSelector(selectPizzaData)
 
  const onChangePage = (number) => {
    dispatch(setPageCurrent(number));
  };


const isSeacrch = React.useRef(false)
React.useEffect(() =>{
  if (window.location.search){  
    const params = qs.parse(window.location.search.substring(1));
    const sort = optionsTypes.find((obj) => obj.sortProperty === params.sortProperty) 
    
   dispatch(
    setFilters({
    ...params,
    sort
    })
   );
   isSeacrch.current = true 
  }
}, [])

async function getPizzas(){
  
  const order = sort.sortProperty.includes("-") ? 'asc' : 'desc'
  const sortBy = sort.sortProperty.replace('-', '')
  const category = categoryId > 0 ? `category=${categoryId}`: ``
  const search = searchValue  ? `&search=${searchValue}`: ``
  

    dispatch(fetchPizzas({
      sortBy,
      order,  
      category,
      search,
      currentPage
    }))  
    
  }
  


React.useEffect(() =>{
  if(!isSeacrch.current){
    getPizzas()
  }
isSeacrch.current = false
}, [categoryId, sort.sortProperty, searchValue, currentPage]);

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

const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
const onChangeCategory = (id)=>{
  dispatch(setCategoryId(id))
}




const skeletons =  [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  return (
    <div>
         <div className={styles.layout1}>
          <Categories  
          categoryId={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
/>
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
       <Pagination pageCurrent={currentPage} onChangePage={onChangePage}  />
       {/* onChangePage={(number) => setCurrentPage(number)} */}
    </div>
  )
}

export default Home 
