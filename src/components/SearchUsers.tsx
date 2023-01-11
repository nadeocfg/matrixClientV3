import {
  Box,
  Checkbox,
  IconButton,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import React from 'react';
import { UserDirectoryItemModel } from '../types/userDirectoryItemModel';
import { CloseIcon, MagnifierIcon } from './icons';
import { StyleSheet } from 'react-native';
import DefaultAvatar from './DefaultAvatar';
import { MatrixContextModel } from '../context/matrixContext';
import theme from '../themes/theme';

interface SearchUsersProps {
  searchValue: string;
  isSearching: boolean;
  onSearchValueChange: (value: string) => void;
  selectedUsers: UserDirectoryItemModel[];
  onSelectUser: (user: UserDirectoryItemModel) => void;
  foundedUsers: UserDirectoryItemModel[];
  isUserInclude: (user: UserDirectoryItemModel) => boolean;
  matrixContext: MatrixContextModel;
}

const SearchUsers = ({
  searchValue,
  onSearchValueChange,
  isSearching,
  selectedUsers,
  matrixContext,
  onSelectUser,
  foundedUsers,
  isUserInclude,
}: SearchUsersProps) => {
  return (
    <>
      <Input
        m={4}
        variant="outline"
        InputLeftElement={
          <MagnifierIcon color={theme.defaultGrey} style={{ marginLeft: 4 }} />
        }
        placeholder="Search by username"
        value={searchValue}
        onChangeText={onSearchValueChange}
        InputRightElement={isSearching ? <Spinner mr={2} /> : <></>}
      />

      <Box mx={4} style={chipStyles.wrapper}>
        {selectedUsers.map(item => (
          <Box key={item.user_id} style={chipStyles.chip}>
            {item.avatar_url ? (
              <Image
                src={
                  matrixContext.instance?.mxcUrlToHttp(item.avatar_url) || ''
                }
                alt="User avatar"
                borderRadius="full"
                width={6}
                height={6}
              />
            ) : (
              <DefaultAvatar
                inversed={true}
                name={
                  item.display_name
                    ? `${item.display_name[0]}${item.display_name[1]}`
                    : ''
                }
                width={6}
                fontSize={12}
              />
            )}
            <Text ml={2} fontSize="sm">
              {item.display_name}
            </Text>
            <IconButton
              onPress={() => onSelectUser(item)}
              variant="ghost"
              size="sm"
              width={6}
              height={6}
              ml={1}
              icon={<CloseIcon color="#38383A" />}
            />
          </Box>
        ))}
      </Box>

      <ScrollView>
        <Box m={4} style={{ flex: 1 }}>
          <Box style={listStyles.list}>
            {foundedUsers.map(item => (
              <Pressable
                onPress={() => onSelectUser(item)}
                style={[
                  listStyles.listItem,
                  isUserInclude(item) && listStyles.selected,
                ]}
                key={item.user_id}>
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
                <Checkbox
                  onChange={() => onSelectUser(item)}
                  value={'selected'}
                  isChecked={isUserInclude(item)}
                  accessibilityLabel="Select user"
                />
              </Pressable>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

const chipStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
    marginRight: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: theme.chipBg,
    borderRadius: 16,
  },
});

const listStyles = StyleSheet.create({
  list: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: theme.border,
  },
  listText: {
    flexGrow: 1,
    marginHorizontal: 12,
    fontSize: 16,
  },
  listCheckbox: {},
  selected: {},
});

export default SearchUsers;
