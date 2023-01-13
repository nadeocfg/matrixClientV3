import { PresenceTransition, ScrollView } from 'native-base';
import React, { useState, useContext } from 'react';
import theme from '../../themes/theme';
import Step1 from './steps/Step1';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from '../../hooks/useDispatch';
import isEmailValid from '../../utils/isEmailValid';
import {
  clearStore,
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import matrixSdk from '../../utils/matrix';
import validateUrl from '../../utils/validateUrl';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackModel } from '../../types/rootStackType';
import { MatrixContext } from '../../context/matrixContext';
import { navigate } from '../../utils/navigation';
import isPasswordValid from '../../utils/isPasswordValid';

const ForgotPassword = (
  props: NativeStackScreenProps<RootStackModel, 'ForgotPassword'>,
) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState({
    password: '',
    isPassword: true,
  });
  const [emailData, setEmailData] = useState({
    attempt: 1,
    sid: '',
    secret: '',
  });
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const matrixContext = useContext(MatrixContext);

  const onChangeEmail = (value: string) => setEmail(value);

  const onChange = (name: string) => (value: string) => {
    if (name === 'isPassword') {
      setNewPassword({
        ...newPassword,
        [name]: !newPassword.isPassword,
      });
      return;
    }

    if (name === 'password') {
      setIsNewPasswordValid(isPasswordValid(value));
    }

    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const onNext = () => {
    if (currentStep === 0) {
      if (!isEmailValid(email)) {
        dispatch(
          setActionsDrawerContent({
            title: 'Error',
            text: 'Email is not valid',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        return;
      }

      requestToken();
      return;
    }

    if (currentStep === 2) {
      if (!newPassword.password) {
        dispatch(
          setActionsDrawerContent({
            title: 'Error',
            text: 'Input new password',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        return;
      }

      updatePassword();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const resendEmail = () => {
    requestToken(emailData.attempt + 1);

    setEmailData({
      ...emailData,
      attempt: emailData.attempt + 1,
    });
  };

  const updatePassword = () => {
    const auth = {
      type: 'm.login.email.identity',
      threepid_creds: {
        sid: emailData.sid,
        client_secret: emailData.secret,
      },
      threepidCreds: {
        sid: emailData.sid,
        client_secret: emailData.secret,
      },
    };

    matrixContext.instance
      ?.setPassword(auth, newPassword.password)
      .then(() => {
        setCurrentStep(currentStep + 1);
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
      });
  };

  const requestToken = async (attempt: number = emailData.attempt) => {
    const instance = await matrixSdk.createClient({
      baseUrl: validateUrl(props.route.params.server),
      deviceId: 'matrix-client-app',
    });

    matrixContext.setInstance(instance);

    const clientSecret = instance.generateClientSecret();

    instance
      .requestPasswordEmailToken(email, clientSecret, attempt)
      .then(res => {
        setEmailData({
          ...emailData,
          sid: res.sid,
          secret: clientSecret,
        });
        setCurrentStep(currentStep + 1);
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
      });
  };

  const onFinishResetPassword = async () => {
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
            isNewPasswordValid={isNewPasswordValid}
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
          <Step4
            onFinishResetPassword={onFinishResetPassword}
            styles={styles}
          />
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
