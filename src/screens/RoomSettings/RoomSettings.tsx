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
  useColorMode,
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
import {
  LockIcon,
  PlusRoundedIcon,
  QuestionMarkRounded,
} from '../../components/icons';
import SearchUsers from '../../components/SearchUsers';
import { UserDirectoryItemModel } from '../../types/userDirectoryItemModel';
import { SearchDataModel } from '../../types/searchDataModel';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import { useAppDispatch } from '../../hooks/useDispatch';
import MenuList, { ItemModel } from '../../components/MenuList';
import { navigate } from '../../utils/navigation';
import { useFocusEffect } from '@react-navigation/native';

interface RoomSettingsProps
  extends NativeStackScreenProps<RootStackModel, 'RoomSettings'> {}

const RoomSettings = ({ route }: RoomSettingsProps) => {
  const dispatch = useAppDispatch();
  const { colorMode } = useColorMode();
  const [roomData, setRoomData] = useState<Room | null | undefined>(undefined);
  const [avatar, setAvatar] = useState({
    fullAvatar: '',
    avatar: '',
  });
  const [joinedMembers, setJoinedMembers] = useState<RoomMember[]>([]);
  const [invitedMembers, setInvitedMembers] = useState<RoomMember[]>([]);
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
  const leaveMenu: ItemModel[] = [];

  const settingsMenu: ItemModel[] = [
    // {
    //   title: 'Group Link',
    //   icon: <LinkIcon />,
    //   onPress: () => {},
    // },
    {
      title: 'Permissions',
      icon: (
        <LockIcon
          color={colorMode === 'light' ? theme.greyIcon : theme.white}
        />
      ),
      onPress: () =>
        navigate('RoomPermissionSettings', { roomId: route.params.roomId }),
    },
    {
      title: 'Leave Group',
      icon: (
        <QuestionMarkRounded
          color={colorMode === 'light' ? theme.greyIcon : theme.white}
        />
      ),
      onPress: () => onLeavePress(),
    },
  ];

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

  const initialSync = () => {
    const room = matrixContext.instance?.getRoom(route.params.roomId);

    room?.loadMembersIfNeeded().then(() => {
      console.log(room?.getMembersWithMembership('invite'));
      setJoinedMembers(room?.getMembersWithMembership('join') || []);
      setInvitedMembers(room?.getMembersWithMembership('invite') || []);
    });
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

    dispatch(setLoader(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      const room = matrixContext.instance?.getRoom(route.params.roomId);

      room?.loadMembersIfNeeded().then(() => {
        console.log(room?.getMembersWithMembership('invite'));
        setJoinedMembers(room?.getMembersWithMembership('join') || []);
        setInvitedMembers(room?.getMembersWithMembership('invite') || []);
      });
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
    }, [route.params.roomId]),
  );

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
        setFoundedUsers(res.results.filter(item => item.display_name));
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
    return (
      <Button
        variant="ghost"
        onPress={() =>
          navigate('RoomProfileSettings', { roomId: route.params.roomId })
        }>
        Edit
      </Button>
    );
  };

  const Save = () => {
    return (
      <Button variant="ghost" onPress={inviteMembers}>
        Save
      </Button>
    );
  };

  // Invite selected members
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

    // Clear selected and founded users arrays. Close add new members screen
    setSearchData({
      searchValue: '',
      isSearching: false,
    });

    setSelectedUsers([]);
    setFoundedUsers([]);

    setIsAddNewMembers(false);

    setTimeout(initialSync, 1000);
  };

  const addMembers = () => {
    setIsAddNewMembers(true);
  };

  const isUserInclude = (user: UserDirectoryItemModel) => {
    return selectedUsers.includes(user);
  };

  const onSearchValueChange = (value: string) => {
    setSearchData({
      ...searchData,
      searchValue: value,
    });
  };

  const onSelectUser = (user: UserDirectoryItemModel) => {
    const isSelected = isUserInclude(user);

    if (isSelected) {
      const arr = selectedUsers.filter(item => item.user_id !== user.user_id);

      setSelectedUsers(arr);
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Leave confirmation drawer
  const onLeavePress = () => {
    dispatch(
      setActionsDrawerContent({
        title: 'Confirm action',
        text: 'Are you sure you want to leave this chat?',
        actions: [
          {
            title: 'Leave',
            onPress: () => leave(),
          },
          {
            title: 'Cancel',
            onPress: () => dispatch(setActionsDrawerVisible(false)),
          },
        ],
      }),
    );

    dispatch(setActionsDrawerVisible(true));
  };

  // Leave action
  const leave = () => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.leave(route.params.roomId)
      .then(() => {
        navigate('RoomList');
        dispatch(setActionsDrawerVisible(false));
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
        dispatch(setLoader(false));
      });
  };

  // When pressing on invited users
  const onInvitedPress = (userId: string, username: string) => {
    const room = matrixContext.instance?.getRoom(route.params.roomId);
    const roomPowerLevel = room?.currentState.getStateEvents(
      'm.room.power_levels',
    )[0]?.event?.content;

    const currentUserPowerLevel =
      roomPowerLevel?.users[matrixContext.instance?.getUserId() || ''];

    if (currentUserPowerLevel < roomPowerLevel?.kick) {
      return;
    }

    dispatch(
      setActionsDrawerContent({
        title: 'Confirm action',
        text: `Cancel invite for ${username}`,
        actions: [
          {
            title: 'Cancel invite',
            onPress: () => kickUser(userId, 'Cancel invite'),
          },
          {
            title: 'Cancel',
            onPress: () => dispatch(setActionsDrawerVisible(false)),
          },
        ],
      }),
    );

    dispatch(setActionsDrawerVisible(true));
  };

  const kickUser = (userId: string, reason?: string) => {
    if (route.params.roomId && userId) {
      dispatch(setLoader(true));

      dispatch(setActionsDrawerVisible(false));

      matrixContext.instance
        ?.kick(route.params.roomId, userId, reason)
        .then(() => {
          setTimeout(initialSync, 1000);
        })
        .catch(err => {
          console.log({ ...err });

          dispatch(
            setActionsDrawerContent({
              title: err.data?.errcode || '',
              text: err.data?.error || 'Something went wrong',
            }),
          );

          dispatch(setLoader(false));
          dispatch(setActionsDrawerVisible(true));
        });
    }
  };

  // Show another screen, when add new members button press
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

  const onMemberPress = (userId: string, username: string) => {
    const room = matrixContext.instance?.getRoom(route.params.roomId);
    const roomPowerLevel = room?.currentState.getStateEvents(
      'm.room.power_levels',
    )[0]?.event?.content;

    const currentUserPowerLevel =
      roomPowerLevel?.users[matrixContext.instance?.getUserId() || ''];

    if (currentUserPowerLevel >= roomPowerLevel?.kick) {
      dispatch(
        setActionsDrawerContent({
          title: 'Select actions',
          text: `Available actions for ${username}`,
          actions: [
            {
              title: 'Member profile',
              onPress: () => {
                navigate('UserProfile', {
                  userId,
                  roomId: route.params.roomId,
                });
                dispatch(setActionsDrawerVisible(false));
              },
            },
            {
              title: 'Kick member',
              onPress: () => kickUser(userId, 'Kick member'),
            },
            {
              title: 'Cancel',
              onPress: () => dispatch(setActionsDrawerVisible(false)),
            },
          ],
        }),
      );

      dispatch(setActionsDrawerVisible(true));
    } else {
      navigate('UserProfile', { userId, roomId: route.params.roomId });
    }
  };

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

          {roomData?.currentState?.getStateEvents('m.room.topic')[0] &&
            roomData?.currentState?.getStateEvents('m.room.topic')[0].event
              ?.content?.topic && (
              <Center>
                <Text fontSize="md" mt={2}>
                  {
                    roomData?.currentState?.getStateEvents('m.room.topic')[0]
                      .event?.content?.topic
                  }
                </Text>
              </Center>
            )}
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
            <Pressable
              onPress={() => onMemberPress(member.userId, member.name)}
              key={member.userId}>
              <Box style={listStyle.listItem}>
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
            </Pressable>
          ))}
        </Box>

        {invitedMembers.length > 0 && (
          <>
            <Heading size="md" mt={4} mb={2}>
              Invited
            </Heading>

            <Box style={listStyle.container}>
              {invitedMembers.map(member => (
                <Pressable
                  onPress={() => onInvitedPress(member.userId, member.name)}
                  key={member.userId}>
                  <Box style={listStyle.listItem}>
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
                </Pressable>
              ))}
            </Box>
          </>
        )}

        <MenuList mt={8} mb={8} withIcons items={settingsMenu} />

        <MenuList mt={4} mb={8} withIcons items={leaveMenu} />
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
    borderColor: theme.border,
  },
});

export default RoomSettings;
