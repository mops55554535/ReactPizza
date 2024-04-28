import React, { useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios  from "axios";

import Search from "../components/Search";
import styles from "./Home.module.scss";

import Pagination from "../Pagination";
import { SearchContext } from "../App";

import {useSelector, useDispatch} from "react-redux"
import { setCategoryId } from "../Redux/slices/filterSlice";

const Home = () => {
  const { categoryId, sort} = useSelector((state) => state.filter)
 
   const [currentPage,setCurrentPage] = React.useState(1);

  const {searchValue } = React.useContext(SearchContext)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
 


  const onChangePage = (number) =>{
    dispatch(setCurrentPage(number))
  }

const dispatch = useDispatch()
 
React.useEffect(() =>{
  setLoading(true)

  const order = sort.sortProperty.includes("-") ? 'asc' : 'desc'
  const sortBy = sort.sortProperty.replace('-', '')
  const category = categoryId > 0 ? `category=${categoryId}`: ``
  const search = searchValue  ? `&search=${searchValue}`: ``

  axios.get(`https://6629232654afcabd07385199.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  ).then((res) =>{
      setItems(res.data)
     
      setLoading(false)
    })


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
          <Search/>
        </div>
        <div className="layout2">
          { loading ? skeletons : pizzas }
        </div>
       <Pagination onChangePage={(number) => setCurrentPage(number)} />

    </div>
  )
}

export default Home 
