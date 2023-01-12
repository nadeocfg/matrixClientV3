import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Pressable,
  ScrollView,
} from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import BaseHeader from '../../../components/BaseHeader';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { MatrixContext } from '../../../context/matrixContext';
import { useAppSelector } from '../../../hooks/useSelector';
import theme from '../../../themes/theme';
import { StoreModel } from '../../../types/storeTypes';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useAppDispatch } from '../../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../../store/actions/mainActions';
import { setUserAvatarAndName } from '../../../store/actions/userActions';
import { Linking } from 'react-native';
import { navigationRef } from '../../../utils/navigation';

const PersonalInformationSettings = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [mxcAvatarUrl, setMxcAvatarUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const user = useAppSelector((state: StoreModel) => state.userStore.user);
  const matrixContext = useContext(MatrixContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateAccountInfo();

    if (user.avatarUrl) {
      setAvatarUrl(matrixContext.instance?.mxcUrlToHttp(user.avatarUrl) || '');
    }

    if (user.displayName) {
      setDisplayName(user.displayName);
    }

    matrixContext.instance?.getThreePids().then(res => {
      for (let i = 0; i < res.threepids.length; i += 1) {
        const el = res.threepids[i];
        if (el.medium === 'email') {
          setEmail(el.address);
        }
      }
    });
  }, [user.avatarUrl, matrixContext.instance, user.displayName]);

  const onChangePhoto = () => {
    dispatch(
      setActionsDrawerContent({
        title: 'Change profile photo',
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

  const uploadPhoto = (asset: Asset) => {
    dispatch(setLoader(true));

    matrixContext.instance
      ?.uploadContent(asset, { onlyContentUri: false })
      .then(async res => {
        if (res) {
          setAvatarUrl(
            matrixContext.instance?.mxcUrlToHttp(res.content_uri) || '',
          );

          setMxcAvatarUrl(res.content_uri);
        }
      })
      .catch(err => {
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

  const openFullPhoto = () => {
    Linking.openURL(avatarUrl);
  };

  const onChange = (name: string) => {
    setDisplayName(name);
  };

  const onDone = async () => {
    if (matrixContext.instance) {
      dispatch(setLoader(true));

      if (mxcAvatarUrl) {
        await matrixContext.instance?.setAvatarUrl(mxcAvatarUrl);
      }

      matrixContext.instance
        ?.setDisplayName(displayName)
        .then(async () => {
          updateAccountInfo();

          navigationRef.goBack();
        })
        .catch(err => {
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
    }
  };

  const updateAccountInfo = () => {
    matrixContext.instance?.getProfileInfo(user.userId).then(profile => {
      dispatch(
        setUserAvatarAndName({
          displayname: profile.displayname || '',
          avatar_url: profile.avatar_url || '',
        }),
      );
    });
  };

  return (
    <>
      <BaseHeader
        title="Personal information"
        action={
          <Button variant="ghost" onPress={onDone}>
            Done
          </Button>
        }
      />
      <ScrollView
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}
        p={4}>
        <Center mt={8}>
          {user.avatarUrl ? (
            <Pressable onPress={openFullPhoto}>
              <Image
                src={avatarUrl}
                alt="User avatar"
                borderRadius="full"
                width={40}
                height={40}
              />
            </Pressable>
          ) : (
            <DefaultAvatar
              name={user.displayName && user.displayName[0]}
              width={40}
              fontSize={60}
            />
          )}
          <Button
            mt={4}
            variant="chip"
            colorScheme="primary"
            onPress={onChangePhoto}>
            Change profile photo
          </Button>
        </Center>

        <Box>
          <FormControl mt={12} mb={4}>
            <FormControl.Label>Display name</FormControl.Label>
            <Input
              type={'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              value={displayName}
              onChangeText={onChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              isDisabled
              type={'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              value={user.userId}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>E-mail</FormControl.Label>
            <Input
              isDisabled
              type={'text'}
              fontSize="md"
              w="100%"
              variant="unstyled"
              value={email}
            />
          </FormControl>
        </Box>
      </ScrollView>
    </>
  );
};

export default PersonalInformationSettings;
