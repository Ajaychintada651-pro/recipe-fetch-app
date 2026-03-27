import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import './HomePage.css';

const APP_ID = 'afc94c63';
const APP_KEY = '5ff1c5fd034cff389748a20b3634cc21';

const CATEGORIES = ['Chicken', 'Pasta', 'Salad', 'Beef', 'Vegan', 'Dessert', 'Seafood', 'Soup'];

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data.hits || []);
      } catch (err) {
        setError('Could not load recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setQuery(search.trim());
    setSearch('');
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Find Your Next Favorite Recipe</h1>
        <p className="hero-sub">Search from thousands of recipes powered by Edamam</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients or dishes..."
          />
          <button className="search-btn" type="submit">Search</button>
        </form>
        <div className="category-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`chip ${query.toLowerCase() === cat.toLowerCase() ? 'chip-active' : ''}`}
              onClick={() => setQuery(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="results-section">
        <h2 className="results-heading">
          {loading ? 'Searching...' : `Results for "${query}"`}
        </h2>
        {error && <p className="fetch-error">{error}</p>}
        {loading ? (
          <div className="loading-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map(({ recipe }) => (
              <RecipeCard key={recipe.label} recipe={recipe} />
            ))}
            {!loading && recipes.length === 0 && !error && (
              <p className="no-results">No recipes found. Try a different search.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
