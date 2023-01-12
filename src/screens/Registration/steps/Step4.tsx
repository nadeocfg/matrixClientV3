import { Box, Button, Center, Heading, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleProp } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { useAppSelector } from '../../../hooks/useSelector';
import theme from '../../../themes/theme';
import { StoreModel } from '../../../types/storeTypes';
import { navigate, navigationRef } from '../../../utils/navigation';

interface Step4Props {
  styles?: StyleProp<any>;
}

const Step4 = ({ styles }: Step4Props) => {
  const userId = useAppSelector(
    (state: StoreModel) => state.userStore.authResponse.user_id,
  );

  const goToRoomList = () => {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'RoomList' }],
    });
  };

  const goToProfileSettings = () => {
    navigate('ProfileSettings');
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
        <Heading mt={4}>Congratulations!</Heading>
        <Text mt={4}>Your account {userId} has been created</Text>
      </Center>

      <Box style={styles.inner} />

      <Center flexDirection="column" my={4}>
        <Button onPress={goToProfileSettings} mb={4} width="100%">
          Personalise profile
        </Button>
        <Button variant="link" onPress={goToRoomList}>
          Take me home
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Step4;
