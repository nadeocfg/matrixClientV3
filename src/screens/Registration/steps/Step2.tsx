import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
} from 'native-base';
import React, { useCallback, useRef } from 'react';
import { StyleProp } from 'react-native';
import Recaptcha, { RecaptchaHandles } from 'react-native-recaptcha-that-works';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { useAppDispatch } from '../../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../../store/actions/mainActions';
import theme from '../../../themes/theme';
import validateUrl from '../../../utils/validateUrl';

interface Step2Props {
  email: string;
  recaptchaKey: string;
  server: string;
  onChange: Function;
  onNext: () => void;
  resendEmail: () => void;
  styles: StyleProp<any>;
  handleRecaptcha: (token: string) => void;
}

const Step2 = ({
  email,
  server,
  recaptchaKey,
  onChange,
  onNext,
  resendEmail,
  handleRecaptcha,
  styles,
}: Step2Props) => {
  const $recaptcha = useRef<RecaptchaHandles>(null);
  const dispatch = useAppDispatch();

  const openRecaptcha = useCallback(() => {
    $recaptcha.current?.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current?.close();
  }, []);

  const onError = (err?: string) => {
    console.log(err);

    dispatch(
      setActionsDrawerContent({
        title: 'Error',
        text: err || 'Something went wrong, try again',
      }),
    );

    dispatch(setActionsDrawerVisible(true));
  };

  const onVerify = (token: string) => {
    handleRecaptcha(token);
    onNext();
  };

  const onLoad = () => {
    console.log('Recaptcha loaded');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      px={4}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Center mt={4} mb={12}>
        <DefaultAvatar name="A" width={32} fontSize={48} />
        <Heading my={2}>Enter your email</Heading>
        <Text variant="grey">matrix.org needs to verify your account</Text>
      </Center>

      <Box style={styles.inner}>
        <FormControl mb={8}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={email}
            onChangeText={onChange('email')}
          />
        </FormControl>

        <Button onPress={openRecaptcha}>Next</Button>
      </Box>

      <Center flexDirection="column" my={4}>
        Did not receive an email?
        <Button variant="link" size="sm" onPress={resendEmail}>
          Resend email
        </Button>
      </Center>

      <Recaptcha
        ref={$recaptcha}
        headerComponent={<Button onPress={handleClosePress}>Cancel</Button>}
        siteKey={recaptchaKey}
        // baseUrl={server}
        baseUrl={validateUrl(server)}
        // Key from matrix.org
        // siteKey="6LcgI54UAAAAABGdGmruw6DdOocFpYVdjYBRe4zb"

        // Test key
        // siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        size={'normal'}
        onError={onError}
        onExpire={onError}
        onVerify={onVerify}
        onLoad={onLoad}
        enterprise={false}
        hideBadge={false}
      />
    </ScrollView>
  );
};

export default Step2;
