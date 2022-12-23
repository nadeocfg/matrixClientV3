import { Box, Button, Input, ScrollView } from 'native-base';
import React, { useState, useContext, useEffect } from 'react';
import theme from '../../themes/theme';
import { StyleSheet } from 'react-native';
import BaseHeader from '../../components/BaseHeader';
import { MagnifierIcon } from '../../components/icons';
import { MatrixContext } from '../../context/matrixContext';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../store/actions/mainActions';
import { useAppDispatch } from '../../hooks/useDispatch';

const CreateRoom = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const matrixContext = useContext(MatrixContext);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (searchValue.trim().length > 3) {
      timer = setTimeout(() => {
        search(searchValue);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  const NextButton = () => {
    return <Button variant="ghost">Next</Button>;
  };

  const onChange = (value: string) => {
    setSearchValue(value);
  };

  const search = (value: string) => {
    console.log('init search');
    matrixContext.instance
      ?.searchUserDirectory({
        term: value.trim(),
        limit: 10,
      })
      .then(res => {
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
      });
  };

  return (
    <>
      <BaseHeader title="Select Members" action={<NextButton />} />
      <ScrollView
        contentContainerStyle={styles.container}
        p={4}
        _light={{
          bg: theme.light.bgColor,
        }}
        _dark={{
          bg: theme.dark.bgColor,
        }}>
        <Box style={styles.inner}>
          <Input
            variant="outline"
            InputLeftElement={<MagnifierIcon style={{ marginLeft: 4 }} />}
            placeholder="Search by username"
            value={searchValue}
            onChangeText={onChange}
          />
        </Box>
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

export default CreateRoom;
