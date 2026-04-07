import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/UserContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import theme from './Theme/Theme.jsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* تطبيق خلفية الثيم على كامل الموقع*/}
      <App />
    </ThemeProvider>
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)