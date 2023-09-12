import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import TipCalculator from "./challenges";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <TipCalculator /> */}
  </React.StrictMode>
);
