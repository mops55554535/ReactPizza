
export type CartItemSlice = {
  id: string,
  title:string,
  price:number,
  imgUrl: string,
  type: number,
  size: number
  count: number
}

export interface CartSliceState{
  totalPrice: number,
  items: CartItemSlice[]
  
}