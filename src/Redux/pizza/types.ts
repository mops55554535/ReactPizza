export type SearchPizzaParams = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: string;
}
export type Pizza = {
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

export interface PizzaSliceState{
  items: Pizza[];
  status: Status
}


export const initialState:PizzaSliceState  = {
  items: [],
  status: Status.LOADING, 
};