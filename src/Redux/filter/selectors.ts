import { Rootstate } from "../Store"

export const selectedSort = (state: Rootstate) => state.filter.sort

export const selectFilter = (state: Rootstate) => state.filter
