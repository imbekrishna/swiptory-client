import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CategoryContextProvider from "./contexts/CategoryContext.jsx";
import UserContextProvider from "./contexts/UserContext.jsx";
import ModalContextProvider from "./contexts/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalContextProvider>
      <CategoryContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </CategoryContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
