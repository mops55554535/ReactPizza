import React, { useRef } from "react";
import styles from "./Sort.module.scss";
import {useSelector, useDispatch} from "react-redux"
import { Sort, selectedSort, setSort, sortPropertyEnum } from "../../Redux/slices/filterSlice";
import { TypeElement } from "typescript";

type SortItem = {
  name: string,
  sortProperty: sortPropertyEnum
}
type IState = {
  state: any
  filter: any
  sort: any
}
export const optionsTypes:SortItem[] = [
  {name : "популярности(DESC)", sortProperty: sortPropertyEnum.RAITING_DESC},
  {name : "популярности(ABS)", sortProperty: sortPropertyEnum.RAITING_ASC},
  {name : "цене(DESC)", sortProperty:sortPropertyEnum.PRICE_DESC},
  {name : "цене(ASC)", sortProperty: sortPropertyEnum.PRICE_ASC},
  {name : "алфавиту(DESC)", sortProperty: sortPropertyEnum.TITLE_DESC},
  {name : "алфавиту(ACS)", sortProperty: sortPropertyEnum.TITLE_ASC}
   
];
type Isort = {
  sort:any
  
}

type PopupClick = MouseEvent & {
  path: Node[]
} 

const SortPopup: React.FC = () => {
  const dispatch = useDispatch()
  const sort:any = useSelector(selectedSort)
  const sortRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false);



  const onClickOption = (obj:SortItem) => {
    // OnChangeSort(index);
    
    dispatch(setSort(obj))
    setOpen(false);
  };
  React.useEffect(()=>{
    const handleClick = (event: MouseEvent) =>{
      const _event = event as PopupClick
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
      }
      document.body.addEventListener('click', handleClick)
      return() =>{
        document.body.removeEventListener('click', handleClick)
      }
    }
  )
  

  return (
    <div ref= {sortRef} className={styles.sort}>
      <div className={styles.indicator}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
       fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" />
        </svg>
      </div>
      <div className={styles.text}>сортировать по</div>
      <div className={styles.options}>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
        {open && (
          <ul className={styles.list}>
            {optionsTypes.map((option, index) => (
              <li
                className={`${styles.item} ${
                  sort.sortProperty === option.sortProperty ? `${styles.active}` : ""
                }`}
                key={index}
                onClick={() => onClickOption(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SortPopup;
