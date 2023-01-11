import colors from './colors';

// Define our color variables for theme

const theme = {
  primary: colors.primary,
  secondary: colors.secondary,
  darkPrimary: colors.darkPrimary,
  transparent: colors.transparent,
  defaultGrey: colors.defaultGrey,
  greyLight: colors.greyLight,
  greyIcon: colors.greyIcon,
  chipBg: colors.chipBg,
  messageBg: colors.messageBg,

  white: colors.white,
  black: colors.black,
  border: colors.border,

  danger: colors.danger,
  darkDanger: colors.darkDanger,

  // Light mode colors
  light: {
    bgColor: colors.lightBg,
    text: colors.text,
    lightText: colors.lightText,

    lightBg: colors.white,
    transparentBg: colors.lightTransparentBg,
    input: {
      outline: {
        bgColor: colors.lightGreyTransparent,
      },
    },
  },

  // Dark mode colors
  dark: {
    bgColor: colors.text,
    text: colors.lightBg,
    lightText: colors.lightText,

    lightBg: colors.white,
    transparentBg: colors.lightTransparentBg,
    input: {
      outline: {
        bgColor: colors.lightGreyTransparent,
      },
    },
  },
};

export default theme;
