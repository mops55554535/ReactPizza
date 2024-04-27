import React, { useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";


import styles from "./Home.module.scss";
import Pagination from "../Pagination";
import { SearchContext } from "../App";

import {useSelector, useDispatch} from "react-redux"
import { setCategoryId } from "../Redux/slices/filterSlice";

const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId)
  console.log(categoryId)
  
  const {searchValue } = React.useContext(SearchContext)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  // const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  })
  const order = sortType.sortProperty.includes("-") ? 'asc' : 'desc'
  const sortBy = sortType.sortProperty.replace('-', '')
  const category = categoryId > 0 ? `category=${categoryId}`: ``
  const search = searchValue  ? `&search=${searchValue}`: ``
 
  const dispatch = useDispatch()


useEffect(()=>{
  setLoading(true)
    fetch(`https://6629232654afcabd07385199.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}` )

    .then((res) =>{
      return res.json()})
      .then((arr) =>{
      setItems(arr) 
      setLoading(false)
    })
  },[categoryId, sortType, searchValue,currentPage])


const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)


const OnChangeCategory = (id)=>{
  console.log(id)
  dispatch(setCategoryId(id))
}

const skeletons =  [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  return (
    <div>
         <div className={styles.layout1}>
          <Categories value ={categoryId} OnChangeCategory={OnChangeCategory} />
          <Sort value={sortType} OnChangeSort={(i) =>setSortType(i)}/>
        </div>
        <div className="layout2">
          { loading ? skeletons : pizzas }
        </div>
       <Pagination onChangePage ={(number) => setCurrentPage(number)} />

    </div>
  )
}

export default Home 
