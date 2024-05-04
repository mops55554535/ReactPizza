import { CartItemSlice } from "../Redux/cart/types";

;

export const calcTotalPrice = (items: CartItemSlice[]) =>{
  return items.reduce((sum, obj) => {
  return (obj.price * obj.count) + sum;
  
}, 0);
}
