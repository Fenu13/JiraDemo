import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import MainTabScreen from './MainTabScreen';
import MainScreen from './MainScreen';
import AddNewTask from './AddNewTask';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="MainTabScreen" component={MainTabScreen} />
    <RootStack.Screen name="MainScreen" component={MainScreen} />
    <RootStack.Screen name="AddNewTask" component={AddNewTask} />
  </RootStack.Navigator>
);

export default RootStackScreen;
