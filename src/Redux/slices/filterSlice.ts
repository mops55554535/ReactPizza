import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Rootstate } from '../Store'


export enum sortPropertyEnum {
  RAITING_DESC = 'rating',
  RAITING_ASC  = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC  = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC  = '-price'

}

export interface Sort{
  name: string
  sortProperty:  sortPropertyEnum;
}
export interface FilterSliceState{
  categoryId: number,
  currentPage: number,
  searchValue: string,
  sort: Sort
}



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

export const selectedSort = (state: Rootstate) => state.filter.sort

export const selectFilter = (state: Rootstate) => state.filter

export const { setCategoryId, setSearchValue, setSort, setPageCurrent, setFilters } = filterSlice.actions

export default filterSlice.reducer