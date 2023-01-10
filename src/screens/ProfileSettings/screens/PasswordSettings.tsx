import {
  Button,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Stack,
} from 'native-base';
import React, { useState, useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader';
import { CloseEyeIcon, EyeIcon } from '../../../components/icons';
import { MatrixContext } from '../../../context/matrixContext';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { useAppSelector } from '../../../hooks/useSelector';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../../store/actions/mainActions';
import theme from '../../../themes/theme';
import { StoreModel } from '../../../types/storeTypes';
import { navigationRef } from '../../../utils/navigation';

const PasswordSettings = () => {
  const dispatch = useAppDispatch();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [isPassword, setIsPassword] = useState(true);
  const [isNewPassword, setIsNewPassword] = useState(true);
  const matrixInstance = useContext(MatrixContext);
  const user = useAppSelector((state: StoreModel) => state.userStore.user);

  const onChange = (name: string) => (value: string) => {
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const DoneButton = () => {
    return (
      <Button variant="ghost" onPress={changePassword}>
        Done
      </Button>
    );
  };

  const changePassword = () => {
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      dispatch(
        setActionsDrawerContent({
          title: 'Error',
          text: 'Please, make sure your passwords match',
        }),
      );

      dispatch(setActionsDrawerVisible(true));
      return;
    }

    dispatch(setLoader(true));

    matrixInstance.instance
      ?.setPassword(
        {
          type: 'm.login.password',
          identifier: {
            type: 'm.id.user',
            user: user.userId,
          },
          user: user.userId,
          password: passwordData.currentPassword,
        },
        passwordData.newPassword,
        false,
      )
      .then(() => {
        navigationRef.goBack();
      })
      .catch(err => {
        console.log({ ...err });
        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  return (
    <>
      <BaseHeader title="Password" action={<DoneButton />} />
      <ScrollView
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}
        p={4}>
        <FormControl mb={4}>
          <FormControl.Label>Current password</FormControl.Label>
          <Input
            type={isPassword ? 'password' : 'text'}
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={passwordData.currentPassword}
            onChangeText={onChange('currentPassword')}
            InputRightElement={
              <Pressable mr={2} onPress={() => setIsPassword(!isPassword)}>
                {isPassword ? (
                  <CloseEyeIcon color={theme.light.lightText} />
                ) : (
                  <EyeIcon color={theme.light.lightText} />
                )}
              </Pressable>
            }
          />
        </FormControl>
        <FormControl mb={4}>
          <FormControl.Label>New password</FormControl.Label>
          <Input
            type={isNewPassword ? 'password' : 'text'}
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={passwordData.newPassword}
            onChangeText={onChange('newPassword')}
            InputRightElement={
              <Pressable
                mr={2}
                onPress={() => setIsNewPassword(!isNewPassword)}>
                {isNewPassword ? (
                  <CloseEyeIcon color={theme.light.lightText} />
                ) : (
                  <EyeIcon color={theme.light.lightText} />
                )}
              </Pressable>
            }
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Repeat new password</FormControl.Label>
          <Input
            type={isNewPassword ? 'password' : 'text'}
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={passwordData.repeatNewPassword}
            onChangeText={onChange('repeatNewPassword')}
            InputRightElement={
              <Pressable
                mr={2}
                onPress={() => setIsNewPassword(!isNewPassword)}>
                {isNewPassword ? (
                  <CloseEyeIcon color={theme.light.lightText} />
                ) : (
                  <EyeIcon color={theme.light.lightText} />
                )}
              </Pressable>
            }
          />
        </FormControl>
      </ScrollView>
    </>
  );
};

export default PasswordSettings;
