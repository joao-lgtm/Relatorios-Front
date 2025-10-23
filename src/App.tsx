import { ThemeProvider } from "styled-components"
import { Home } from "./Pages/Home";
import { Global } from "./Style/global";
import { darkTheme, lightTheme } from "./Style/theme";
import { useTheme } from "./Hooks/ThemeSwitcher";

export function App() {
  const { theme } = useTheme();

  const selectedTheme = theme ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Global />
      <Home />
    </ThemeProvider>
  )
}

