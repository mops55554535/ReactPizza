
export type CartItemSlice  = {
  id: string,
  title:string,
  desc: string
  price:number,
  imgUrl: string,
  types: string,
  size: number
  count: number
} 

export interface CartSliceState{
  totalPrice: number,
  items: CartItemSlice[]
  
}