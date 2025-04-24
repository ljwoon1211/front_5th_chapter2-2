import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function startApp() {
  const { worker } = await import("./mocks/browser.ts");

  await worker
    .start({
      onUnhandledRequest: "bypass", // 핸들링되지 않은 요청은 그냥 통과
    })
    .catch((err) => {
      console.error("Error starting MSW:", err);
    });

  // React 앱 렌더링
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

startApp();
