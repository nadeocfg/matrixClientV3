import { Room, RoomMember } from 'matrix-js-sdk';
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  PresenceTransition,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import BaseHeader from '../../components/BaseHeader';
import DefaultAvatar from '../../components/DefaultAvatar';
import { MatrixContext } from '../../context/matrixContext';
import theme from '../../themes/theme';
import { Linking, StyleSheet } from 'react-native';
import { RootStackModel } from '../../types/rootStackType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import getPowerLabel from '../../utils/getPowerLabel';
import { PlusRoundedIcon } from '../../components/icons';
import SearchUsers from '../../components/SearchUsers';
import { UserDirectoryItemModel } from '../../types/userDirectoryItemModel';
import { SearchDataModel } from '../../types/searchDataModel';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import { useAppDispatch } from '../../hooks/useDispatch';

interface RoomSettingsProps
  extends NativeStackScreenProps<RootStackModel, 'RoomSettings'> {}

const RoomSettings = ({ route }: RoomSettingsProps) => {
  const dispatch = useAppDispatch();
  const [roomData, setRoomData] = useState<Room | null | undefined>(undefined);
  const [avatar, setAvatar] = useState({
    fullAvatar: '',
    avatar: '',
  });
  const [joinedMembers, setJoinedMembers] = useState<RoomMember[]>([]);
  const matrixContext = useContext(MatrixContext);
  const [isAddNewMembers, setIsAddNewMembers] = useState(false);
  const [searchData, setSearchData] = useState<SearchDataModel>({
    searchValue: '',
    isSearching: false,
  });
  const [foundedUsers, setFoundedUsers] = useState<UserDirectoryItemModel[]>(
    [],
  );
  const [selectedUsers, setSelectedUsers] = useState<UserDirectoryItemModel[]>(
    [],
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (searchData.searchValue.trim().length > 3) {
      timer = setTimeout(() => {
        search(searchData.searchValue);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchData.searchValue]);

  useEffect(() => {
    const room = matrixContext.instance?.getRoom(route.params.roomId);
    setRoomData(room);
    setAvatar({
      avatar:
        room?.getAvatarUrl(
          matrixContext.instance?.baseUrl || '',
          64,
          64,
          'crop',
        ) || '',
      fullAvatar:
        matrixContext.instance?.mxcUrlToHttp(room?.getMxcAvatarUrl() || '') ||
        '',
    });

    setJoinedMembers(room?.getMembersWithMembership('join') || []);
  }, [route.params.roomId]);

  const search = (value: string) => {
    setSearchData({
      ...searchData,
      isSearching: true,
    });

    matrixContext.instance
      ?.searchUserDirectory({
        term: value.trim(),
        limit: 10,
      })
      .then(res => {
        setFoundedUsers(res.results);
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

  const openFullPhoto = () => {
    Linking.openURL(avatar.fullAvatar);
  };

  const EditButton = () => {
    return <Button variant="ghost">Edit</Button>;
  };

  const Save = () => {
    return (
      <Button variant="ghost" onPress={inviteMembers}>
        Save
      </Button>
    );
  };

  const inviteMembers = async () => {
    dispatch(setLoader(true));

    for (const user of selectedUsers) {
      await matrixContext.instance
        ?.invite(route.params.roomId, user.user_id)
        .catch(err => {
          console.log({ ...err });

          dispatch(
            setActionsDrawerContent({
              title: err.data?.errcode || '',
              text: err.data?.error || 'Something went wrong',
            }),
          );

          dispatch(setActionsDrawerVisible(true));
        });
    }

    setSearchData({
      searchValue: '',
      isSearching: false,
    });

    setSelectedUsers([]);
    setFoundedUsers([]);

    setIsAddNewMembers(false);

    dispatch(setLoader(false));
  };

  const addMembers = () => {
    setIsAddNewMembers(true);
  };

  const isUserInclude = (userId: string) => {
    return selectedUsers.filter(item => item.user_id === userId).length > 0;
  };

  const onSearchValueChange = (value: string) => {
    setSearchData({
      ...searchData,
      searchValue: value,
    });
  };

  const onSelectUser = (user: UserDirectoryItemModel) => {
    const isSelected = isUserInclude(user.user_id);

    if (isSelected) {
      setSelectedUsers(
        selectedUsers.filter(item => item.user_id !== user.user_id),
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  if (isAddNewMembers) {
    return (
      <PresenceTransition
        visible={isAddNewMembers}
        initial={{
          translateY: 500,
        }}
        animate={{
          translateY: 0,
          transition: {
            duration: 100,
          },
        }}>
        <BaseHeader
          title="Select Members"
          backAction={() => setIsAddNewMembers(false)}
          action={<Save />}
        />
        <SearchUsers
          matrixContext={matrixContext}
          foundedUsers={foundedUsers}
          isSearching={searchData.isSearching}
          isUserInclude={isUserInclude}
          onSearchValueChange={onSearchValueChange}
          onSelectUser={onSelectUser}
          searchValue={searchData.searchValue}
          selectedUsers={selectedUsers}
        />
      </PresenceTransition>
    );
  }

  return (
    <>
      <BaseHeader title="Chat settings" action={<EditButton />} />
      <ScrollView
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Center mt={8}>
          {avatar.avatar ? (
            <Pressable onPress={openFullPhoto}>
              <Image
                src={avatar.avatar}
                alt="User avatar"
                borderRadius="full"
                width={40}
                height={40}
              />
            </Pressable>
          ) : (
            <DefaultAvatar
              name={(roomData?.name && roomData?.name[0]) || ''}
              width={40}
              fontSize={60}
            />
          )}
          <Heading mt={4}>{roomData?.name}</Heading>
        </Center>

        <Heading size="md" mt={4} mb={2}>
          {joinedMembers.length === 1
            ? `${joinedMembers.length} member`
            : `${joinedMembers.length} members`}
        </Heading>

        <Box style={listStyle.container}>
          <Pressable onPress={addMembers}>
            <Box style={listStyle.listItem}>
              <PlusRoundedIcon />

              <Text ml={4}>Add Members</Text>
            </Box>
          </Pressable>

          {joinedMembers.map(member => (
            <Box style={listStyle.listItem} key={member.userId}>
              {member.getAvatarUrl(
                matrixContext.instance?.baseUrl || '',
                48,
                48,
                'crop',
                false,
                false,
              ) ? (
                <Image
                  src={
                    member.getAvatarUrl(
                      matrixContext.instance?.baseUrl || '',
                      48,
                      48,
                      'crop',
                      false,
                      false,
                    ) || ''
                  }
                  alt="User avatar"
                  borderRadius="full"
                  width={8}
                  height={8}
                />
              ) : (
                <DefaultAvatar
                  name={member.name ? member.name[0] : ''}
                  width={8}
                  fontSize={16}
                />
              )}
              <Text ml={4}>{member.name}</Text>
              <Text ml="auto">{getPowerLabel(member.powerLevel)}</Text>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </>
  );
};

const listStyle = StyleSheet.create({
  container: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 0.5,
  },
});

export default RoomSettings;
