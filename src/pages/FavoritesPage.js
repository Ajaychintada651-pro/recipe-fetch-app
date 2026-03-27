import React from 'react';
import { useApp } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites } = useApp();

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>My Saved Recipes</h1>
        <p>{favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved</p>
      </div>
      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <span className="empty-icon">♡</span>
          <h2>No saved recipes yet</h2>
          <p>Click the heart icon on any recipe to save it here.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.label} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
