import { PayloadAction, createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import axios  from 'axios'
import { Rootstate } from '../Store';
import { CartItemSlice } from './cartSlice';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams >(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const {  sortBy,order,category,search,currentPage } = params;
    
    const { data } = await axios.get<Pizza[]>(
      `https://6629232654afcabd07385199.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
     
    );
    return data ;
  }
);
type Pizza = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  sizes: number[];
  types: number[];
}

export enum Status{
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState{
  items: Pizza[];
  status: Status
}


const initialState:PizzaSliceState  = {
  items: [],
  status: Status.LOADING, 
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status =  Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status =  Status.SUCCESS;
     
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status =  Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: Rootstate) => state.pizza

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;