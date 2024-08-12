import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#192e59',
      light: '#e8eefd',
    },
    secondary: {
      main: '#971319',
      light: '#d51b23',
    },
    background: {
      default: '#f9f9f9',
      paper: '#f9f9f9',
    },
    text: {
      primary: '#FFFFFF',
    },
    error: {
      main: '#d51b23',
    },
    divider: 'rgba(0,0,0,0.1)',
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
};

const LexinLightTheme = createTheme(themeOptions)

export { LexinLightTheme }