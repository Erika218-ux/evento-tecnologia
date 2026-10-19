import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    {/* O BrowserRouter permite trocar de página sem precisar recarregar o site inteiro. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
 {/* O App contém o layout principal e as páginas do projeto. */}