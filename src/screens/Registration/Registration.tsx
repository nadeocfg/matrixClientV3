import { IRegisterRequestParams } from 'matrix-js-sdk';
import { PresenceTransition, useColorMode, View } from 'native-base';
import React, {
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from 'react';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import { setAuthResponse, setUserData } from '../../store/actions/userActions';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import theme from '../../themes/theme';
import { AuthResponseModel } from '../../types/storeTypes';
import isEmailValid from '../../utils/isEmailValid';
import matrixSdk from '../../utils/matrix';
import validateUrl from '../../utils/validateUrl';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import { setRooms } from '../../store/actions/roomsActions';
import isPasswordValid from '../../utils/isPasswordValid';

const Registration: React.FC<PropsWithChildren<any>> = () => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [signUpData, setSignUpData] = useState({
    server: 'dev.techwings.com:8448',
    username: '',
    password: '',
    email: '',
    sid: '',
    clientSecret: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isUsernameExist, setIsUsernameExist] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [flowResponse, setFlowResponse] = useState({
    completed: [],
    flows: [],
    params: {
      'm.login.recaptcha': {
        public_key: '',
      },
      'm.login.terms': {
        policies: {
          privacy_policy: {
            version: '1.0',
            en: {
              name: 'Terms and Conditions',
              url: 'https://matrix-client.matrix.org/_matrix/consent?v=1.0',
            },
          },
        },
      },
    },
    session: '',
  });
  const { colorMode } = useColorMode();
  const matrixContext = useContext(MatrixContext);

  useEffect(() => {
    if (matrixContext.instance) {
      matrixContext.instance.stopClient();

      try {
        matrixContext.instance.logout();
      } catch {
        // ignore if failed to logout
      }
    }

    getFlow();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (signUpData.username.trim().length > 0) {
      timer = setTimeout(() => {
        checkUsername();
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [signUpData.username]);

  const onChange = (name: string) => (value: string) => {
    if (name === 'password') {
      setIsNewPasswordValid(isPasswordValid(value));
    }

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const checkUsername = async () => {
    const { server, username } = signUpData;

    const instance = await matrixSdk.createClient({
      baseUrl: validateUrl(server),
    });

    return instance
      .isUsernameAvailable(username)
      .then(res => {
        setIsUsernameExist(!res);
        return res;
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

        return false;
      });
  };

  const handleRecaptcha = (token: string) => {
    const { session } = flowResponse;

    getFlow({
      type: 'm.login.recaptcha',
      response: token,
      session,
    });
  };

  const handleTerms = () => {
    const { session } = flowResponse;

    getFlow({
      type: 'm.login.terms',
      session,
    });
  };

  const handleVerifyEmail = () => {
    const { session } = flowResponse;
    const { sid, clientSecret } = signUpData;

    getFlow({
      type: 'm.login.email.identity',
      threepidCreds: { sid, client_secret: clientSecret },
      threepid_creds: { sid, client_secret: clientSecret },
      session,
    });
  };

  const sendEmail = async () => {
    const { server, email } = signUpData;

    dispatch(setLoader(true));

    const instance = await matrixSdk.createClient({
      baseUrl: validateUrl(server),
    });

    const clientSecret = instance.generateClientSecret();

    instance
      .requestRegisterEmailToken(email, clientSecret, 1)
      .then(res => {
        setSignUpData({
          ...signUpData,
          sid: res.sid,
          clientSecret,
        });
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
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const getFlow = async (auth = {}) => {
    const { username, password, server } = signUpData;

    dispatch(setLoader(true));

    const tempInstance = await matrixSdk.createClient({
      baseUrl: validateUrl(server),
    });

    const data: IRegisterRequestParams = {};

    if (username && password) {
      data.username = username;
      data.password = password;
      data.initial_device_display_name = 'matrix-client';
    }

    if (auth) {
      data.auth = auth;
    }

    tempInstance
      .registerRequest(data)
      .then(async res => {
        // If all registration steps done, start matrix client
        const instance = await matrixSdk.createClient({
          baseUrl: validateUrl(server),
          accessToken: res.access_token,
          userId: res.user_id,
          deviceId: res.device_id,
        });

        dispatch(setAuthResponse(res as AuthResponseModel));

        // Set new instance to context provider
        matrixContext.setInstance(instance);

        // Start matrix client
        instance.startClient({
          initialSyncLimit: 1,
          includeArchivedRooms: false,
          lazyLoadMembers: true,
        });

        const userData = await instance.getUser(res.user_id || '');

        if (userData) {
          dispatch(setUserData(userData));
        }

        // Initial sync of matrix client
        instance.on('sync' as any, (state: string) => {
          if (state === 'ERROR') {
            return;
          }

          // Get rooms(Chats)
          const rooms = instance.getVisibleRooms();
          console.log(rooms);

          if (rooms.length > 0) {
            dispatch(
              setRooms(
                rooms
                  .sort((a, b) =>
                    a.getMyMembership().localeCompare(b.getMyMembership()),
                  )
                  .map(item => {
                    return {
                      myUserId: item.myUserId,
                      name: item.name,
                      normalizedName: item.normalizedName,
                      roomId: item.roomId,
                      timeline: item.timeline,
                      membership: item.getMyMembership(),
                      avatar_url: item.getMxcAvatarUrl(),
                      unreadCount: item.getUnreadNotificationCount(),
                    };
                  }),
              ),
            );
          }
        });
      })
      .catch(err => {
        console.log({ ...err });
        // If we got 401 error, thats mean not all registration steps are done
        if (err.httpStatus === 401) {
          setFlowResponse(err.data);

          if (
            err.data.completed &&
            err.data.completed.includes('m.login.recaptcha') &&
            err.data.completed.includes('m.login.terms')
          ) {
            dispatch(
              setActionsDrawerContent({
                title: 'Verify email',
                text: `Please check your email (${signUpData.email}) and validate before continuing further.`,
              }),
            );

            dispatch(setActionsDrawerVisible(true));
          }

          return;
        }

        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const onNext = async () => {
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
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        return;
      }

      const checkName = await checkUsername();

      if (!checkName) {
        return;
      }

      handleTerms();
    }

    if (currentStep === 1) {
      if (!isEmailValid(signUpData.email)) {
        dispatch(
          setActionsDrawerContent({
            title: 'Error',
            text: 'Email is not valid',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        return;
      }

      sendEmail();
    }

    if (currentStep === 2) {
      handleVerifyEmail();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  return (
    <View
      style={styles.container}
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
            termsLink={
              flowResponse.params['m.login.terms']?.policies?.privacy_policy?.en
                ?.url || ''
            }
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            isPassword={isPassword}
            setIsPassword={setIsPassword}
            server={signUpData.server}
            password={signUpData.password}
            isNewPasswordValid={isNewPasswordValid}
            username={signUpData.username}
            isAgree={isAgree}
            setIsAgree={setIsAgree}
            onChange={onChange}
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
            handleRecaptcha={handleRecaptcha}
            recaptchaKey={
              flowResponse.params['m.login.recaptcha'].public_key || ''
            }
            server={signUpData.server}
            email={signUpData.email}
            onChange={onChange}
            onNext={onNext}
            styles={styles}
            resendEmail={sendEmail}
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
            styles={styles}
            email={signUpData.email}
            resendEmail={sendEmail}
            onNext={onNext}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
  },
});

export default Registration;
