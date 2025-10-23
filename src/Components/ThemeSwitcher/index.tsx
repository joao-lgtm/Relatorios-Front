import { useTheme } from "../../Hooks/ThemeSwitcher";
import { Button, Container } from "./style";

export function ThemeSwitcher() {
    const { theme, handleThemeSwitch } = useTheme();

    return (
        <Container>
            <Button data-theme={theme} onClick={handleThemeSwitch}></Button>
        </Container>
    )
}