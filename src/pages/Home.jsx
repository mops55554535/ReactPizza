import React, { useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux"
import { setCategoryId } from "../Redux/slices/filterSlice";
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




const Home = () => {
  const { categoryId, sort} = useSelector((state) => state.filter)
  const [currentPage,setCurrentPage] = React.useState(1);
  const {searchValue } = React.useContext(SearchContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const isMounted = React.useRef(false)

  const onChangePage = (number) =>{
    dispatch(setCurrentPage(number))
  }

const dispatch = useDispatch()
const navigate = useNavigate()
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

function FetchPizzas(){
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

}
React.useEffect(() =>{
  if(!isSeacrch.current){
    FetchPizzas()
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
          { loading ? skeletons : pizzas }
        </div>
       <Pagination onChangePage={(number) => setCurrentPage(number)} />

    </div>
  )
}

export default Home 
