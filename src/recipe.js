import React from 'react'
import styles from './recipe.module.css'

const Recipe = ({title,calories,image,ingredients}) => {
  return (
    <div className={styles.recipe}>
      <h1 className={styles.title}>{title}</h1>
      <ol>
        {ingredients.map(ingredient=>(
            <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>{calories}</p>
      <img src={image} className={styles.image}/>
    </div>
  )
}

export default Recipe;
