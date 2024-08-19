import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebaseConfig from "../firebase.config.js";
import UserProviderContext from "./context/UserProviderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProviderContext>
      <App />
    </UserProviderContext>
  </React.StrictMode>
);
