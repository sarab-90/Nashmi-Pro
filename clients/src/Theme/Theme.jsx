import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
    main: '#0d1b2a', 
    light: '#1b263b',
    dark: '#010811',
    contrastText: '#ffffff',
  },
    secondary: {
      main: '#f57c00',
      light: '#ffad42',
      dark: '#bb4d00',
    },
    background: {
      default: '#f4f6f8', 
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    // تنسيق موحد لجميع البطاقات 
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '32px',
          boxShadow: '4px 10px 25px rgba(0,0,0,0.05)', 
        },
      },
    },
    // تنسيق موحد لجميع حقول الإدخال
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
      },
    },
    // تنسيق للأزرار
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 0',
          fontWeight: 'bold',
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Cairo, Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
});
export default theme;