import { Box, Flex, IFlexProps, Pressable, Text } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import React from 'react';
import { navigate } from '../utils/navigation';
import { ArrowRightIcon } from './icons';

interface MenuListProps extends InterfaceBoxProps<IFlexProps> {
  withIcons: boolean;
  items: {
    title: string;
    route: string;
    icon: JSX.Element;
  }[];
}

const MenuList = ({ withIcons, items, ...props }: MenuListProps) => {
  const goTo = (route: string) => {
    navigate(route);
  };

  return (
    <Flex direction="column" {...props}>
      {items.map((item, index) => (
        <Pressable onPress={() => goTo(item.route)} key={item.route}>
          <Flex
            mx={4}
            py={4}
            direction="row"
            align="center"
            justify="flex-start"
            borderBottomWidth={index === items.length - 1 ? 0 : 0.5}>
            {withIcons && item.icon ? <Box mr={2}>{item.icon}</Box> : <></>}
            <Box flexGrow={1}>
              <Text fontSize={16}>{item.title}</Text>
            </Box>
            <ArrowRightIcon />
          </Flex>
        </Pressable>
      ))}
    </Flex>
  );
};

export default MenuList;
