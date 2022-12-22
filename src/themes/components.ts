import theme from './theme';

const components = {
  // Link
  Link: {
    baseStyle: {
      _text: {
        fontWeight: 400,
        textDecorationLine: 'none',
      },
      _dark: {
        _text: {
          color: theme.dark.button.primary.bgColor,
        },
        _pressed: {
          _text: {
            color: theme.light.button.primary.bgColor,
          },
        },
      },
      _light: {
        _text: {
          color: theme.light.button.primary.bgColor,
        },
        _pressed: {
          _text: {
            color: theme.dark.button.primary.bgColor,
          },
        },
      },
    },
  },
  // Button styles
  Button: {
    sizes: {
      xs: {
        _text: {
          fontSize: 12,
        },
      },
      sm: {
        _text: {
          fontSize: 14,
        },
      },
      md: {
        _text: {
          fontSize: 16,
        },
      },
      lg: {
        _text: {
          fontSize: 18,
        },
      },
    },
    baseStyle: {
      _text: {
        fontWeight: 600,
        fontSize: 24,
      },
      borderRadius: 10,
    },
    variants: {
      // Default button styles
      solid: {
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
      },

      // Outline styles
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

      // Link styles
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
            color: theme.light.button.primary.bgColor,
            _text: {
              textDecorationLine: 'none',
            },
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
            color: theme.dark.button.primary.bgColor,
            _text: {
              textDecorationLine: 'none',
            },
          },
        },
      },
    },
  },

  // Input styles
  Input: {
    baseStyle: {
      padding: 3,
      borderRadius: 10,
      fontSize: 16,
    },
  },

  // ActionSheetContent
  ActionsheetContent: {
    baseStyle: {},
  },

  // ActionSheetItem
  ActionsheetItem: {
    baseStyle: {
      paddingTop: 4,
      paddingBottom: 4,
      borderTopWidth: 0.5,
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
