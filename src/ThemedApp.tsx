
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.tsx'
import { BluetoothProvider } from './contexts/BluetoothContext.tsx';
import { SnackbarProvider } from 'notistack';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useContext } from 'react';
import { ColorModeContext } from './contexts/ColorModeContext.tsx';

export default function ThemedApp() {
  const { isDarkMode } = useContext(ColorModeContext);

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