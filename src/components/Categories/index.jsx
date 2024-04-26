import React from "react";
import styles from "./Categories.module.scss";

function Categories({value, OnChangeCategory}) {
 
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (

    <div className={styles.categories}>
      <ul className={styles.list}>
        {categories.map((categoryName, index) => (
          <li

            className={`${styles.item} ${
              value === index ? `${styles.active}` : ""
            }`}
            key={index}
            onClick={() => OnChangeCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default Categories;
