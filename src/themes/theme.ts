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

  white: colors.white,
  black: colors.darkText,
  border: colors.border,

  danger: colors.danger,
  darkDanger: colors.darkDanger,

  // Light mode colors
  light: {
    bgColor: colors.lightBg,
    text: colors.text,
    lightText: colors.lightText,
    messageBg: colors.messageBg,

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
    messageBg: colors.messageBgDark,

    transparentBg: colors.darkTransparentBg,
    input: {
      outline: {
        bgColor: colors.lightGreyTransparent,
      },
    },
  },
};

export default theme;
