import {
  Box,
  Button,
  Center,
  PresenceTransition,
  ScrollView,
  useColorMode,
} from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../themes/theme';
import { navigate } from '../../utils/navigation';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';

const Registration: React.FC<PropsWithChildren<any>> = () => {
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

  const onChange = (name: string) => (value: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  console.log(currentStep);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      p={4}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Box style={styles.inner}>
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
              onChange={onChange}
              onNext={onNext}
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
              colorMode={colorMode || 'light'}
              email={signUpData.email}
              onChange={onChange}
              onNext={onNext}
            />
          </PresenceTransition>
        )}

        <Center flexDirection="row">
          Already have an account?{' '}
          <Button variant="link" onPress={() => navigate('Login')}>
            Log in
          </Button>
        </Center>
      </Box>
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
