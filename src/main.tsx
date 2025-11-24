import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThemeSwitchProvider } from "./Hooks/ThemeSwitcher";
import { AuthProvider } from "./Hooks/auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeSwitchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeSwitchProvider>
  </StrictMode>
);
