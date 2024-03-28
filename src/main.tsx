import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { PrimeReactProvider } from "primereact/api";

const pt = {
  datatable: {
    root: { className: "w-full" },
    wrapper: { className: " border-round-sm" },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ pt }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
