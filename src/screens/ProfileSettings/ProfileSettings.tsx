import { ScrollView } from 'native-base';
import React from 'react';
import BaseHeader from '../../components/BaseHeader';
import LogOutButton from '../../components/LogOutButton';
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
      <BaseHeader
        title="Settings and privacy"
        action={<LogOutButton variant="ghost" />}
      />
    </ScrollView>
  );
};

export default ProfileSettings;
