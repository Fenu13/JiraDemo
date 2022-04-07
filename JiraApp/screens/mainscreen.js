import MainTabScreen from './MainTabScreen';
import React from 'react';
import {DrawerContent} from './DrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const MainScreen = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Jira Software" component={MainTabScreen} />
    </Drawer.Navigator>
  );
};
export default MainScreen;
