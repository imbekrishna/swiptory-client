import { createContext, useReducer } from "react";

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
        default:
          return state;
      }
    },
    {
      user: localUser ? JSON.parse(localUser) : null,
    }
  );

  const setUser = (userData) =>
    dispatch({ type: "SAVE_USER", payload: userData });
  const removeUser = () => dispatch({ type: "REMOVE_USER" });

  return (
    <UserContext.Provider value={{ user: state.user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

export default UserContextProvider;
