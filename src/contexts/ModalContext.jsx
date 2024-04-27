import { createContext, useReducer } from "react";

const ModalContext = createContext(null);

const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "TOGGLE_AUTH_MODAL": {
          return {
            ...state,
            authModal: {
              hidden: !state.authModal.hidden,
              type: action.payload ?? state.authModal.type,
            },
          };
        }
        case "TOGGLE_ADD_MODAL": {
          return {
            ...state,
            addModal: {
              hidden: !state.addModal.hidden,
              type: action.payload.type ?? state.addModal.type,
              data: action.payload.data ?? state.addModal.data,
            },
          };
        }
        case "TOGGLE_STORY_MODAL": {
          return {
            ...state,
            storyModal: {
              hidden: !state.storyModal.hidden,
              activeStoryId: action.payload.data,
            },
          };
        }
        default:
          return state;
      }
    },
    {
      authModal: { hidden: true, type: "LOGIN" },
      addModal: { hidden: true, type: "NEW", data: null },
      storyModal: { hidden: true, activeStoryId: null },
    }
  );

  const toggleAuthModal = (type = "LOGIN") => {
    console.log("modal toggled");
    dispatch({ type: "TOGGLE_AUTH_MODAL", payload: type });
  };
  const toggleAddModal = (type = "NEW", data = null) => {
    dispatch({ type: "TOGGLE_ADD_MODAL", payload: { type, data } });
  };
  const toggleStoryModal = (data = null) => {
    console.log(data);
    dispatch({ type: "TOGGLE_STORY_MODAL", payload: { data } });
  };

  return (
    <ModalContext.Provider
      value={{
        authModal: state.authModal,
        addModal: state.addModal,
        storyModal: state.storyModal,
        toggleAddModal,
        toggleAuthModal,
        toggleStoryModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext };

export default ModalContextProvider;
