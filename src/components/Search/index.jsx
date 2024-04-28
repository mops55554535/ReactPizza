import React from 'react'

import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'


import styles from "./Search.module.scss";

function Search() {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
      console.log(str);
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        
      </div>

      <input
        ref={inputRef}
        type="search"
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
        value={value}
      />
      {/* {value && ( */}
    
      {/* //     <svg  className={styles.clear}
      //     title="Очистить"
      //     onClick={onClickClear}
        */}
     {/* )} */}
     </div>
  );
}

export default Search;