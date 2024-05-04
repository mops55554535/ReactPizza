import React from "react";
import styles from "./Categories.module.scss";
import useWhyDidYouUpdate  from "ahooks/lib/useWhyDidYouUpdate";
type CategoriesProps = {
  categoryId: number,
  onChangeCategory: (index: number) => void
}

const Categories: React.FC<CategoriesProps>= React.memo(
  ({categoryId, onChangeCategory }) => {
    
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
  },  
)
export default Categories;