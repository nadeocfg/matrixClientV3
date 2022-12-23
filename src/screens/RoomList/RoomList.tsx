import { Center, Heading, ScrollView } from 'native-base';
import React, { useEffect, useContext } from 'react';
import { useAppSelector } from '../../hooks/useSelector';
import theme from '../../themes/theme';
import { StoreModel } from '../../types/storeTypes';
import { StyleSheet } from 'react-native';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import { setRooms } from '../../store/actions/roomsActions';
import RoomListItem from '../../components/RoomListItem';
import { navigate } from '../../utils/navigation';
import RoomListHeader from './components/RoomListHeader';

const RoomList = () => {
  const dispatch = useAppDispatch();
  const roomList = useAppSelector(
    (state: StoreModel) => state.roomsStore.rooms,
  );
  const matrixContext = useContext(MatrixContext);

  useEffect(() => {
    // Get rooms(Chats)
    const rooms = matrixContext.instance?.getRooms() || [];

    dispatch(
      setRooms(
        rooms.map(item => {
          return {
            myUserId: item.myUserId,
            name: item.name,
            normalizedName: item.normalizedName,
            roomId: item.roomId,
            timeline: item.timeline,
          };
        }),
      ),
    );
  }, []);

  const onSelectRoom = (roomId: string, roomName: string) => {
    navigate('RoomItem', { roomId: roomId, roomName: roomName });
  };

  return (
    <>
      <RoomListHeader />

      <ScrollView
        contentContainerStyle={styles.container}
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        {roomList.length === 0 && (
          <Center
            style={styles.container}
            _light={{
              bg: theme.light.bgColor,
            }}
            _dark={{
              bg: theme.dark.bgColor,
            }}>
            <RoomListHeader />
            <Heading>No active chats</Heading>
          </Center>
        )}

        {roomList.map(item => (
          <RoomListItem
            key={item.roomId}
            roomId={item.roomId}
            message={
              item.timeline[item.timeline.length - 1]?.event?.type ===
              'm.room.message'
                ? item.timeline[item.timeline.length - 1]?.event?.content?.body
                : '...'
            }
            name={item.name}
            onSelectRoom={onSelectRoom}
            mb={4}
          />
        ))}
      </ScrollView>
    </>
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

export default RoomList;
