import React from 'react';
import {AppRoutes} from './routes';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { AuthProvider } from './context/AuthContext';
import './styles/global.scss'; 
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline /> 
        <div className="App">
          <AuthProvider>
            <AppRoutes/>
          </AuthProvider>
        </div>
      </StyledEngineProvider>
    </ThemeProvider>

  );
}

export default App;
