import { Heading, ScrollView } from 'native-base';
import React from 'react';
import theme from '../../themes/theme';

const ProfileSettings = () => {
  return (
    <ScrollView
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <Heading>Settings and privacy</Heading>
    </ScrollView>
  );
};

export default ProfileSettings;
