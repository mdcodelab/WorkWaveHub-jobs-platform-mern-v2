import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center" toastStyle={{ textAlign: "center" }}/>
  </React.StrictMode>
);
