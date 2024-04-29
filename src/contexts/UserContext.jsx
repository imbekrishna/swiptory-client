import { createContext, useReducer } from "react";
import { nanoid } from "nanoid";

const LS_KEY = "swiptoryuser";
const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const localUser = window.localStorage.getItem(LS_KEY);

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SAVE_USER": {
          window.localStorage.setItem(LS_KEY, JSON.stringify(action.payload));
          return { user: action.payload };
        }
        case "REMOVE_USER": {
          window.localStorage.removeItem(LS_KEY);
          return { user: null };
        }
        case "UPDATE_KEY": {
          return { ...state, refreshKey: nanoid(10) };
        }
        default:
          return state;
      }
    },
    {
      user: localUser ? JSON.parse(localUser) : null,
      refreshKey: nanoid(10),
    }
  );

  const setUser = (userData) =>
    dispatch({ type: "SAVE_USER", payload: userData });
  const removeUser = () => dispatch({ type: "REMOVE_USER" });
  const updateKey = () => dispatch({ type: "UPDATE_KEY" });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        refreshKey: state.refreshKey,
        setUser,
        removeUser,
        updateKey,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

export default UserContextProvider;
