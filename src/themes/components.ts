import { InterfaceButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types';
import theme from './theme';

const components = {
  // Heading
  Heading: {
    baseStyle: {
      _dark: {
        color: theme.dark.text,
      },
      _light: {
        color: theme.light.text,
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

      grey: {
        _dark: {
          color: theme.defaultGrey,
        },
        _light: {
          color: theme.defaultGrey,
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
          color: theme.primary,
        },
        _pressed: {
          backgroundColor: theme.transparent,
          _text: {
            color: theme.darkPrimary,
          },
        },
      },
      _light: {
        _text: {
          color: theme.primary,
        },
        _pressed: {
          backgroundColor: theme.transparent,
          _text: {
            color: theme.darkPrimary,
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
        bg: theme.primary,
        _text: {
          color: theme.white,
        },
        _pressed: {
          bg: theme.darkPrimary,
        },
      },
      _dark: {
        bg: theme.primary,
        _text: {
          color: theme.white,
        },
        _pressed: {
          bg: theme.darkPrimary,
        },
      },
      borderRadius: 10,
      _disabled: {
        bg: theme.primary,
      },
    },
    variants: {
      // Default button styles
      solid: {
        _dark: {
          bg: theme.primary,
          _text: { color: theme.white },
          _pressed: { backgroundColor: theme.darkPrimary },
        },
        _light: {
          bg: theme.primary,
          _text: { color: theme.white },
          _pressed: { backgroundColor: theme.darkPrimary },
        },
      },

      // Outline styles
      outline: {
        _dark: {
          _text: {
            color: theme.primary,
          },
          borderColor: theme.primary,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.primary,
            _text: {
              color: theme.white,
            },
          },
        },
        _light: {
          _text: {
            color: theme.primary,
          },
          borderColor: theme.primary,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.primary,
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
            color: theme.primary,
          },
          padding: 0,
          borderWith: 0,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.transparent,
            color: theme.darkPrimary,
            _text: {
              textDecorationLine: 'none',
              color: theme.darkPrimary,
            },
          },
        },
        _light: {
          _text: {
            color: theme.primary,
          },
          padding: 0,
          borderWith: 0,
          bg: theme.transparent,
          _pressed: {
            backgroundColor: theme.transparent,
            color: theme.darkPrimary,
            _text: {
              textDecorationLine: 'none',
              color: theme.darkPrimary,
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

      danger: {
        backgroundColor: theme.danger,
        _text: {
          color: theme.white,
        },
        _icon: {
          color: theme.white,
        },
        _spinner: {
          color: theme.white,
        },
        _hover: {
          backgroundColor: theme.darkDanger,
        },
        _pressed: {
          backgroundColor: theme.darkDanger,
        },

        _dark: {
          backgroundColor: theme.danger,
          _hover: {
            backgroundColor: theme.darkDanger,
          },
          _pressed: {
            backgroundColor: theme.darkDanger,
          },
        },
      },

      // Ghost
      ghost: {
        _dark: {
          bg: theme.transparent,
          _text: {
            color: theme.primary,
            fontWeight: 400,
          },
          _pressed: {
            backgroundColor: theme.transparent,
            _text: {
              color: theme.darkPrimary,
            },
          },
        },
        _light: {
          bg: theme.transparent,
          _text: {
            color: theme.primary,
            fontWeight: 400,
          },
          _pressed: {
            backgroundColor: theme.transparent,
            _text: {
              color: theme.darkPrimary,
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
            color: theme.primary,
            fontWeight: 400,
          },
          _icon: {
            color: theme.white,
          },
          _spinner: {
            color: theme.white,
          },
          _hover: {
            backgroundColor: theme.darkPrimary,
          },
          _pressed: {
            backgroundColor: theme.darkPrimary,
            _text: {
              color: theme.white,
            },
          },

          _dark: {
            backgroundColor: theme.dark.messageBg,
            _hover: {
              bg: theme.dark.messageBg,
            },
            _pressed: {
              bg: theme.dark.messageBg,
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
      placeholderTextColor: theme.defaultGrey,
      bg: theme.white,
      _input: {
        bg: theme.white,
      },
      _focus: {
        backgroundColor: theme.white,
      },
      _light: {
        color: theme.light.text,
      },
      _dark: {
        bg: theme.greyIcon,
        color: theme.dark.text,
        _input: {
          bg: theme.greyIcon,
        },
        _focus: {
          backgroundColor: theme.greyIcon,
        },
        placeholderTextColor: theme.dark.text,
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
      search: {
        py: '1',
        px: '1',
        _dark: {
          backgroundColor: theme.greyIcon,
          _input: {
            backgroundColor: theme.greyIcon,
          },
          borderColor: theme.greyIcon,
          fontSize: 16,
          _focus: {
            borderColor: theme.greyIcon,
          },
        },
        _light: {
          backgroundColor: theme.chipBg,
          _input: {
            backgroundColor: theme.chipBg,
          },
          borderColor: theme.chipBg,
          fontSize: 16,
          _focus: {
            borderColor: theme.chipBg,
          },
        },
        _focus: {
          backgroundColor: theme.chipBg,
        },
      },
      withButton: {
        _disabled: {
          opacity: '1',
        },
        bg: theme.transparent,
        _input: {
          bg: theme.transparent,
        },
        _dark: {
          bg: theme.transparent,
        },
      },
      message: {
        _input: {
          bg: theme.chipBg,
        },

        _dark: {
          _input: {
            bg: theme.greyIcon,
          },
        },
      },
    },
  },

  // TextArea
  TextArea: {
    baseStyle: {},
    defaultProps: {
      px: '4',
      py: '4',
      h: '40',
      opacity: 1,
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
        borderColor: theme.secondary,
        borderWidth: 1,
        _text: {
          color: theme.chipBg,
        },
        _icon: {
          color: theme.secondary,
        },
        _checked: {
          borderColor: theme.secondary,
          bg: theme.transparent,
          _hover: {
            borderColor: theme.secondary,
            bg: theme.transparent,
          },
          _pressed: {
            borderColor: theme.secondary,
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
        borderColor: theme.primary,
        borderWidth: 1,
        _icon: {
          color: theme.primary,
        },
        _checked: {
          borderColor: theme.primary,
          _hover: {
            borderColor: theme.primary,
          },
          _pressed: {
            borderColor: theme.primary,
          },
        },
        _hover: {
          borderColor: theme.primary,
        },
        _focus: {
          borderColor: theme.primary,
        },
      },
    },
  },

  // IconButton
  IconButton: {
    baseStyle: {
      _icon: {
        color: theme.primary,
      },
      borderRadius: 'full',
      _hover: {
        bg: theme.transparent,
      },
      _pressed: {
        _light: {
          _icon: {
            color: theme.primary,
          },
        },
        _dark: {
          _icon: {
            color: theme.primary,
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
          color: theme.primary,
        },
        _light: {
          _icon: {
            color: theme.primary,
          },
        },
        _dark: {
          _icon: {
            color: theme.primary,
          },
        },
        _pressed: {
          backgroundColor: theme.transparent,
          _light: {
            _icon: {
              color: theme.darkPrimary,
            },
          },
          _dark: {
            _icon: {
              color: theme.darkPrimary,
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
      onTrackColor: theme.primary,
      _hover: {
        onTrackColor: theme.primary,
      },

      _dark: {
        onTrackColor: theme.primary,
        _hover: {
          onTrackColor: theme.primary,
        },
      },
    },
  },

  // FormControlLabel
  FormControlLabel: {
    baseStyle: {
      _text: {
        color: theme.defaultGrey,
        fontWeight: 500,
      },
      _dark: {
        _text: {
          color: theme.chipBg,
        },
      },
    },
  },

  // Badge
  Badge: {
    baseStyle: {
      bg: theme.primary,
    },
    variants: {
      solid: {
        bg: theme.primary,
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
      _dark: {
        backgroundColor: theme.black,
      },
    },
  },

  // MenuItem
  MenuItem: {
    baseStyle: {
      px: 1,
      py: 1.5,
      _text: {
        color: theme.light.text,
        fontSize: 'lg',
      },

      _dark: {
        _text: {
          color: theme.dark.text,
        },
      },
    },
    variants: {
      withBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: theme.border,
      },
    },
  },

  // Modal
  ModalHeader: {
    baseStyle: {
      _dark: {
        _text: {
          color: theme.dark.text,
        },
      },
    },
  },

  // Toast
  // Doesnt work
  Toast: {
    baseStyle: ({ colorMode }: { colorMode: 'light' | 'dark' }) => {
      return {
        backgroundColor: theme[colorMode || 'light'].bgColor,
        _title: {
          color: theme[colorMode || 'light'].text,
        },
      };
    },
  },
};

export default components;
