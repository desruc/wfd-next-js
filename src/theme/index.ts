import { createMuiTheme, Theme } from '@material-ui/core/styles';

const props = {
  MuiPaper: {
    elevation: 5
  }
};

const shape = {
  borderRadius: 10
};

const glow = {
  '@keyframes glow': {
    '0%, 100%': { opacity: 0.5 },
    '50%': { opacity: 1 }
  }
};

const keyframes = {
  glow
};

const muiTheme: Theme = createMuiTheme({
  props,
  shape,
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
