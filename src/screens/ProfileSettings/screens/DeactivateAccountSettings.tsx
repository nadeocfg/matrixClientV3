import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Modal,
  ScrollView,
  Text,
} from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import BaseHeader from '../../../components/BaseHeader';
import theme from '../../../themes/theme';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../../context/matrixContext';
import { useAppDispatch } from '../../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../../store/actions/mainActions';

const DeactivateAccountSettings = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [session, setSession] = useState('');
  const matrixContext = useContext(MatrixContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    deactivateFlow();
  }, []);

  const onChange = (value: boolean) => {
    setIsChecked(value);
  };

  const deactivateFlow = (auth: any = {}) => {
    matrixContext.instance
      ?.deactivateAccount(auth, isChecked)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log({ ...err });
        // If we got 401 error, thats mean not all registration steps are done
        if (err.httpStatus === 401) {
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
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" onPress={changeModal}>
                Cancel
              </Button>
              <Button onPress={changeModal}>Save</Button>
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
