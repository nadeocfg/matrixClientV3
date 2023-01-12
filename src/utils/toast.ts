import { Toast } from 'native-base';

const toastInit = (variant: string) => {
  Toast.show({
    description: 'Saved successfully',
    variant,
  });
};

export default toastInit;
