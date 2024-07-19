// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#3f83d5',
    },
    background: {
      default: '#ffffff',
      paper: '#dddddd'
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto Slab, sans-serif',
  },
});

export default theme;
