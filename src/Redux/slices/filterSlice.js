import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  
  }
 }

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
     
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      console.log(action.sortTypeObj)
      state.sort = action.payload;
    },
    setPageCurrent(state, action) {
      state.currentPage = action.payload;
      console.log(state.currentPage)
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortTypeObj = action.payload.sort;
    },
    
  },
})

export const selectedSort = (state) => state.filter.sort

export const selectFilter = (state) => state.filter

export const { setCategoryId, setSearchValue, setSort, setPageCurrent, setFilters } = filterSlice.actions

export default filterSlice.reducer