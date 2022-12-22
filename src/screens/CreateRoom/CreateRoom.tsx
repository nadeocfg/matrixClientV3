import { Box, Center, Heading, ScrollView } from 'native-base';
import React from 'react';
import theme from '../../themes/theme';
import { StyleSheet } from 'react-native';

const CreateRoom = () => {
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
        <Center mb={12}>
          <Heading>Create Room</Heading>
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

export default CreateRoom;
