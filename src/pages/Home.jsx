import React, { useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import styles from "./Home.module.scss";

const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  })

  const order = sortType.sortProperty.includes("-") ? 'asc' : 'desc'
  const sortBy = sortType.sortProperty.replace('-', '')
  const category = categoryId > 0 ? `category=${categoryId}`: ``
useEffect(()=>{
  setLoading(true)
    fetch(`https://6629232654afcabd07385199.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}` )

    .then((res) =>{
      return res.json()})
      .then((arr) =>{
      setItems(arr) 
      setLoading(false)
    })
  },[categoryId, sortType])

console.log(categoryId, sortType )
  return (
    <div>
         <div className={styles.layout1}>
          <Categories value ={categoryId} OnChangeCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} OnChangeSort={(i) =>setSortType(i)}/>
        </div>
        <div className="layout2">
          {
            loading 
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) 
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/> )
          }
        </div>
    </div>
  )
}

export default Home 
