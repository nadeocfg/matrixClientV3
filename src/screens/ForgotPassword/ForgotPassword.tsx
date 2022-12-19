import { PresenceTransition, ScrollView } from 'native-base';
import React, { useState } from 'react';
import theme from '../../themes/theme';
import Step1 from './steps/Step1';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from '../../hooks/useDispatch';
import isEmailValid from '../../utils/isEmailValid';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState({
    password: '',
    isPassword: true,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const onChangeEmail = (value: string) => setEmail(value);

  const onChange = (name: string) => (value: string) => {
    if (name === 'isPassword') {
      setNewPassword({
        ...newPassword,
        [name]: !newPassword.isPassword,
      });
      return;
    }

    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const onNext = () => {
    if (currentStep === 0) {
      if (!email || isEmailValid(email)) {
        dispatch(
          setActionsDrawerContent({
            title: 'Error',
            text: 'Email is not valid',
            actions: [
              {
                title: 'Ok',
                onPress: () => dispatch(setActionsDrawerVisible(false)),
              },
            ],
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const resendEmail = () => {
    console.log('resend email');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      {currentStep === 0 && (
        <PresenceTransition
          visible={currentStep === 0}
          initial={{
            translateX: 500,
          }}
          animate={{
            translateX: 0,
            transition: {
              duration: 300,
            },
          }}
          style={styles.inner}>
          <Step1
            email={email}
            onNext={onNext}
            onChangeEmail={onChangeEmail}
            styles={styles}
          />
        </PresenceTransition>
      )}

      {currentStep === 1 && (
        <PresenceTransition
          visible={currentStep === 1}
          initial={{
            translateX: 500,
          }}
          animate={{
            translateX: 0,
            transition: {
              duration: 300,
            },
          }}
          style={styles.inner}>
          <Step2
            email={email}
            onNext={onNext}
            resendEmail={resendEmail}
            styles={styles}
          />
        </PresenceTransition>
      )}

      {currentStep === 2 && (
        <PresenceTransition
          visible={currentStep === 2}
          initial={{
            translateX: 500,
          }}
          animate={{
            translateX: 0,
            transition: {
              duration: 300,
            },
          }}
          style={styles.inner}>
          <Step3
            password={newPassword.password}
            isPassword={newPassword.isPassword}
            onChange={onChange}
            onNext={onNext}
            styles={styles}
          />
        </PresenceTransition>
      )}

      {currentStep === 3 && (
        <PresenceTransition
          visible={currentStep === 3}
          initial={{
            translateX: 500,
          }}
          animate={{
            translateX: 0,
            transition: {
              duration: 300,
            },
          }}
          style={styles.inner}>
          <Step4 styles={styles} />
        </PresenceTransition>
      )}
    </ScrollView>
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

export default ForgotPassword;
