import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import WorkIcon from 'react-native-vector-icons/Foundation';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import WorkspaceScreen from './WorkspaceScreen';
import MoreScreen from './MoreScreen';


const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



const MainTabScreen = ({navigation}) => (
  
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
        
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
    
          <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Workspace"
        component={WorkSpaceStackScreen}
        options={{
          tabBarLabel: 'WorkSpace',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <WorkIcon name="social-myspace" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackScreen}
        options={{
          tabBarLabel: 'More',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="more-horizontal" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerShown:false,
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home123" component={HomeScreen}  />
</HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerStyle:false,
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="Profile" component={ProfileScreen}  />
  </HomeStack.Navigator>
  );


const WorkSpaceStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerStyle:false,
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="WorkSpacew" component={WorkspaceScreen}  />
  </HomeStack.Navigator>
  );



const MoreStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerStyle:false,
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="More" component={MoreScreen}  />
  </HomeStack.Navigator>
  );