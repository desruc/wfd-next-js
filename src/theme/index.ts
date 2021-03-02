import { createMuiTheme, Theme } from '@material-ui/core/styles';

const muiTheme: Theme = createMuiTheme({
  props: {
    MuiPaper: {
      elevation: 5
    }
  },
  shape: {
    borderRadius: 10
  },
  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF'
    },
    primary: {
      main: '#3da9fc'
    },
    secondary: {
      main: '#ef4565'
    },
    background: {
      default: '#fffffe',
      paper: '#094067'
    },
    text: {
      primary: '#5f6c7b'
    }
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontFamily:
      'Source Sans Pro, Poppins, Roboto, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none'
    },
    h1: {
      color: '#094067',
      fontSize: '3.5rem',
      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
    },
    h2: {
      color: '#094067',
      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
    },
    h3: {
      color: '#094067',
      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
    },
    h4: {
      color: '#094067',
      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
    },
    h5: {
      color: '#094067',
      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
    },
    h6: {
      color: '#094067',
      fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          textRendering: 'optimizeLegibility'
        }
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    },
    MuiInputBase: {
      root: {
        '& .MuiButton-root': {
          marginTop: '0'
        }
      }
    },
    MuiCardContent: {
      root: {
        color: '#d8eefe',
        '& h2': {
          color: '#fffffe !important'
        }
      }
    }
  }
});

export default muiTheme;
