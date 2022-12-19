import { Heading, ScrollView } from 'native-base';
import React from 'react';
import theme from '../../themes/theme';

const ForgotPassword = () => {
  return (
    <ScrollView
      p={4}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Heading>Forgot password</Heading>
    </ScrollView>
  );
};

export default ForgotPassword;
