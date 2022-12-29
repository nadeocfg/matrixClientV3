import { Visibility } from 'matrix-js-sdk';
import {
  Box,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Pressable,
  Radio,
  ScrollView,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { ArrowRightIcon } from '../../../components/icons';
import { MatrixContextModel } from '../../../context/matrixContext';
import { useAppDispatch } from '../../../hooks/useDispatch';
import {
  setActionsDrawerContent,
  setActionsDrawerVisible,
} from '../../../store/actions/mainActions';
import theme from '../../../themes/theme';
import { UserDirectoryItemModel } from '../../../types/userDirectoryItemModel';

interface Step2Props {
  selectedUsers: UserDirectoryItemModel[];
  roomName: string;
  roomTopic: string;
  visibility: Visibility;
  onChangeVisibility: (value: Visibility) => void;
  onChange: Function;
  matrixContext: MatrixContextModel;
}

const Step2 = ({
  selectedUsers,
  roomName,
  roomTopic,
  matrixContext,
  visibility,
  onChangeVisibility,
  onChange,
}: Step2Props) => {
  const visibilityOptions = [
    {
      name: 'Private',
      desc: 'Only people invited can find and join',
      value: 'private',
    },
    {
      name: 'Public',
      desc: 'Anyone can find the room and join',
      value: 'public',
    },
  ];
  const dispatch = useAppDispatch();

  const showVisibilitySwitcher = () => {
    dispatch(
      setActionsDrawerContent({
        title: 'Who can access?',
        text: '',
        actions: [
          {
            title: 'Private',
            desc: 'Only people invited can find and join',
            onPress: () => onSelect(Visibility.Private),
          },
          {
            title: 'Public',
            desc: 'Anyone can find the room and join',
            onPress: () => onSelect(Visibility.Public),
          },
        ],
      }),
    );

    dispatch(setActionsDrawerVisible(true));
  };

  const onSelect = (value: Visibility) => {
    onChangeVisibility(value);

    dispatch(setActionsDrawerVisible(false));
  };

  return (
    <Box m={4}>
      <FormControl>
        <Stack mb={4}>
          <Input
            fontSize="md"
            w="100%"
            variant="unstyled"
            placeholder="Group name"
            value={roomName}
            onChangeText={onChange('name')}
          />
        </Stack>
      </FormControl>
      <FormControl>
        <Stack>
          <TextArea
            autoCompleteType="false"
            placeholder="Group description"
            w="100%"
            value={roomTopic}
            onChangeText={onChange('topic')}
          />
        </Stack>
      </FormControl>

      <Pressable onPress={showVisibilitySwitcher}>
        <Flex
          direction="row"
          align="center"
          py={4}
          px={4}
          my={4}
          bg="#fff"
          borderRadius={8}>
          <Text fontSize="md" flexGrow={1}>
            {visibilityOptions.find(item => item.value === visibility)?.name}
          </Text>

          <ArrowRightIcon />
        </Flex>
      </Pressable>

      <ScrollView>
        <Heading size="md" color={theme.light.text} fontWeight={600} mt={4}>
          Members
        </Heading>
        <Box style={{ flex: 1 }}>
          <Box style={listStyles.list}>
            {selectedUsers.map(item => (
              <Box style={listStyles.listItem} key={item.user_id}>
                <Box>
                  {item.avatar_url ? (
                    <Image
                      src={
                        matrixContext.instance?.mxcUrlToHttp(item.avatar_url) ||
                        ''
                      }
                      alt="User avatar"
                      borderRadius="full"
                      width={12}
                      height={12}
                    />
                  ) : (
                    <DefaultAvatar
                      name={item.display_name ? item.display_name[0] : ''}
                      width={12}
                    />
                  )}
                </Box>
                <Text style={listStyles.listText}>{item.display_name}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

const listStyles = StyleSheet.create({
  list: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: theme.defaultGrey,
  },
  listText: {
    flexGrow: 1,
    marginHorizontal: 12,
    fontSize: 16,
  },
  listCheckbox: {},
  selected: {
    backgroundColor: theme.light.input.outline.bgColor,
  },
});

export default Step2;
