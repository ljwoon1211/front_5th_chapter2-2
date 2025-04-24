import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function initializeMockServiceWorker() {
  if (import.meta.env.MODE === "api-mock") {
    console.log("Starting MSW in API mock mode...");
    const { worker } = await import("./mocks/browser.ts");

    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
  return Promise.resolve();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
