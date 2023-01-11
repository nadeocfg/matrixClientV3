import {
  Box,
  Flex,
  IFlexProps,
  Link,
  Pressable,
  Text,
  useColorMode,
} from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import React from 'react';
import theme from '../themes/theme';
import { navigate } from '../utils/navigation';
import { ArrowRightIcon } from './icons';

interface MenuListProps extends InterfaceBoxProps<IFlexProps> {
  withIcons: boolean;
  items: ItemModel[];
}

export interface ItemModel {
  title: string;
  route?: string;
  icon: JSX.Element;
  link?: boolean;
  onPress?: Function;
}

const MenuList = ({ withIcons, items, ...props }: MenuListProps) => {
  const { colorMode } = useColorMode();

  const goTo = (route: string) => {
    navigate(route);
  };

  const onPress = (item: ItemModel) => {
    if (item.route) {
      goTo(item.route);
      return;
    }

    if (item.onPress) {
      item.onPress();
      return;
    }
  };

  return (
    <Flex direction="column" {...props}>
      {items.map((item, index) =>
        item.link ? (
          <Link href={item.route} key={index}>
            <Flex
              flexGrow={1}
              mx={4}
              py={4}
              direction="row"
              align="center"
              justify="flex-start"
              borderColor={theme.border}
              borderBottomWidth={index === items.length - 1 ? 0 : 0.5}>
              {withIcons && item.icon ? <Box mr={2}>{item.icon}</Box> : <></>}
              <Box flexGrow={1}>
                <Text fontSize={16}>{item.title}</Text>
              </Box>
              <ArrowRightIcon
                color={
                  colorMode === 'light' ? theme.light.text : theme.dark.text
                }
              />
            </Flex>
          </Link>
        ) : (
          <Pressable onPress={() => onPress(item)} key={index}>
            <Flex
              flexGrow={1}
              mx={4}
              py={4}
              direction="row"
              align="center"
              justify="flex-start"
              borderColor={theme.border}
              borderBottomWidth={index === items.length - 1 ? 0 : 0.5}>
              {withIcons && item.icon ? <Box mr={2}>{item.icon}</Box> : <></>}
              <Box flexGrow={1}>
                <Text fontSize={16}>{item.title}</Text>
              </Box>
              <ArrowRightIcon
                color={
                  colorMode === 'light' ? theme.light.text : theme.dark.text
                }
              />
            </Flex>
          </Pressable>
        ),
      )}
    </Flex>
  );
};

export default MenuList;
