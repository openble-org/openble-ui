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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <BluetoothProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BluetoothProvider>

  </React.StrictMode>,
)
