import {
  Box,
  Flex,
  FormControl,
  ScrollView,
  Switch,
  Text,
  useColorMode,
} from 'native-base';
import React from 'react';
import BaseHeader from '../../components/BaseHeader';
import LogOutButton from '../../components/LogOutButton';
import MenuList from '../../components/MenuList';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import theme from '../../themes/theme';
import { StoreModel } from '../../types/storeTypes';
import { setColorMode as setColorModeAction } from '../../store/actions/mainActions';

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const currentColorMode = useAppSelector(
    (state: StoreModel) => state.mainStore.colorMode,
  );
  const { setColorMode } = useColorMode();

  const changeColorMode = () => {
    const incomingMode = currentColorMode === 'dark' ? 'light' : 'dark';

    dispatch(setColorModeAction(incomingMode));
    setColorMode(incomingMode);
  };
  const menuItems = [
    {
      title: 'Personal information',
      route: 'PersonalInformationSettings',
      // icon: (
      //   <QuestionMarkRounded
      //     color={
      //       currentColorMode === 'dark' ? theme.dark.text : theme.light.text
      //     }
      //   />
      // ),
    },
    {
      title: 'Password',
      route: 'PasswordSettings',
      // icon: (
      //   <QuestionMarkRounded
      //     color={
      //       currentColorMode === 'dark' ? theme.dark.text : theme.light.text
      //     }
      //   />
      // ),
    },
    {
      title: 'Deactivate account permanently',
      route: 'DeactivateAccountSettings',
      // icon: (
      //   <QuestionMarkRounded
      //     color={
      //       currentColorMode === 'dark' ? theme.dark.text : theme.light.text
      //     }
      //   />
      // ),
    },
    {
      title: 'Terms of Use & Privacy Policy',
      route: 'https://dev.techwings.com:8448/_matrix/consent?v=1.0',
      link: true,
      // icon: (
      //   <QuestionMarkRounded
      //     color={
      //       currentColorMode === 'dark' ? theme.dark.text : theme.light.text
      //     }
      //   />
      // ),
    },
  ];

  return (
    <ScrollView
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <BaseHeader
        title="Settings and privacy"
        action={<LogOutButton variant="ghost" />}
      />

      <MenuList mt={8} withIcons items={menuItems} />

      <Box mt={8} mx={4}>
        <FormControl mb={4}>
          <Flex direction="row" justify="space-between" align="center">
            <Text fontSize={16}>Notifications</Text>
            <Switch size="lg" />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex direction="row" justify="space-between" align="center">
            <Text fontSize={16}>Dark Mode</Text>
            <Switch
              size="lg"
              isChecked={currentColorMode === 'dark'}
              onToggle={changeColorMode}
            />
          </Flex>
        </FormControl>
      </Box>
    </ScrollView>
  );
};

export default ProfileSettings;
