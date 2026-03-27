import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(recipe.label);

  const handleCardClick = () => {
    navigate('/recipe', { state: { recipe } });
  };

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="card-image-wrap">
        <img src={recipe.image} alt={recipe.label} className="card-image" />
        <button
          className={`fav-btn ${favorited ? 'fav-active' : ''}`}
          onClick={handleFav}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorited ? '♥' : '♡'}
        </button>
        <div className="card-cuisine">
          {recipe.cuisineType?.[0] || 'World'}
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{recipe.label}</h2>
        <div className="card-meta">
          <span className="meta-item">
            <span className="meta-icon">🔥</span>
            {Math.round(recipe.calories)} kcal
          </span>
          <span className="meta-item">
            <span className="meta-icon">⏱</span>
            {recipe.totalTime > 0 ? `${recipe.totalTime} min` : 'N/A'}
          </span>
          <span className="meta-item">
            <span className="meta-icon">👥</span>
            {recipe.yield} servings
          </span>
        </div>
        <div className="card-diet-labels">
          {recipe.dietLabels?.slice(0, 2).map((label) => (
            <span key={label} className="diet-tag">{label}</span>
          ))}
        </div>
        <button className="view-btn">View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
