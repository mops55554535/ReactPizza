import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import axios  from 'axios'
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const {  sortBy,order,category,search,currentPage } = params;
    const { data } = await axios.get(
      `https://6629232654afcabd07385199.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
     
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
      console.log(state.items)
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;