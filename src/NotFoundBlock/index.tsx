import React from 'react'
// import NotFound from '../pages/NotFound'
import styles from "./NotFoundBlock.module.scss";
import { Link } from 'react-router-dom';

const NotFoundBlock:React.FC= () => {
  return (
    <div className={styles.notFoundBlock}>
      <span className={styles.emoji}>😕</span>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине
      </p>
      <Link className={styles.link} to="/">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundBlock;
