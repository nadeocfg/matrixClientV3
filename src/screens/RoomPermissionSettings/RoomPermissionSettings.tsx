import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IContent } from 'matrix-js-sdk';
import { Button, ScrollView } from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import BaseHeader from '../../components/BaseHeader';
import CustomRadio from '../../components/CustomRadio';
import { MatrixContext } from '../../context/matrixContext';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import theme from '../../themes/theme';
import { RootStackModel } from '../../types/rootStackType';
import { navigationRef } from '../../utils/navigation';
import permissionVariants from '../../utils/permissionVariants';

interface RoomPermissionSettingsProps
  extends NativeStackScreenProps<RootStackModel, 'RoomPermissionSettings'> {}

const RoomPermissionSettings = ({ route }: RoomPermissionSettingsProps) => {
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const [permissions, setPermissions] = useState<IContent>({
    users: {
      '@test1:dev.techwings.com': 100,
    },
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
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const room = matrixContext.instance?.getRoom(route.params.roomId);
    const pLEvent = room?.currentState.getStateEvents('m.room.power_levels')[0];
    const currentPermissions = pLEvent?.getContent();

    setCanEdit(canChangePermissions());

    if (currentPermissions) {
      setPermissions(currentPermissions);
    }
  }, [route.params.roomId]);

  const onChange = (name: string) => (value: string) => {
    if (name.startsWith('m.')) {
      setPermissions({
        ...permissions,
        events: {
          ...permissions.events,
          [name]: value,
        },
      });

      return;
    }

    setPermissions({
      ...permissions,
      [name]: value,
    });
  };

  const save = () => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.sendStateEvent(route.params.roomId, 'm.room.power_levels', permissions)
      .then(() => {
        if (navigationRef.canGoBack()) {
          navigationRef.goBack();
        }
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
      <Button onPress={save} variant="ghost">
        Save
      </Button>
    );
  };

  const canChangePermissions = (): boolean => {
    const room = matrixContext.instance?.getRoom(route.params.roomId);

    const hasPermission = room?.currentState.maySendStateEvent(
      'm.room.power_levels',
      matrixContext.instance?.getUserId() || '',
    );

    return hasPermission !== undefined ? hasPermission : false;
  };

  return (
    <>
      <BaseHeader title="Permissions" action={<SaveButton />} />
      <ScrollView
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Send messages"
          onChange={onChange('events_default')}
          value={permissions.events_default}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Delete messages sent by others"
          onChange={onChange('redact')}
          value={permissions.redact}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Invite members"
          onChange={onChange('invite')}
          value={permissions.invite}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Kick members"
          onChange={onChange('kick')}
          value={permissions.kick}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Ban members"
          onChange={onChange('ban')}
          value={permissions.ban}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Change chat avatar"
          onChange={onChange('m.room.avatar')}
          value={permissions.events['m.room.avatar']}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Change chat name"
          onChange={onChange('m.room.name')}
          value={permissions.events['m.room.name']}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Change chat topic"
          onChange={onChange('m.room.topic')}
          value={permissions.events['m.room.topic']}
          items={permissionVariants}
        />

        <CustomRadio
          canEdit={canEdit}
          mb={6}
          label="Change permissions"
          onChange={onChange('m.room.power_levels')}
          value={permissions.events['m.room.power_levels']}
          items={permissionVariants}
        />
      </ScrollView>
    </>
  );
};

export default RoomPermissionSettings;
