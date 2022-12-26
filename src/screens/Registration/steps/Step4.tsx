import { Box, Button, Center, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import { MockedLogo } from '../../../components/icons';
import { useAppSelector } from '../../../hooks/useSelector';
import theme from '../../../themes/theme';
import { StoreModel } from '../../../types/storeTypes';
import { navigate } from '../../../utils/navigation';

interface Step4Props {
  styles?: StyleProp<any>;
}

const Step4 = ({ styles }: Step4Props) => {
  const userId = useAppSelector(
    (state: StoreModel) => state.userStore.authResponse.user_id,
  );

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
        <MockedLogo />
        <Heading mt={4}>Congratulations!</Heading>
        <Text mt={4}>Your account {userId} has been created</Text>
      </Center>

      <Box style={styles.inner} />

      <Center flexDirection="column">
        <Button onPress={() => navigate('Home')} mb={4} width="100%">
          Personalise profile
        </Button>
        <Button variant="link" onPress={() => navigate('Home')}>
          Take me home
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step4;
