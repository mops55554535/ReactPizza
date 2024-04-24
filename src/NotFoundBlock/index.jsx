import React from 'react'
// import NotFound from '../pages/NotFound'
import style from "./NotFoundBlock.module.scss";
export default function NotFoundBlock() {
  return (
    <div>  
        <div className={style.root}>
        <div className="layout2">
            <p className={style.notFoundText}>такого адреса нет /_/ </p>
        </div>
        </div>
    </div>
  )
}
