import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { ThemeProvider } from '@/theme-provider.tsx'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@fontsource-variable/ibm-plex-sans'
import { store } from '@/store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
