import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
function FullPizza() {
  const [pizza, setPizza] = React.useState()
  const {id} = useParams();
  const navigate = useNavigate();

React.useEffect(()=>{
  async function FetchPizza() {
  
  try {
    const data = await axios.get('https://6629232654afcabd07385199.mockapi.io/Items/'+id)
    
    setPizza(data.data)

  }catch(e){
    alert("error fetch")
    navigate("/")
    console.dir(e)}
  }
    FetchPizza()
  }, []) 
if(!pizza){
  return 'Loading...'
}
  return (
    <div>
      <img src={pizza.imgUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>

    </div>
  )
}
export default FullPizza