import colors from './colors';

const theme = {
  transparent: colors.transparent,
  light: {
    bgColor: colors.coolGray[50],
    transparentBg: colors.lightTransparentBg,
    button: {
      primary: {
        bgColor: colors.darkBlue[700],
        textColor: colors.text[50],
      },
    },
    text: colors.text[900],
  },
  dark: {
    bgColor: colors.coolGray[800],
    transparentBg: colors.darkTransparentBg,
    button: {
      primary: {
        bgColor: colors.darkBlue[200],
        textColor: colors.text[50],
      },
    },
    text: colors.text[50],
  },
};

export default theme;
