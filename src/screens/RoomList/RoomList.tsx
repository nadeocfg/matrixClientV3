import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  ScrollView,
  Spinner,
} from 'native-base';
import React, { useEffect, useContext, useState } from 'react';
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
import { MagnifierIcon } from '../../components/icons';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import { IPublicRoomsChunkRoom } from 'matrix-js-sdk';
import formatTime from '../../utils/formatTime';

const RoomList = () => {
  const dispatch = useAppDispatch();
  const roomList = useAppSelector(
    (state: StoreModel) => state.roomsStore.rooms,
  );
  const matrixContext = useContext(MatrixContext);
  const userData = useAppSelector((state: StoreModel) => state.userStore.user);
  const [searchData, setSearchData] = useState<{
    value: string;
    isSearching: boolean;
  }>({
    value: '',
    isSearching: false,
  });
  const [foundedRooms, setFoundedRooms] = useState<IPublicRoomsChunkRoom[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (searchData.value.trim().length > 0) {
      timer = setTimeout(() => {
        search(searchData.value);
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchData.value]);

  useEffect(() => {
    // Get rooms(Chats)
    const rooms = matrixContext.instance?.getVisibleRooms() || [];

    dispatch(
      setRooms(
        rooms.map(item => {
          return {
            myUserId: item.myUserId,
            name: item.name,
            normalizedName: item.normalizedName,
            roomId: item.roomId,
            timeline: item.timeline,
            avatar_url: item.getMxcAvatarUrl(),
            membership: item.getMyMembership(),
            unreadCount: item.getUnreadNotificationCount(),
          };
        }),
      ),
    );
  }, []);

  const onSelectRoom = (roomId: string, roomName: string) => {
    navigate('RoomItem', { roomId: roomId, roomName: roomName });
  };

  const onChange = (value: string) => {
    setSearchData({
      ...searchData,
      value,
    });
  };

  const search = (searchValue: string) => {
    setSearchData({
      ...searchData,
      isSearching: true,
    });

    matrixContext.instance
      ?.publicRooms({
        limit: 10,
        filter: {
          generic_search_term: searchValue,
        },
      })
      .then(res => {
        setFoundedRooms(res.chunk);
        console.log(res);
      })
      .catch(err => {
        console.log({ ...err });

        dispatch(
          setActionsDrawerContent({
            title: err.data?.errcode || '',
            text: err.data?.error || 'Something went wrong',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
      })
      .finally(() => {
        setSearchData({
          ...searchData,
          isSearching: false,
        });
      });
  };

  const onCancel = () => {
    setSearchData({
      isSearching: false,
      value: '',
    });

    setFoundedRooms([]);
  };

  return (
    <>
      <RoomListHeader
        userAvatar={
          matrixContext.instance?.mxcUrlToHttp(userData.avatarUrl) || ''
        }
      />

      <ScrollView
        contentContainerStyle={styles.container}
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Flex direction="row" align="center">
          <Input
            flexGrow={1}
            flexBasis="80%"
            mt={2}
            mb={2}
            variant="outline"
            InputLeftElement={<MagnifierIcon style={{ marginLeft: 4 }} />}
            placeholder="Search"
            value={searchData.value}
            onChangeText={onChange}
            InputRightElement={
              searchData.isSearching ? <Spinner mr={2} /> : <></>
            }
          />
          {searchData.value && (
            <Button onPress={onCancel} ml={4} variant="link">
              Cancel
            </Button>
          )}
        </Flex>

        {foundedRooms.map(room => (
          <RoomListItem
            key={room.room_id}
            avatarUrl={room.avatar_url || ''}
            message={room.topic}
            roomId={room.room_id}
            name={room.name || ''}
            onSelectRoom={onSelectRoom}
            eventTime={''}
          />
        ))}

        {roomList.length === 0 && (
          <Center
            style={styles.container}
            _light={{
              bg: theme.light.bgColor,
            }}
            _dark={{
              bg: theme.dark.bgColor,
            }}>
            <Heading>No active chats</Heading>
          </Center>
        )}

        {roomList.map(item => (
          <RoomListItem
            key={item.roomId}
            avatarUrl={item.avatar_url}
            roomId={item.roomId}
            message={
              item.membership === 'invite'
                ? "You're were invited"
                : item.timeline[item.timeline.length - 1]?.event?.type ===
                  'm.room.message'
                ? item.timeline[item.timeline.length - 1]?.event?.content?.body
                : '...'
            }
            name={item.name}
            onSelectRoom={onSelectRoom}
            eventTime={formatTime(
              item.timeline[item.timeline.length - 1]?.event?.origin_server_ts,
            )}
            unreadCount={item.unreadCount}
            membership={item.membership}
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
