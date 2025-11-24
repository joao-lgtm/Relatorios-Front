import { ThemeProvider } from "styled-components";
import { Global } from "./Style/global";
import { darkTheme, lightTheme } from "./Style/theme";
import { useTheme } from "./Hooks/ThemeSwitcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "./Pages/SignIn";
import { Home } from "./Pages/Home";
import { useAuth } from "./Hooks/auth";
import { ToastContainer } from "react-toastify";

export function App() {
  const { theme } = useTheme();
  const queryClient = new QueryClient();
  const selectedTheme = theme ? darkTheme : lightTheme;

  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <Global />
           <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === true ? 'light' : 'dark'}
                />
        <Router>
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <SignIn />}
            />

            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
