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
    type: 'dark'
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontFamily: 'Rubik, Roboto, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none'
    },
    h1: {
      fontFamily: ' Rubik, Roboto, Helvetica, Arial, sans-serif'
    },
    h2: {
      fontFamily: ' Rubik, Roboto, Helvetica, Arial, sans-serif'
    },
    h3: {
      fontFamily: ' Rubik, Roboto, Helvetica, Arial, sans-serif'
    },
    h4: {
      fontFamily: ' Rubik, Roboto, Helvetica, Arial, sans-serif'
    },
    h5: {
      fontFamily: ' Rubik, Roboto, Helvetica, Arial, sans-serif'
    },
    h6: {
      fontFamily: ' Rubik, Roboto, Helvetica, Arial, sans-serif'
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
    }
  }
});

export default muiTheme;
