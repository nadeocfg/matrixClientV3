import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import theme from '../../../themes/theme';

interface Step1Props {
  email: string;
  onChangeEmail: (value: string) => void;
  onNext: () => void;
  styles: StyleProp<any>;
}

const Step1 = ({ email, onChangeEmail, onNext, styles }: Step1Props) => {
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
      <Center mb={12}>
        <DefaultAvatar name="A" width={32} fontSize={48} />
        <Heading mt={4}>Enter your email</Heading>
        <Text variant="grey" mt={4}>
          matrix.org will send you a verification link
        </Text>
      </Center>

      <Box style={styles.inner}>
        <FormControl mb={8}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            fontSize="md"
            w="100%"
            variant="unstyled"
            value={email}
            onChangeText={onChangeEmail}
          />
        </FormControl>

        <Button onPress={onNext}>Next</Button>
      </Box>
    </ScrollView>
  );
};

export default Step1;
