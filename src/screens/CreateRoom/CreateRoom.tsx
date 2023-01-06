import { Box, Button, PresenceTransition } from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import theme from '../../themes/theme';
import { StyleSheet } from 'react-native';
import BaseHeader from '../../components/BaseHeader';
import { MatrixContext } from '../../context/matrixContext';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
  setLoader,
} from '../../store/actions/mainActions';
import { useAppDispatch } from '../../hooks/useDispatch';
import { UserDirectoryItemModel } from '../../types/userDirectoryItemModel';
import Step2 from './components/Step2';
import { navigationRef } from '../../utils/navigation';
import { Visibility } from 'matrix-js-sdk';
import SearchUsers from '../../components/SearchUsers';
import { SearchDataModel } from '../../types/searchDataModel';

interface RoomDataModel {
  visibility: Visibility;
  name: string;
  topic: string;
}

const CreateRoom = () => {
  const dispatch = useAppDispatch();
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
  const matrixContext = useContext(MatrixContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [roomData, setRoomData] = useState<RoomDataModel>({
    name: '',
    topic: '',
    visibility: Visibility.Private,
  });

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

  const NextButton = () => {
    return (
      <Button variant="ghost" onPress={onNext}>
        Next
      </Button>
    );
  };

  const onSearchValueChange = (value: string) => {
    setSearchData({
      ...searchData,
      searchValue: value,
    });
  };

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

  const isUserInclude = (userId: string) => {
    return selectedUsers.filter(item => item.user_id === userId).length > 0;
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

  const onNext = () => {
    if (currentStep === 1) {
      if (!roomData.name) {
        dispatch(
          setActionsDrawerContent({
            title: 'Missing group name',
            text: 'A group name is required',
          }),
        );

        dispatch(setActionsDrawerVisible(true));
        return;
      }

      createRoom();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const onPrev = () => {
    if (currentStep === 0) {
      return navigationRef.goBack();
    }

    setCurrentStep(currentStep - 1);
  };

  const onChangeRoomData = (name: keyof RoomDataModel) => (value: string) => {
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const onChangeVisibility = (value: Visibility) => {
    setRoomData({
      ...roomData,
      visibility: value,
    });
  };

  const createRoom = () => {
    const userIds = selectedUsers.reduce<string[]>((acc, item) => {
      acc.push(item.user_id);
      return acc;
    }, []);

    dispatch(setLoader(true));

    matrixContext.instance
      ?.createRoom({
        invite: userIds,
        name: roomData.name,
        topic: roomData.topic,
        visibility: roomData.visibility,
        power_level_content_override: {
          users: { [matrixContext.instance?.getUserId() || '']: 101 },
        },
      })
      .then(res => {
        navigationRef.reset({
          index: 0,
          routes: [{ name: 'RoomList' }],
        });
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

  return (
    <Box
      style={styles.container}
      _light={{
        bg: theme.light.bgColor,
      }}
      _dark={{
        bg: theme.dark.bgColor,
      }}>
      <BaseHeader
        title="Select Members"
        backAction={onPrev}
        action={<NextButton />}
      />

      {currentStep === 0 && (
        <PresenceTransition
          visible={currentStep === 0}
          initial={{
            translateX: 500,
          }}
          animate={{
            translateX: 0,
            transition: {
              duration: 300,
            },
          }}
          style={styles.inner}>
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
      )}

      {currentStep === 1 && (
        <PresenceTransition
          visible={currentStep === 1}
          initial={{
            translateX: 500,
          }}
          animate={{
            translateX: 0,
            transition: {
              duration: 300,
            },
          }}
          style={styles.inner}>
          <Step2
            matrixContext={matrixContext}
            onChange={onChangeRoomData}
            onChangeVisibility={onChangeVisibility}
            selectedUsers={selectedUsers}
            roomName={roomData.name}
            roomTopic={roomData.topic}
            visibility={roomData.visibility}
          />
        </PresenceTransition>
      )}
    </Box>
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
