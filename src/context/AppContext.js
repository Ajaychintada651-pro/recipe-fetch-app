import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('recipeAppUser');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedFavs = localStorage.getItem('recipeAppFavorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const login = (username) => {
    const authUser = { username };
    setUser(authUser);
    localStorage.setItem('recipeAppUser', JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recipeAppUser');
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.label === recipe.label);
      const updated = exists
        ? prev.filter((r) => r.label !== recipe.label)
        : [...prev, recipe];
      localStorage.setItem('recipeAppFavorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (label) => favorites.some((r) => r.label === label);

  return (
    <AppContext.Provider value={{ user, login, logout, favorites, toggleFavorite, isFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
