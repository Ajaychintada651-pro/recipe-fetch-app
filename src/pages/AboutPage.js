import React from 'react';
import './AboutPage.css';

const features = [
  { icon: '🔍', title: 'Smart Search', desc: 'Search thousands of recipes by dish name or ingredient.' },
  { icon: '🥗', title: 'Category Browse', desc: 'Browse curated categories — chicken, pasta, vegan, and more.' },
  { icon: '♥', title: 'Favorites', desc: 'Save recipes to your favorites list, persisted across sessions.' },
  { icon: '🍽', title: 'Detailed View', desc: 'Full ingredient list, nutrition bars, diet labels, and source link.' },
  { icon: '🔥', title: 'Nutrition Info', desc: 'Calories, protein, fat, carbs, and fiber per serving at a glance.' },
  { icon: '📱', title: 'Responsive', desc: 'Works great on desktop, tablet, and mobile screens.' },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <span className="about-hero-icon">🍽</span>
        <h1>About RecipeFinder</h1>
        <p>
          RecipeFinder is a modern recipe discovery app powered by the Edamam Recipe API.
          Search, explore, and save recipes with full nutritional information — all in one place.
        </p>
      </section>

      <section className="about-features">
        <h2>Features</h2>
        <div className="features-grid">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="feature-card">
              <span className="feature-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-how">
        <h2>How to Use</h2>
        <ol className="how-list">
          <li>Sign in with <strong>admin</strong> / <strong>password</strong></li>
          <li>Use the search bar or click a category chip on the Home page</li>
          <li>Click any recipe card to see full details and nutrition</li>
          <li>Hit the <strong>♡</strong> icon or <strong>Save Recipe</strong> to add it to Favorites</li>
          <li>Visit the Favorites page to see all your saved recipes</li>
        </ol>
      </section>

      <section className="about-credits">
        <h2>Credits</h2>
        <p>
          Recipe data provided by the{' '}
          <a href="https://developer.edamam.com/" target="_blank" rel="noreferrer">
            Edamam Recipe API
          </a>.
          Built with React and React Router.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
