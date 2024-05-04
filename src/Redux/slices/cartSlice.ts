import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Rootstate } from '../Store'

export type CartItemSlice = {
  id: string,
  title:string,
  price:number,
  imgUrl: string,
  type: number,
  size: number
  count: number
}

interface CartSliceState{
  totalPrice: number,
  items: CartItemSlice[]
}

const initialState: CartSliceState = { 
  items: [],
  totalPrice: 0,
 }
 export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemSlice>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart =(state: Rootstate) => state.cart
export const selectCartItemById = (id:string) => (state: Rootstate) => state.cart.items.find((obj) => obj.id === id)
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;