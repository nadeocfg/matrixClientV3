import {
  Box,
  Flex,
  IBoxProps,
  Pressable,
  Text,
  useColorMode,
} from 'native-base';
import React from 'react';
import theme from '../themes/theme';
import { CheckIcon } from './icons';

interface CustomRadioItemModel {
  title: string;
  value: number;
}

interface CustomRadioProps extends IBoxProps {
  label?: string;
  onChange: Function;
  value: string;
  canEdit: boolean;
  items: CustomRadioItemModel[];
}

const CustomRadio = ({
  label,
  items,
  canEdit,
  onChange,
  value,
  ...rest
}: CustomRadioProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box {...rest}>
      {label && (
        <Text variant="lighter" fontWeight={600} fontSize={16} mb={2} px={4}>
          {label}
        </Text>
      )}

      <Box
        borderRadius={10}
        _light={{
          bg: theme.white,
        }}
        _dark={{
          bg: theme.greyIcon,
        }}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={
              canEdit && +item.value !== 101
                ? () => onChange(+item.value)
                : () => {}
            }
            px={4}
            py={4}
            borderColor={theme.border}
            borderBottomWidth={index === items.length - 1 ? 0 : 0.5}>
            <Flex align="center" direction="row" key={item.value}>
              <Text fontSize="lg">{item.title}</Text>
              {+item.value === +value && (
                <Box ml="auto">
                  <CheckIcon
                    color={colorMode === 'light' ? theme.greyIcon : theme.white}
                  />
                </Box>
              )}
            </Flex>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
};

export default CustomRadio;
