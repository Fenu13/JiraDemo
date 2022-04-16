import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {createStore, applyMiddleware} from 'redux';
import {Provider, useSelector} from 'react-redux';
import {rootReducer} from './store/rootReducer';
import thunk from 'redux-thunk';
import NavigationScreen from './screens/NavigationScreen';
const store = createStore(rootReducer, applyMiddleware(thunk));

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationScreen />
    </Provider>
  );
};

export default App;
