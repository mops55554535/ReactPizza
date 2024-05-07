import React from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import style from './FullPizza.module.scss';

function FullPizza() {
  const [pizza, setPizza] = React.useState<{
    imgUrl: string,
    title: string,
    price: number,
    desc: string
  }>() 
  const {id} = useParams();
  const navigate = useNavigate();

React.useEffect(()=>{
  async function FetchPizza() {
  
  try {
    const data = await axios.get('https://6629232654afcabd07385199.mockapi.io/Items/'+id)
    
    setPizza(data.data)

  }catch(e){
    alert("error")
    navigate("/")
    console.dir(e)}
  }
    FetchPizza()
  }, []) 
if(!pizza){
  return 'Loading pizza'
}
  return (
    <div className={style.container}>
      <div className={style.container_sub}>
       <img className={style.imgUrl} src={pizza.imgUrl} />
      <h2 className={style.title}>  {pizza.title}</h2>
      <h4 className={style.price}>  {pizza.price}</h4>
      <h4 className={style.desc}>  {pizza.desc}</h4>
      <Link to ="/"><div className={style.buttonBack}>назад</div></Link>
    </div>
     
    </div>
  )
}
export default FullPizza