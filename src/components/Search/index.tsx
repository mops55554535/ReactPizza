import React from 'react'
import {useSelector, useDispatch} from "react-redux"

import debounce from 'lodash.debounce'


import styles from "./Search.module.scss";
import { setSearchValue } from '../../Redux/filter/slice';

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string ) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <svg
          enableBackground="new 0 0 32 32"
          id="EditableLine"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14"
            cy="14"
            fill="none"
            id="XMLID_42_"
            r="9"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></circle>
          <line
            fill="none"
            id="XMLID_44_"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="27"
            x2="20.366"
            y1="27"
            y2="20.366"
          ></line>
        </svg>
      </div>

      <input
        ref={inputRef}
        type="search"
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
        value={value}
      />
      {value && (
        <button
          className={styles.clear}
          title="Очистить"
          onClick={onClickClear}
        >
         
        </button>
      )}
    </div>
  );
}

export default Search;