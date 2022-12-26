import { Button, IButtonProps } from 'native-base';
import React, { useContext } from 'react';
import { MatrixContext } from '../context/matrixContext';
import { useAppDispatch } from '../hooks/useDispatch';
import {
  clearStore,
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../store/actions/mainActions';
import { navigate } from '../utils/navigation';

const LogOutButton = (props: IButtonProps) => {
  const matrixContext = useContext(MatrixContext);
  const dispatch = useAppDispatch();

  const logOut = async () => {
    if (matrixContext.instance) {
      matrixContext.instance.stopClient();

      try {
        await matrixContext.instance.logout();
      } catch {
        // ignore if failed to logout
      }

      matrixContext.setInstance(null);
    }

    dispatch(clearStore());

    navigate('Login');
  };

  const confirm = () => {
    dispatch(
      setActionsDrawerContent({
        title: 'Logout',
        text: 'Are you sure you want to log out',
        actions: [
          {
            title: 'Log out',
            onPress: logOut,
          },
          {
            title: 'Cancel',
            onPress: () => dispatch(setActionsDrawerVisible(false)),
          },
        ],
      }),
    );

    dispatch(setActionsDrawerVisible(true));
  };

  return (
    <>
      <Button {...props} _text={{ textAlign: 'right' }} onPress={confirm}>
        Logout
      </Button>
    </>
  );
};

export default LogOutButton;
