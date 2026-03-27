import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './RecipeDetailPage.css';

const NutrientBar = ({ label, value, unit, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="nutrient-row">
      <div className="nutrient-label-wrap">
        <span className="nutrient-label">{label}</span>
        <span className="nutrient-value">{Math.round(value)}{unit}</span>
      </div>
      <div className="nutrient-track">
        <div className="nutrient-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
};

const RecipeDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useApp();

  if (!state?.recipe) {
    return (
      <div className="detail-error">
        <p>Recipe not found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const r = state.recipe;
  const favorited = isFavorite(r.label);
  const totalNutrients = r.totalNutrients || {};

  const nutrients = [
    { key: 'ENERC_KCAL', label: 'Calories', unit: ' kcal', max: 2000, color: '#f5a623' },
    { key: 'PROCNT', label: 'Protein', unit: 'g', max: 100, color: '#3498db' },
    { key: 'FAT', label: 'Fat', unit: 'g', max: 100, color: '#e74c3c' },
    { key: 'CHOCDF', label: 'Carbs', unit: 'g', max: 300, color: '#2ecc71' },
    { key: 'FIBTG', label: 'Fiber', unit: 'g', max: 30, color: '#9b59b6' },
  ];

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-hero">
        <div className="detail-image-wrap">
          <img src={r.image} alt={r.label} className="detail-image" />
        </div>
        <div className="detail-overview">
          <div className="detail-tags">
            {r.cuisineType?.map((c) => (
              <span key={c} className="detail-tag cuisine-tag">{c}</span>
            ))}
            {r.mealType?.map((m) => (
              <span key={m} className="detail-tag meal-tag">{m}</span>
            ))}
          </div>
          <h1 className="detail-title">{r.label}</h1>
          <div className="detail-stats">
            <div className="stat-box">
              <span className="stat-icon">🔥</span>
              <span className="stat-num">{Math.round(r.calories)}</span>
              <span className="stat-label">Calories</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">⏱</span>
              <span className="stat-num">{r.totalTime > 0 ? r.totalTime : '—'}</span>
              <span className="stat-label">Minutes</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">👥</span>
              <span className="stat-num">{r.yield}</span>
              <span className="stat-label">Servings</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">📋</span>
              <span className="stat-num">{r.ingredients?.length}</span>
              <span className="stat-label">Ingredients</span>
            </div>
          </div>
          <div className="detail-diet-labels">
            {r.dietLabels?.map((d) => (
              <span key={d} className="diet-badge">{d}</span>
            ))}
            {r.healthLabels?.slice(0, 5).map((h) => (
              <span key={h} className="health-badge">{h}</span>
            ))}
          </div>
          <div className="detail-actions">
            <button
              className={`fav-action-btn ${favorited ? 'fav-action-active' : ''}`}
              onClick={() => toggleFavorite(r)}
            >
              {favorited ? '♥ Saved' : '♡ Save Recipe'}
            </button>
            {r.url && (
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="source-link"
              >
                View Full Instructions ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {r.ingredients?.map((ing, i) => (
              <li key={i} className="ingredient-item">
                <img
                  src={ing.image}
                  alt={ing.food}
                  className="ing-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="ing-info">
                  <span className="ing-text">{ing.text}</span>
                  <span className="ing-food">{ing.food}</span>
                </div>
                <span className="ing-weight">{Math.round(ing.weight)}g</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="nutrition-section">
          <h2>Nutrition (per serving)</h2>
          <div className="nutrition-bars">
            {nutrients.map(({ key, label, unit, max, color }) =>
              totalNutrients[key] ? (
                <NutrientBar
                  key={key}
                  label={label}
                  value={totalNutrients[key].quantity / (r.yield || 1)}
                  unit={unit}
                  max={max}
                  color={color}
                />
              ) : null
            )}
          </div>
          <div className="cautions-wrap">
            {r.cautions?.length > 0 && (
              <>
                <h3>Cautions</h3>
                <div className="caution-tags">
                  {r.cautions.map((c) => (
                    <span key={c} className="caution-tag">{c}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
