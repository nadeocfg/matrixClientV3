import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  TextArea,
} from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import BaseHeader from '../../components/BaseHeader';
import DefaultAvatar from '../../components/DefaultAvatar';
import { MatrixContext } from '../../context/matrixContext';
import theme from '../../themes/theme';
import { RootStackModel } from '../../types/rootStackType';
import { Linking } from 'react-native';
import { useAppDispatch } from '../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { setNeedUpdateCurrentRoom } from '../../store/actions/roomsActions';

interface RoomProfileSettingsProps
  extends NativeStackScreenProps<RootStackModel, 'RoomProfileSettings'> {}

const RoomProfileSettings = ({ route }: RoomProfileSettingsProps) => {
  const dispatch = useAppDispatch();
  const matrixContext = useContext(MatrixContext);
  const [roomData, setRoomData] = useState({
    topic: '',
    avatarUrl: '',
    name: '',
  });

  const avatarUrl = matrixContext.instance?.mxcUrlToHttp(
    matrixContext.instance
      ?.getRoom(route.params.roomId)
      ?.currentState.events?.get('m.room.avatar')
      ?.get('')?.event?.content?.url,
  );

  useEffect(() => {
    updateData(route.params.roomId);
  }, [route.params.roomId, avatarUrl]);

  const updateData = (roomId: string) => {
    const room = matrixContext.instance?.getRoom(roomId);

    setRoomData({
      topic: room?.currentState.events?.get('m.room.topic')?.get('')?.event
        ?.content?.topic,
      name: room?.currentState.events?.get('m.room.name')?.get('')?.event
        ?.content?.name,
      avatarUrl:
        matrixContext.instance?.mxcUrlToHttp(
          room?.currentState.events?.get('m.room.avatar')?.get('')?.event
            ?.content?.url || '',
        ) || '',
    });
  };

  const SaveButton = () => {
    return (
      <Button variant="ghost" onPress={save}>
        Save
      </Button>
    );
  };

  const openFullPhoto = () => {
    Linking.openURL(roomData.avatarUrl);
  };

  const onChange = (name: string) => (value: string) => {
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const onChangePhoto = () => {
    dispatch(
      setActionsDrawerContent({
        title: 'Change group photo',
        text: 'Choose image source',
        actions: [
          {
            title: 'Take photo',
            onPress: openCamera,
          },
          {
            title: 'Open gallery',
            onPress: openGallery,
          },
        ],
      }),
    );

    dispatch(setActionsDrawerVisible(true));
  };

  const openCamera = () => {
    launchCamera({
      mediaType: 'photo',
      includeExtra: true,
      saveToPhotos: true,
    })
      .then(res => {
        if (res.assets && res.assets.length > 0) {
          uploadPhoto(res.assets[0]);
          dispatch(setActionsDrawerVisible(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', includeExtra: true })
      .then(res => {
        if (res.assets && res.assets.length > 0) {
          uploadPhoto(res.assets[0]);
          dispatch(setActionsDrawerVisible(false));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const saveData = (type: string, opt: Object) => {
    return matrixContext.instance
      ?.sendStateEvent(route.params.roomId, type, opt)
      .then(() => {
        dispatch(setNeedUpdateCurrentRoom(true));
        return true;
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

        return false;
      });
  };

  const uploadPhoto = (asset: Asset) => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.uploadContent(asset, { onlyContentUri: false })
      .then(async res => {
        if (res) {
          await saveData('m.room.avatar', {
            url: res.content_uri,
          });

          setRoomData({
            ...roomData,
            avatarUrl:
              matrixContext.instance?.mxcUrlToHttp(res.content_uri) || '',
          });

          updateData(route.params.roomId);
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

  const save = async () => {
    dispatch(setLoader(true));

    await saveData('m.room.name', {
      name: roomData.name,
    });

    await saveData('m.room.topic', {
      topic: roomData.topic,
    });

    dispatch(setLoader(false));
  };

  return (
    <>
      <BaseHeader title="Chat profile settings" action={<SaveButton />} />
      <ScrollView
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Center mt={8}>
          {roomData.avatarUrl ? (
            <Pressable onPress={openFullPhoto}>
              <Image
                src={roomData.avatarUrl}
                alt="User avatar"
                borderRadius="full"
                width={40}
                height={40}
              />
            </Pressable>
          ) : (
            <DefaultAvatar
              name={roomData.name && roomData.name[0]}
              width={40}
              fontSize={60}
            />
          )}
          <Button
            mt={4}
            variant="chip"
            colorScheme="primary"
            onPress={onChangePhoto}>
            Change group photo
          </Button>
        </Center>

        <Box>
          <FormControl>
            <Stack mt={12} mb={2}>
              <Input
                type={'text'}
                fontSize="md"
                w="100%"
                variant="unstyled"
                placeholder="Group name"
                value={roomData.name}
                onChangeText={onChange('name')}
              />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack mb={2}>
              <TextArea
                style={{ backgroundColor: theme.white }}
                autoCompleteType="false"
                placeholder="Group description"
                w="100%"
                value={roomData.topic}
                onChangeText={onChange('topic')}
              />
            </Stack>
          </FormControl>
        </Box>
      </ScrollView>
    </>
  );
};

export default RoomProfileSettings;
