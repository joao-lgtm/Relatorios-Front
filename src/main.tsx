import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ThemeSwitchProvider } from './Hooks/ThemeSwitcher'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeSwitchProvider>
      <App />
    </ThemeSwitchProvider>
  </StrictMode>,
)
