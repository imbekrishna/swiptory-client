import { useCallback, useEffect, useReducer, useRef } from "react";
import api from "@api/api_instance";

/**
 * Custom hook to fetch data from given url
 * @param {string} url - URL to fetch data from
 * @param {RequestInit} fetchOptions - additional data or headers for request
 * @returns {FetchDataReturn}
 */
function useAPIData(url, queryParams) {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOADING": {
          return { ...state, loading: true };
        }
        case "RESOLVED": {
          return {
            ...state,
            loading: false,
            response: [...state.response, ...action.response.data],
            currentPage: action.response.currentPage,
            totalPages: action.response.totalPages,
            error: null,
          };
        }
        case "ERROR": {
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error,
          };
        }
        default:
          return state;
      }
    },
    {
      error: null,
      loading: false,
      response: [],
      currentPage: null,
      totalPages: null,
    }
  );

  const getStories = useCallback(
    async (page = 1) => {
      const query = new URLSearchParams({ ...queryParams, page });
      try {
        dispatch({ type: "LOADING" });
        const res = await api.get(`${url}?${query.toString()}`);
        const { data, currentPage, totalPages } = res.data;
        dispatch({
          type: "RESOLVED",
          response: { data, currentPage, totalPages },
        });
      } catch (error) {
        console.log(error);
        dispatch({ type: "ERROR", error });
      }
    },
    [url, queryParams]
  );

  const fetchNextPage = () => {
    if (state.currentPage === state.totalPages) {
      return;
    }
    getStories(state.currentPage + 1);
  };

  const inital = useRef(true);

  useEffect(() => {
    if (inital.current) {
      getStories();
      inital.current = false;
    }
  }, [getStories]);

  return {
    loading: state.loading,
    data: state.response,
    error: state.error,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    fetchNextPage,
  };
}

export default useAPIData;
