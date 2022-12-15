import theme from './theme';

const components = {
  // Button styles
  Button: {
    baseStyle: {
      _dark: {
        bg: theme.dark.button.primary.bgColor,
        _text: { color: theme.dark.button.primary.textColor },
        _pressed: { bg: theme.light.button.primary.bgColor },
      },
      _light: {
        bg: theme.light.button.primary.bgColor,
        _text: { color: theme.light.button.primary.textColor },
        _pressed: { bg: theme.dark.button.primary.bgColor },
      },
      borderRadius: 5,
    },
    variants: {
      outline: {
        _dark: {
          _text: {
            color: theme.dark.button.primary.bgColor,
          },
          borderColor: theme.dark.button.primary.bgColor,
          bg: theme.transparent,
          _pressed: {
            bg: theme.transparent,
          },
        },
        _light: {
          _text: {
            color: theme.light.button.primary.bgColor,
          },
          borderColor: theme.light.button.primary.bgColor,
          bg: theme.transparent,
          _pressed: {
            bg: theme.transparent,
          },
        },
      },
      link: {
        _dark: {
          _text: {
            color: theme.dark.button.primary.bgColor,
          },
          padding: 0,
          borderWith: 0,
          bg: theme.transparent,
          _pressed: {
            bg: theme.transparent,
          },
        },
        _light: {
          _text: {
            color: theme.light.button.primary.bgColor,
          },
          padding: 0,
          borderWith: 0,
          bg: theme.transparent,
          _pressed: {
            bg: theme.transparent,
          },
        },
      },
    },
  },

  // Input styles
  Input: {
    baseStyle: {
      borderRadius: 5,
    },
  },
};

export default components;
