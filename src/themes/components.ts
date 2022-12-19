import theme from './theme';

const components = {
  // Button styles
  Button: {
    baseStyle: {
      _text: {
        fontWeight: 600,
      },
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
      borderRadius: 10,
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
        _text: {
          fontWeight: 400,
        },
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

  // ActionSheetContent
  ActionsheetContent: {
    baseStyle: {},
  },

  // ActionSheetItem
  ActionsheetItem: {
    baseStyle: {
      paddingTop: 2,
      paddingBottom: 2,
      borderTopWidth: 1,
      _light: {
        borderColor: theme.light.text,
      },
      _dark: {
        borderColor: theme.dark.text,
      },
    },
  },

  // Checkbox
  Checkbox: {
    baseStyle: {
      borderRadius: 'full',
      _light: {
        bg: theme.transparent,
        borderColor: theme.light.button.primary,
        borderWidth: 1,
        _icon: {
          color: theme.light.text,
        },
        _checked: {
          borderColor: theme.light.button.primary,
          bg: theme.light.button.primary,
        },
        _hover: {
          borderColor: theme.light.text,
        },
        _pressed: {
          borderColor: theme.light.text,
        },
      },
      _dark: {
        bg: theme.transparent,
        borderColor: theme.dark.button.primary,
        borderWidth: 1,
        _icon: {
          color: theme.dark.text,
        },
        _checked: {
          borderColor: theme.dark.button.primary,
          bg: theme.dark.button.primary,
        },
        _hover: {
          borderColor: theme.dark.text,
        },
        _pressed: {
          borderColor: theme.dark.text,
        },
      },
    },
  },
};

export default components;
