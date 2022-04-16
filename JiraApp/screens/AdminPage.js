import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './MainTabScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import WorkspaceScreen from './WorkspaceScreen';
import MoreScreen from './MoreScreen';
import AddNewTask from './AddNewTask';

const Stack = createStackNavigator();
function AdminPage() {
  return (
    <Stack.Navigator initialRouteName="tabScreen" headerMode={false}>
      <Stack.Screen
        name="tabScreen"
        component={MainTabScreen}
        options={{headerShown: false}}
        headerMode={false}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkSpace"
        component={WorkspaceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewTask"
        component={AddNewTask}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AdminPage;
