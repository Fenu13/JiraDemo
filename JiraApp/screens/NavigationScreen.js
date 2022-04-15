import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {DrawerContent} from './DrawerContent';
import MainTabScreen from './MainTabScreen';
import RootStackScreen from './RootStackScreen';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {setUserData} from '../store/User/userAction';
import {color} from 'react-native-reanimated';
const Drawer = createDrawerNavigator();

const NavigationScreen = () => {
  const users = useSelector(state => state.userData.users);
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem('userData').then(res => {
      if (res) {
        dispatch(setUserData(JSON.parse(res)));
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {users !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Jira Software" component={MainTabScreen} />
        </Drawer.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

export default NavigationScreen;
