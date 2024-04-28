import React from "react";
import styles from "./Categories.module.scss";

function Categories({categoryId, onChangeCategory}) {
 
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
              categoryId === index ? `${styles.active}` : ""
            }`}
            key={index}
            onClick={() => onChangeCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default Categories;
