import React from "react";
import { useDispatch } from "react-redux";
import clsx from 'clsx'
import { addItem, removeItem,minusItem, clearItems, CartItemSlice } from "../../Redux/slices/cartSlice";

import styles from "./CartItem.module.scss";

type CartItemProps ={
  id:string,
  title: string,
  sizes: number,
  type: string,
  size: number,
  price: number,
  count:number,
  imgUrl:string
}

const CartItem:React.FC<CartItemProps> =  ({ id, title,sizes, type, size, price, count, imgUrl }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      }as CartItemSlice)
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить товар?"))
      dispatch(removeItem(id));
  };

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={imgUrl} alt="Pizza" />
        </div>
        <div className={styles.about}>
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
          <div className={styles.options}>
            {type}, {size} <span>{sizes} см.</span>
          </div>
        </div>
      </div>

      <div className={styles.number}>
        <button 
            disabled={count === 1}
            className={clsx("countBtn", {
            "countBtnDisabled": count === 1,
          })}   onClick={onClickMinus}>-</button>

        <div>{count}</div>
        <button className="btn_plus"  onClick={onClickPlus}>+</button>
      </div>
      <div className={styles.cost}>
        {price * count} <span> ₽</span>
      </div>
      <div className={styles.delete} onClick={onClickRemove}>
        x
      </div>
    </div>
  );
}

export default CartItem;