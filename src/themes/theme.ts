import colors from './colors';

// Define our color variables for theme

const theme = {
  transparent: colors.transparent,

  // Light mode colors
  light: {
    bgColor: colors.lightBg,
    transparentBg: colors.lightTransparentBg,
    button: {
      primary: {
        bgColor: colors.darkBlue[700],
        textColor: colors.text[50],
      },
    },
    input: {
      outline: {
        bgColor: colors.lightGreyTransparent,
      },
    },
    text: colors.text[900],
  },

  // Dark mode colors
  dark: {
    bgColor: colors.coolGray[800],
    transparentBg: colors.darkTransparentBg,
    button: {
      primary: {
        bgColor: colors.darkBlue[200],
        textColor: colors.text[50],
      },
    },
    input: {
      outline: {
        bgColor: colors.lightGreyTransparent,
      },
    },
    text: colors.text[50],
  },
};

export default theme;
