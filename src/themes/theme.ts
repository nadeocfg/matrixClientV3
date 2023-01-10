import colors from './colors';

// Define our color variables for theme

const theme = {
  transparent: colors.transparent,
  defaultGrey: colors.defaultGrey,
  greyLight: colors.greyLight,
  chip: {
    bg: colors.chipBg,
  },

  white: colors.white,
  black: colors.black,
  border: colors.border,

  // Light mode colors
  light: {
    bgColor: colors.lightBg,
    primary: colors.primary,
    darkPrimary: colors.darkPrimary,
    secondary: colors.secondary,
    text: colors.text,
    lightText: colors.lightText,
    danger: colors.danger,

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
  },

  // Dark mode colors
  dark: {
    bgColor: colors.coolGray[800],
    lightText: colors.lightText,
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
