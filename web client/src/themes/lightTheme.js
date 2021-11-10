import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';


let theme = createTheme({
    palette: {
        primary: {
          main: "#69C26E",
        },
        secondary: {
          main: "#4AAEFD",
        },
      },
});

const lightTheme = responsiveFontSizes(theme)

export default lightTheme;