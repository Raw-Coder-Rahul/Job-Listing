// Frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { ToasterProvider } from "./components/Toaster";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </Provider>
  </React.StrictMode>
);