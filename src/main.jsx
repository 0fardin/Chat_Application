import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18
import "./index.css";
import App from "./App";
import { store } from "../Store";
import { Provider } from "react-redux";

// Create a root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App with Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
