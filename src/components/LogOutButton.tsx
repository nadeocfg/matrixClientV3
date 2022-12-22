import { Button, IButtonProps } from 'native-base';
import React, { useContext } from 'react';
import { MatrixContext } from '../context/matrixContext';
import { useAppDispatch } from '../hooks/useDispatch';
import { clearStore } from '../store/actions/mainActions';
import { navigate } from '../utils/navigation';

const LogOutButton = (props: IButtonProps) => {
  const matrixContext = useContext(MatrixContext);
  const dispatch = useAppDispatch();

  const logOut = async () => {
    const instance = matrixContext.instance;

    if (instance) {
      await instance.logout();
      await instance.stopClient();

      matrixContext.setInstance(null);
    }

    dispatch(clearStore());

    navigate('Home');
  };

  return (
    <Button {...props} onPress={logOut}>
      Logout
    </Button>
  );
};

export default LogOutButton;
