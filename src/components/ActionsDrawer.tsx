import { Actionsheet, Box, Heading, Text } from 'native-base';
import React from 'react';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';
import { setActionsDrawerVisible } from '../store/actions/mainActions';
import { StoreModel } from '../types/storeTypes';

const ActionsDrawer = () => {
  const actionsDrawerState = useAppSelector(
    (state: StoreModel) => state.mainStore.actionsDrawer,
  );
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setActionsDrawerVisible(false));
  };

  return (
    <Actionsheet
      isOpen={actionsDrawerState.isVisible}
      onClose={onClose}
      hideDragIndicator>
      <Actionsheet.Content p={0}>
        <Box w="100%">
          <Heading textAlign="center" mt={4} mb={2}>
            {actionsDrawerState.content.title}
          </Heading>
          <Text textAlign="center" mb={4} px={2} fontSize={16}>
            {actionsDrawerState.content.text}
          </Text>
        </Box>

        {actionsDrawerState.content.actions.map((item, index) => (
          <Actionsheet.Item
            onPress={() => item.onPress()}
            key={index}
            alignItems="center">
            {item.title}
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ActionsDrawer;
