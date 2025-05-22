import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ShoppingCardProvider from "./context/ShoppingCard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShoppingCardProvider>
      <App />
    </ShoppingCardProvider>
  </StrictMode>
);
