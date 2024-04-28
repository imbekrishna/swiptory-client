import { createContext, useEffect, useReducer, useState } from "react";
import api from "@api/api_instance";

const CategoryContext = createContext(null);

const CategoryContextProvider = ({ children }) => {
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: null,
  });
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_CATEGORIES": {
          return { ...state, categories: action.payload };
        }
        case "SET_ACTIVE_CATEEGORY": {
          return { ...state, activeCategory: action.payload };
        }
        default:
          return state;
      }
    },
    {
      categories: null,
      activeCategory: null,
    }
  );

  useEffect(() => {
    setFetchStatus((prev) => ({ ...prev, loading: true }));
    api
      .get("/api/category")
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: "SET_CATEGORIES", payload: data });
      })
      .catch((error) => {
        setFetchStatus((prev) => ({ ...prev, error: error }));
        console.log(error);
      })
      .finally(() => {
        setFetchStatus((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const setCategories = (categories) => {
    dispatch({ type: "SET_CATEGORIES", payload: categories });
  };

  const setActiveCategory = (category) => {
    dispatch({ type: "SET_ACTIVE_CATEEGORY", payload: category });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        activeCategory: state.activeCategory,
        fetchStatus,
        setCategories,
        setActiveCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext };

export default CategoryContextProvider;
