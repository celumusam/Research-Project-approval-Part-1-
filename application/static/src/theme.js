import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: {
      paper: '#fff',
      default: '#fafafa',
      mainGradient: 'linear-gradient(to right bottom, #ff5f6d, #ffc371)',
      mainTopDownGradient: 'linear-gradient(#ff5f6d, #ffc371)'
    },
    primary: {
      light: 'rgba(255, 146, 155, 1)',
      main: 'rgba(255, 95, 109, 1)',
      dark: 'rgba(198, 39, 66, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(255, 246, 161, 1)',
      main: 'rgba(255, 195, 113, 1)',
      dark: 'rgba(201, 147, 67, 1)',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#9b1d20',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      green: '#acf7c1',
      grey: '#e0e0e0'
    }
  },
  typography: {
    fontFamily: 'Nunito Sans, Roboto, sans-serif'
  }
});

export default theme;
