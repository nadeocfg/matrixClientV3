import { Alert } from 'react-native';

const NativeAlert = (title: string, message: string) => {
  return Alert.alert(title, message, [
    {
      text: 'Close',
      style: 'cancel',
    },
  ]);
};

export default NativeAlert;
