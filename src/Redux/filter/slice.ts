import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, sortPropertyEnum } from "./types";

const initialState = { 
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: sortPropertyEnum.PRICE_DESC
  
  }
 }

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
     
    
      state.sort = action.payload;
    },
    setPageCurrent(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
     
    },
    setFilters(state, action:PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
          
      state.sort = action.payload.sort;
    },
    
  },
})

export const { setCategoryId, setSearchValue, setSort, setPageCurrent, setFilters } = filterSlice.actions

export default filterSlice.reducer