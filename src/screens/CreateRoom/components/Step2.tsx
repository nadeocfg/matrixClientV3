import { Visibility } from 'matrix-js-sdk';
import {
  Box,
  FormControl,
  Heading,
  Image,
  Input,
  Radio,
  ScrollView,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultAvatar from '../../../components/DefaultAvatar';
import { MatrixContextModel } from '../../../context/matrixContext';
import theme from '../../../themes/theme';
import { UserDirectoryItemModel } from '../../../types/userDirectoryItemModel';

interface Step2Props {
  selectedUsers: UserDirectoryItemModel[];
  roomName: string;
  roomTopic: string;
  visibility: Visibility;
  onChange: Function;
  matrixContext: MatrixContextModel;
}

const Step2 = ({
  selectedUsers,
  roomName,
  roomTopic,
  matrixContext,
  visibility,
  onChange,
}: Step2Props) => {
  return (
    <Box m={4}>
      <FormControl mb={4}>
        <FormControl.Label>Visibility</FormControl.Label>
        <Radio.Group
          name="visibility"
          accessibilityLabel="Group visibility"
          value={visibility}
          onChange={onChange('visibility')}>
          <Radio value="public" my={2}>
            Public
          </Radio>
          <Radio value="private" my={2}>
            Private
          </Radio>
        </Radio.Group>
      </FormControl>
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
