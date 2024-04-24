import React, { useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";


const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(()=>{

    fetch("https://6629232654afcabd07385199.mockapi.io/Items")
    .then((res) =>{
      return res.json()})
      .then((arr) =>{
      setItems(arr) 
      setLoading(false)
    })
  },[])

  return (
    <div>
         <div className="layout1">
          <Categories />
          <Sort />
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
