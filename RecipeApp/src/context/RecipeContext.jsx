/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const recipecontext = createContext(null);

const RecipeContext = (props) => {
  const [data, setdata] = useState(() => {
    try {
      const stored = localStorage.getItem("rv_recipes");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("rv_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rv_recipes", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("rv_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <recipecontext.Provider value={{ data, setdata, favorites, toggleFavorite }}>
      {props.children}
    </recipecontext.Provider>
  );
};

export default RecipeContext;
