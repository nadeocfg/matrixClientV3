import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Input,
  Modal,
  ScrollView,
  Text,
  useColorMode,
} from 'native-base';
import React, { useState, useContext } from 'react';
import BaseHeader from '../../../components/BaseHeader';
import theme from '../../../themes/theme';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../../context/matrixContext';
import { useAppDispatch } from '../../../hooks/useDispatch';
import {
  clearStore,
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../../store/actions/mainActions';
import { CloseEyeIcon, EyeIcon } from '../../../components/icons';
import { StoreModel } from '../../../types/storeTypes';
import { useAppSelector } from '../../../hooks/useSelector';
import { navigationRef } from '../../../utils/navigation';

const DeactivateAccountSettings = () => {
  const { colorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    isPassword: true,
  });
  const [session, setSession] = useState('');
  const matrixContext = useContext(MatrixContext);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: StoreModel) => state.userStore.user);

  const changePasswordData = (name: string) => (value: any) => {
    if (name === 'isPassword') {
      setPasswordData({
        ...passwordData,
        isPassword: !passwordData.isPassword,
      });

      return;
    }

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const onChange = (value: boolean) => {
    setIsChecked(value);
  };

  const deactivateFlow = (auth: any = {}) => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.deactivateAccount(auth, isChecked)
      .then(async () => {
        matrixContext.instance?.stopClient();

        try {
          await matrixContext.instance?.logout();
        } catch {
          // ignore if failed to logout
        }

        matrixContext.setInstance(null);

        dispatch(clearStore());

        navigationRef.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch(err => {
        console.log({ ...err });
        // If we got 401 error, thats mean not all registration steps are done
        if (err.httpStatus === 401 && !err.data.errcode) {
          setSession(err.data.session);
          return;
        }

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

  const initDeactivateFlow = () => {
    deactivateFlow({
      session,
      type: 'm.login.password',
      user: user.userId,
      identifier: {
        type: 'm.id.user',
        user: user.userId,
      },
      password: passwordData.password,
    });
  };

  const changeModal = () => {
    if (!isModalOpen) {
      deactivateFlow();
    }

    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <BaseHeader title="Deactivate Account" />
      <ScrollView
        _contentContainerStyle={styles.container}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}
        p={4}>
        <Box style={styles.inner}>
          <Text fontSize={16} mb={4}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Checkbox
            isChecked={isChecked}
            onChange={onChange}
            value="deactivate">
            Please forget all messages I have sent when my account is
            deactivate.
          </Checkbox>
        </Box>

        <Button onPress={changeModal}>Deactivate Account</Button>
      </ScrollView>

      <Modal isOpen={isModalOpen} onClose={changeModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Deactivate account</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>
                Confirm your identity by entering your account password below.
              </FormControl.Label>
              <Input
                type={passwordData.isPassword ? 'password' : 'text'}
                fontSize="md"
                w="100%"
                variant="unstyled"
                value={passwordData.password}
                onChangeText={changePasswordData('password')}
                InputRightElement={
                  <IconButton
                    onPress={changePasswordData('isPassword')}
                    variant="ghost"
                    size="sm"
                    width={8}
                    height={8}
                    mr={2}
                    icon={
                      passwordData.isPassword ? (
                        <CloseEyeIcon
                          color={
                            colorMode === 'light'
                              ? theme.light.lightText
                              : theme.dark.text
                          }
                        />
                      ) : (
                        <EyeIcon
                          color={
                            colorMode === 'light'
                              ? theme.light.lightText
                              : theme.dark.text
                          }
                        />
                      )
                    }
                  />
                }
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="danger" onPress={initDeactivateFlow}>
                Deactivate
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default DeactivateAccountSettings;
