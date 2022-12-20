import { PresenceTransition, ScrollView, useColorMode } from 'native-base';
import React, { PropsWithChildren, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
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
    sid: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isUsernameExist, setIsUsernameExist] = useState(false);
  const { colorMode } = useColorMode();
  const matrixContext = useContext(MatrixContext);

  console.log(signUpData);

  const onChange = (name: string) => (value: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const sendEmail = async () => {
    const { server, email } = signUpData;

    dispatch(setLoader(true));

    const instance = await matrixSdk.createClient({
      baseUrl: `https://${server}/`,
    });

    matrixContext.setInstance(instance);

    instance
      .requestRegisterEmailToken(email, 'matrix-client', 2)
      .then(res => {
        setSignUpData({
          ...signUpData,
          sid: res.sid,
        });
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
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const register = async () => {
    const { username, password, server, sid } = signUpData;

    dispatch(setLoader(true));

    matrixContext.instance
      ?.registerRequest({
        password,
        username,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log({ ...err });

        matrixContext.instance?.register(username, password, err.data.session, {
          type: 'm.login.dummy',
        });

        // matrixContext.instance?.registerRequest({
        //   auth: {
        //     type: 'm.login.email.identity',

        //     threepid_creds: {
        //       sid,
        //       client_secret: 'matrix-client',
        //     },
        //     session: err.data.session,
        //   },
        // });
      })
      .finally(() => {
        dispatch(setLoader(false));
      });

    // matrixContext.instance
    //   ?.register(username, password, null, { type: 'm.login.dummy' })
    //   .then(res => {
    //     console.log(res.data);
    //     dispatch(setLoader(false));
    //     setCurrentStep(currentStep + 1);
    //   })
    //   .catch(err => {
    //     console.log({ ...err });

    //     matrixContext.instance
    //       ?.register(username, password, err.data.session, {
    //         type: 'm.login.dummy',
    //       })
    //       .then(res => {
    //         console.log(res.data);
    //         setCurrentStep(currentStep + 1);
    //       })
    //       .catch(error => {
    //         dispatch(
    //           setActionsDrawerContent({
    //             title: error.data?.errcode || '',
    //             text: error.data?.error || 'Something went wrong',
    //             actions: [
    //               {
    //                 title: 'Close',
    //                 onPress: () => dispatch(setActionsDrawerVisible(false)),
    //               },
    //             ],
    //           }),
    //         );

    //         dispatch(setActionsDrawerVisible(true));
    //       })
    //       .finally(() => {
    //         dispatch(setLoader(false));
    //       });
    //   });
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
        setIsUsernameExist(!res);
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
        !isAgree
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

      // sendEmail();
    }

    if (currentStep === 2) {
      register();
      return;
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
            isAgree={isAgree}
            setIsAgree={setIsAgree}
            onChange={onChange}
            checkUsername={checkUsername}
            isUsernameExist={isUsernameExist}
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
