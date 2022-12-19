import { PresenceTransition, ScrollView, useColorMode } from 'native-base';
import React, { PropsWithChildren, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import theme from '../../themes/theme';
import isEmailValid from '../../utils/isEmailValid';
import matrixSdk from '../../utils/matrix';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const Registration: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [signUpData, setSignUpData] = useState({
    server: 'matrix.org',
    username: '',
    password: '',
    email: '',
    isAgree: false,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const { colorMode } = useColorMode();
  const matrixContext = useContext(MatrixContext);

  const onChange = (name: string) => (value: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const register = async () => {
    const { server, username, password, email } = signUpData;

    const instance = await matrixSdk.createClient({
      baseUrl: `https://${server}/`,
    });

    matrixContext.setInstance(instance);
  };

  const checkUsername = async () => {
    const { server, username } = signUpData;

    const instance = await matrixSdk.createClient({
      baseUrl: `https://${server}/`,
    });

    matrixContext.setInstance(instance);

    instance
      .isUsernameAvailable(username)
      .then(res => {
        if (!res) {
          dispatch(
            setActionsDrawerContent({
              title: 'Error',
              text: 'Username already taken',
              actions: [
                {
                  title: 'Close',
                  onPress: () => dispatch(setActionsDrawerVisible(false)),
                },
              ],
            }),
          );

          dispatch(setActionsDrawerVisible(true));
        }
      })
      .catch(err => {
        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
            actions: [
              {
                title: 'Close',
                onPress: () => dispatch(setActionsDrawerVisible(false)),
              },
            ],
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      });
  };

  const onNext = () => {
    if (currentStep === 0) {
      if (
        !signUpData.server ||
        !signUpData.username ||
        !signUpData.password ||
        !signUpData.isAgree
      ) {
        dispatch(
          setActionsDrawerContent({
            title: 'Error',
            text: 'All fields is required',
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

    if (currentStep === 1) {
      if (!signUpData.email || isEmailValid(signUpData.email)) {
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
    console.log('resendEmail');
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
            colorMode={colorMode || 'light'}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            isPassword={isPassword}
            setIsPassword={setIsPassword}
            server={signUpData.server}
            password={signUpData.password}
            username={signUpData.username}
            isAgree={signUpData.isAgree}
            onChange={onChange}
            checkUsername={checkUsername}
            onNext={onNext}
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
            email={signUpData.email}
            onChange={onChange}
            onNext={onNext}
            styles={styles}
            resendEmail={resendEmail}
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
          <Step3 styles={styles} resendEmail={resendEmail} onNext={onNext} />
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

export default Registration;