import { Alert } from 'react-native';

const nativeAlert = (title: string, message: string) => {
  return Alert.alert(title, message, [
    {
      text: 'Close',
      style: 'cancel',
    },
  ]);
};

export default nativeAlert;
