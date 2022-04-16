import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import WorkIcon from 'react-native-vector-icons/Foundation';

import {setUserData} from '../store/User/userAction';
import AsyncStorage from '@react-native-community/async-storage';

import UserAvatar from 'react-native-user-avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const dispatch = useDispatch();

  const user_name = useSelector(state => state.userData.users.user.name);
  const user_email = useSelector(state => state.userData.users.user.email);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}>
                <UserAvatar size={50} name={user_name} />
              </TouchableOpacity>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{user_name}</Title>
                <Caption style={styles.caption}>{user_email}</Caption>
              </View>
            </View>
          </View>

          {/* <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <PersonIcon name="person-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <WorkIcon name="social-myspace" color={color} size={size} />
              )}
              label="WorkSpace"
              onPress={() => {
                props.navigation.navigate('Workspace');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FeatherIcon name="more-horizontal" color={color} size={size} />
              )}
              label="More"
              onPress={() => {
                props.navigation.navigate('More');
              }}
            />
          </Drawer.Section> */}
          {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={async () => {
            dispatch(setUserData(null));
            await AsyncStorage.removeItem('userData');
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
