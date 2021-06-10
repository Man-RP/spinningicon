import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#455a64",
    },
    secondary: {
      main: "#0eddae",
    },
    // secondary: deepOrange,
  },
  typography: {
    //   h1: {
    //     fontSize: "2.25rem",
    //     fontWeight: 100,
    //     lineHeight: 1.5
    //   },
    h2: {
      "@media screen and (max-width: 500px)": {
        fontSize: "2.75rem",
      },
      //     fontSize: "1.8rem",
      //     lineHeight: 1.2
    },
    //   h3: {
    //     fontSize: "1.2rem",
    //     lineHeight: 1.5
    //   },
    //   h4: {
    //     fontSize: "1rem",
    //     fontWeight: 300,
    //     lineHeight: 1.2
    //   },
    h5: {
      "@media screen and (max-width: 500px)": {
        fontSize: "1.25rem",
      },
      //     fontSize: ".9rem",
      //     fontWeight: 500
    },
    //   body1: {
    //     fontSize: 14
    //   }
  },
});

// tweak theme shadows
theme.shadows[2] =
  "0px 1px 8px 0px rgba(0, 0, 0, 0.07), 0 1px 2px 0px rgba(0, 0, 0, 0.15)";

export default theme;
