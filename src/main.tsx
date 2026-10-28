import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (new URLSearchParams(window.location.search).has("print")) {
  document.body.classList.add("print-mode");
}

createRoot(document.getElementById("root")!).render(<App />);
