import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "app/contexts/JWTContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <AuthProvider>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </AuthProvider>
  // </React.StrictMode>
);
