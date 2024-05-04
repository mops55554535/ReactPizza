
import { CartItemSlice } from "../Redux/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () =>{
  const data = localStorage.getItem('cart')
  const items =  data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  if (items.length){
    return {
      items:items as CartItemSlice[],
      totalPrice
  }
}else{
  throw new Error("error");
  
}

}

