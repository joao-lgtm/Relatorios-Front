import { ThemeProvider } from "styled-components"
import { Home } from "./Pages/Home";
import { Global } from "./Style/global";
import { darkTheme, lightTheme } from "./Style/theme";
import { useTheme } from "./Hooks/ThemeSwitcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App() {
  const { theme } = useTheme();
  const queryClient = new QueryClient();


  const selectedTheme = theme ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <Global />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

