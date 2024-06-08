import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ToastProvider from "./AudiogramToast.jsx";
import "../src/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider position="bottom-right">
      <App />
    </ToastProvider>
  </React.StrictMode>
);
