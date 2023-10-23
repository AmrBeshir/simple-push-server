import { useEffect } from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sw } from './serviceWorkers/sw';

const defaultTheme = createTheme();


function App() {

  useEffect(() => {
    sw()
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App;
