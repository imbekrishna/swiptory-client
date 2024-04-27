import { createContext, useEffect, useReducer, useContext } from "react";
import { ModalContext } from "./ModalContext";
import api from "../api/api_instance";

const CategoryContext = createContext(null);

const CategoryContextProvider = ({ children }) => {
  const { toggleLoadingModal } = useContext(ModalContext);

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
    toggleLoadingModal();
    api
      .get("/api/category")
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: "SET_CATEGORIES", payload: data });
      })
      .catch((error) => console.log(error.response.data))
      .finally(toggleLoadingModal);
  }, [toggleLoadingModal]);

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
