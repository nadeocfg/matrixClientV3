import { InterfaceButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types';
import theme from './theme';

const components = {
  // Heading
  Heading: {
    baseStyle: {
      _dark: {
        _text: {
          color: theme.dark.button.primary.textColor,
        },
      },
      _light: {
        color: theme.black,
      },
    },
  },

  // Text
  Text: {
    baseStyle: {
      _dark: {
        color: theme.dark.text,
        fontWeight: 400,
      },
      _light: {
        color: theme.light.text,
        fontWeight: 400,
      },
    },
    variants: {
      lighter: {
        _dark: {
          color: theme.dark.lightText,
        },
        _light: {
          color: theme.light.lightText,
        },
      },
    },
  },

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
      _light: {
        bg: theme.light.primary,
        _text: {
          color: theme.white,
        },
        _pressed: {
          bg: theme.light.darkPrimary,
        },
      },
      _dark: {
        bg: theme.light.primary,
        _text: {
          color: theme.white,
        },
        _pressed: {
          bg: theme.light.darkPrimary,
        },
      },
      borderRadius: 10,
    },
    variants: {
      // Default button styles
      solid: {
        _dark: {
          bg: theme.light.primary,
          _text: { color: theme.white },
          _pressed: { backgroundColor: theme.light.darkPrimary },
        },
        _light: {
          bg: theme.light.primary,
          _text: { color: theme.white },
          _pressed: { backgroundColor: theme.light.darkPrimary },
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

      // Subtle styles(looks like similar button but with colorScheme like danger, warning, error, success)
      subtle: ({ colorScheme }: InterfaceButtonProps) => {
        return {
          bg: `${colorScheme}.700`,
          _text: {
            color: 'text.50',
          },
          _icon: {
            color: 'text.50',
          },
          _spinner: {
            color: 'text.50',
          },
          _hover: {
            bg: `${colorScheme}.400`,
          },
          _pressed: {
            bg: `${colorScheme}.300`,
          },

          _dark: {
            bg: `${colorScheme}.700`,
            _hover: {
              bg: `${colorScheme}.200`,
            },
            _pressed: {
              bg: `${colorScheme}.100`,
            },
          },
        };
      },

      // Ghost
      ghost: {
        _dark: {
          bg: theme.transparent,
          _text: {
            color: theme.light.primary,
            fontWeight: 400,
          },
          _pressed: {
            backgroundColor: theme.transparent,
            _text: {
              color: theme.light.darkPrimary,
            },
          },
        },
        _light: {
          bg: theme.transparent,
          _text: {
            color: theme.light.primary,
            fontWeight: 400,
          },
          _pressed: {
            backgroundColor: theme.transparent,
            _text: {
              color: theme.light.darkPrimary,
            },
          },
        },
      },

      // Custom button style, used in PersonalInformationSettings
      chip: ({}: InterfaceButtonProps) => {
        return {
          backgroundColor: theme.greyLight,
          borderRadius: 100,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 4,
          paddingRight: 4,
          _text: {
            color: theme.light.primary,
            fontWeight: 400,
          },
          _icon: {
            color: theme.white,
          },
          _spinner: {
            color: theme.white,
          },
          _hover: {
            backgroundColor: theme.light.darkPrimary,
          },
          _pressed: {
            backgroundColor: theme.light.darkPrimary,
            _text: {
              color: theme.white,
            },
          },

          _dark: {
            bg: theme.light.darkPrimary,
            _hover: {
              bg: theme.light.darkPrimary,
            },
            _pressed: {
              bg: theme.light.darkPrimary,
            },
          },
        };
      },
    },
  },

  // Input styles
  Input: {
    baseStyle: {
      py: '3',
      px: '3',
      borderRadius: 10,
      fontSize: 16,
      bg: theme.white,
      _input: {
        bg: theme.white,
      },
      _disabled: {
        color: theme.black,
      },
    },
    variants: {
      outline: {
        _dark: {
          bg: theme.dark.input.outline.bgColor,
          borderColor: theme.dark.input.outline.bgColor,
          fontSize: 16,
          _focus: {
            borderColor: theme.dark.input.outline.bgColor,
          },
        },
        _light: {
          bg: theme.dark.input.outline.bgColor,
          borderColor: theme.dark.input.outline.bgColor,
          fontSize: 16,
          _focus: {
            borderColor: theme.dark.input.outline.bgColor,
          },
        },
        _focus: {
          bg: theme.dark.input.outline.bgColor,
        },
      },
    },
  },

  // TextArea
  TextArea: {
    baseStyle: {
      backgroundColor: theme.chip.bg,
      _focus: {
        backgroundColor: theme.transparent,
        borderColor: theme.transparent,
      },
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
      borderTopColor: theme.border,
      _light: {
        borderColor: theme.light.text,
        _text: {
          color: theme.light.text,
        },
      },
      _dark: {
        borderColor: theme.dark.text,
        _text: {
          color: theme.light.text,
        },
      },
    },
  },

  // Checkbox
  Checkbox: {
    baseStyle: {
      borderRadius: 'full',
      _light: {
        bg: theme.transparent,
        borderColor: theme.light.text,
        borderWidth: 1,
        _icon: {
          color: theme.light.text,
        },
        _checked: {
          borderColor: theme.light.text,
          bg: theme.transparent,
          _hover: {
            borderColor: theme.light.text,
            bg: theme.transparent,
          },
          _pressed: {
            borderColor: theme.light.text,
            bg: theme.transparent,
          },
        },

        _hover: {
          borderColor: theme.light.text,
        },
        _pressed: {
          bg: theme.transparent,
        },
        _focus: {
          borderColor: theme.light.text,
        },
      },
      _dark: {
        bg: theme.transparent,
        borderColor: theme.light.secondary,
        borderWidth: 1,
        _icon: {
          color: theme.light.secondary,
        },
        _checked: {
          borderColor: theme.light.secondary,
          bg: theme.transparent,
          _hover: {
            borderColor: theme.light.secondary,
            bg: theme.transparent,
          },
          _pressed: {
            borderColor: theme.light.secondary,
            bg: theme.transparent,
          },
        },
        _hover: {
          bg: theme.transparent,
        },
        _pressed: {
          bg: theme.transparent,
          borderColor: theme.light.secondary,
        },
        _focus: {
          bg: theme.transparent,
        },
      },
    },
  },

  // IconButton
  IconButton: {
    baseStyle: {
      _icon: {
        color: theme.light.primary,
      },
      borderRadius: 'full',
      _hover: {
        bg: theme.transparent,
      },
      _pressed: {
        _light: {
          _icon: {
            color: theme.light.button.primary.bgColor,
          },
        },
        _dark: {
          _icon: {
            color: theme.dark.button.primary.bgColor,
          },
        },
        _ios: {
          _icon: {
            size: '2xl',
          },
        },
      },
      _ios: {
        _icon: {
          size: '2xl',
        },
      },
    },
    variants: {
      ghost: {
        _icon: {
          color: theme.light.primary,
        },
        _light: {
          _icon: {
            color: theme.light.primary,
          },
        },
        _dark: {
          _icon: {
            color: theme.light.primary,
          },
        },
        _pressed: {
          backgroundColor: theme.transparent,
          _light: {
            _icon: {
              color: theme.light.darkPrimary,
            },
          },
          _dark: {
            _icon: {
              color: theme.light.darkPrimary,
            },
          },
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        },
        _ios: {
          _icon: {
            size: '2xl',
          },
        },
      },
    },
  },

  // Pressable
  Pressable: {
    baseStyle: {
      _pressed: {
        bg: theme.light.input.outline.bgColor,
      },
    },
  },

  // Switch
  Switch: {
    baseStyle: {
      onTrackColor: theme.light.primary,
    },
  },

  // FormControlLabel
  FormControlLabel: {
    baseStyle: {
      _text: {
        color: theme.defaultGrey,
        fontWeight: 500,
      },
    },
  },
};

export default components;
