import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.tsx'
import { BluetoothProvider } from './contexts/BluetoothContext.tsx';
import { SnackbarProvider } from 'notistack';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ColorModeContext, ColorModeProvider } from './contexts/ColorModeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider>
  </React.StrictMode>,
)

function ThemedApp() {
  const { isDarkMode } = React.useContext(ColorModeContext);

  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BluetoothProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BluetoothProvider>
  </ThemeProvider>
}