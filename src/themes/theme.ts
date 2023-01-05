import colors from './colors';

// Define our color variables for theme

const theme = {
  transparent: colors.transparent,
  defaultGrey: colors.defaultGrey,
  chip: {
    bg: colors.chipBg,
  },

  // Light mode colors
  light: {
    bgColor: colors.lightBg,
    lightBg: colors.white,
    transparentBg: colors.lightTransparentBg,
    button: {
      primary: {
        bgColor: colors.primary[700],
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
    lightBg: colors.black,
    transparentBg: colors.darkTransparentBg,
    button: {
      primary: {
        bgColor: colors.primary[200],
        textColor: colors.text[800],
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
