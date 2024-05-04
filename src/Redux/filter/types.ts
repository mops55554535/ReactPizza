
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
