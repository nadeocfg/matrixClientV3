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
          color: theme.light.primary,
        },
        _pressed: {
          backgroundColor: theme.transparent,
          _text: {
            color: theme.light.darkPrimary,
          },
        },
      },
      _light: {
        _text: {
          color: theme.light.primary,
        },
        _pressed: {
          backgroundColor: theme.transparent,
          _text: {
            color: theme.light.darkPrimary,
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
      _disabled: {
        bg: theme.light.primary,
      },
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
            color: theme.light.primary,
          },
          borderColor: theme.light.primary,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.light.primary,
            _text: {
              color: theme.white,
            },
          },
        },
        _light: {
          _text: {
            color: theme.light.primary,
          },
          borderColor: theme.light.primary,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.light.primary,
            _text: {
              color: theme.white,
            },
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
            color: theme.light.primary,
          },
          padding: 0,
          borderWith: 0,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.transparent,
            color: theme.light.darkPrimary,
            _text: {
              textDecorationLine: 'none',
              color: theme.light.darkPrimary,
            },
          },
        },
        _light: {
          _text: {
            color: theme.light.primary,
          },
          padding: 0,
          borderWith: 0,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.transparent,
            color: theme.light.darkPrimary,
            _text: {
              textDecorationLine: 'none',
              color: theme.light.darkPrimary,
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
        opacity: '1',
      },
      _dark: {
        color: theme.light.text,
      },
      _light: {
        color: theme.light.text,
      },
    },
    variants: {
      outline: {
        py: '1',
        px: '1',
        _dark: {
          bg: theme.chipBg,
          _input: {
            bg: theme.chipBg,
          },
          borderColor: theme.chipBg,
          fontSize: 16,
          _focus: {
            borderColor: theme.chipBg,
          },
        },
        _light: {
          bg: theme.chipBg,
          _input: {
            bg: theme.chipBg,
          },
          borderColor: theme.chipBg,
          fontSize: 16,
          _focus: {
            borderColor: theme.chipBg,
          },
        },
        _focus: {
          bg: theme.chipBg,
        },
      },
      withButton: {
        bg: theme.transparent,

        _input: {
          bg: theme.transparent,
        },
      },
    },
  },

  // TextArea
  TextArea: {
    baseStyle: {
      backgroundColor: theme.white,
    },
    defaultProps: {
      px: '4',
      py: '4',
      h: '40',
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
        _focus: {
          bg: theme.transparent,
        },
      },
    },
    variants: {
      primary: {
        _light: {
          borderColor: theme.light.primary,
          borderWidth: 1,
          _icon: {
            color: theme.light.primary,
          },
          _checked: {
            borderColor: theme.light.primary,
            _hover: {
              borderColor: theme.light.primary,
            },
            _pressed: {
              borderColor: theme.light.primary,
            },
          },
          _hover: {
            borderColor: theme.light.primary,
          },
          _focus: {
            borderColor: theme.light.primary,
          },
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

  // Badge
  Badge: {
    baseStyle: {
      bg: theme.light.primary,
    },
    variants: {
      solid: {
        bg: theme.light.primary,
        _text: {
          color: theme.white,
          fontWeight: 500,
        },
      },
    },
  },

  // Menu
  Menu: {
    baseStyle: {
      py: 2,
      borderRadius: 'xl',
    },
  },

  // MenuItem
  MenuItem: {
    baseStyle: {
      px: 1,
      py: 1.5,
      _text: {
        color: theme.light.text,
        fontSize: 'sm',
      },
    },
    variants: {
      withBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: theme.border,
      },
    },
  },
};

export default components;
