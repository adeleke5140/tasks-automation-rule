import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { ReactNode } from 'react'

const theme = createTheme({
  fontFamily: 'IBM Plex Sans Variable, sans-serif',
  colors: {
    'm-pink': [
      '#fbf7ff',
      '#e6d1fb',
      '#cc9df9',
      '#b067f8',
      '#993bf7',
      '#8b22f7',
      '#8417f8',
      '#720ddd',
      '#6508c6',
      '#5700ad',
    ],
    'm-blue': [
      '#e7f0ff',
      '#ceddff',
      '#9bb7ff',
      '#6490ff',
      '#386efe',
      '#1c58fe',
      '#0b4fff',
      '#003fe4',
      '#0038cd',
      '#002fb5',
    ],
    'm-orange': [
      '#ffece5',
      '#ffd8cd',
      '#ffaf9b',
      '#ff7e5e',
      '#fe5e36',
      '#fe4719',
      '#ff3a09',
      '#e42c00',
      '#cb2400',
      '#b21900',
    ],
  },
})

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications />
      {children}
    </MantineProvider>
  )
}
