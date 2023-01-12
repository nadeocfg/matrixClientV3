import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IContent } from 'matrix-js-sdk';
import {
  Button,
  Center,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import React, { useEffect, useContext, useState } from 'react';
import BaseHeader from '../../components/BaseHeader';
import DefaultAvatar from '../../components/DefaultAvatar';
import { MatrixContext } from '../../context/matrixContext';
import theme from '../../themes/theme';
import { RootStackModel } from '../../types/rootStackType';
import { Linking } from 'react-native';
import CustomRadio from '../../components/CustomRadio';
import roleVariants from '../../utils/roleVariants';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';

interface UserProfileProps
  extends NativeStackScreenProps<RootStackModel, 'UserProfile'> {}

const UserProfile = ({ route }: UserProfileProps) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const [userData, setUserData] = useState({
    userId: '',
    displayName: '',
    avatarUrl: '',
  });
  const [canEdit, setCanEdit] = useState(false);
  const [permissions, setPermissions] = useState<IContent>({
    users: {},
    users_default: 0,
    events: {
      'm.room.name': 50,
      'm.room.power_levels': 100,
      'm.room.history_visibility': 100,
      'm.room.canonical_alias': 50,
      'm.room.avatar': 50,
      'm.room.tombstone': 100,
      'm.room.server_acl': 100,
      'm.room.encryption': 100,
    },
    events_default: 0,
    state_default: 50,
    ban: 50,
    kick: 50,
    redact: 50,
    invite: 50,
    historical: 100,
  });

  useEffect(() => {
    const user = matrixContext.instance?.getUser(route.params.userId);

    if (route.params.roomId) {
      const room = matrixContext.instance?.getRoom(route.params.roomId);
      const pLEvent = room?.currentState.getStateEvents(
        'm.room.power_levels',
      )[0];
      const currentPermissions = pLEvent?.getContent();
      if (currentPermissions) {
        setPermissions(currentPermissions);
      }

      const hasPermission = room?.currentState.maySendStateEvent(
        'm.room.power_levels',
        matrixContext.instance?.getUserId() || '',
      );

      setCanEdit(hasPermission !== undefined ? hasPermission : false);
    }

    setUserData({
      displayName: user?.displayName || '',
      userId: user?.userId || '',
      avatarUrl:
        matrixContext.instance?.mxcUrlToHttp(user?.avatarUrl || '') || '',
    });
  }, [route.params.userId, route.params.roomId]);

  const openFullPhoto = () => {
    Linking.openURL(userData?.avatarUrl || '');
  };

  const changeRole = (value: number) => {
    setPermissions({
      ...permissions,
      users: {
        ...permissions.users,
        [userData.userId]: value,
      },
    });
  };

  const save = () => {
    if (!route.params.roomId) {
      return;
    }

    dispatch(setLoader(true));

    matrixContext.instance
      ?.sendStateEvent(route.params.roomId, 'm.room.power_levels', permissions)
      .then(() => {
        toast.show({
          description: 'Saved successfully',
          variant: 'success',
        });

        const room = matrixContext.instance?.getRoom(route.params.roomId);
        room?.loadMembersIfNeeded();
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

  const SaveButton = () => {
    return (
      <Button variant="ghost" onPress={save}>
        Save
      </Button>
    );
  };

  return (
    <>
      <BaseHeader title="Profile" action={<SaveButton />} />
      <ScrollView
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Center mt={8}>
          {userData.avatarUrl ? (
            <Pressable onPress={openFullPhoto}>
              <Image
                src={userData.avatarUrl}
                alt="User avatar"
                borderRadius="full"
                width={40}
                height={40}
              />
            </Pressable>
          ) : (
            <DefaultAvatar
              name={(userData.displayName && userData.displayName[0]) || ''}
              width={40}
              fontSize={60}
            />
          )}

          <Heading size="md" mt={4}>
            {userData.displayName}
          </Heading>
          <Text fontSize={16} mt={2}>
            {userData.userId}
          </Text>

          {permissions.users[userData.userId] === 101 && (
            <Text fontSize={16} mt={2}>
              Founder
            </Text>
          )}
        </Center>

        {canEdit && permissions.users[userData.userId] !== 101 && (
          <CustomRadio
            canEdit={canEdit}
            mt={8}
            onChange={changeRole}
            value={permissions.users[userData.userId] || 0}
            items={roleVariants}
          />
        )}
      </ScrollView>
    </>
  );
};

export default UserProfile;
