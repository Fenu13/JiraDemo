import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as workspaceAction from '../store/workspace/workspaceAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {process_params} from 'express/lib/router';
const WorkspaceScreen = (props, {navigation}) => {
  const workspaces = useSelector(state => state.workspace.workspace);
  const user = useSelector(state => state.workspace.workspaceUsers);
  // console.log('USERS==', user);
  // console.log('WORKSPACE==', workspaces);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      // console.log('HE');
      dispatch(workspaceAction.getWorkspace());
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" />

      <View style={styles.header}>
        <Text style={styles.text_header}>Workspace Details</Text>
        <View style={{margin: 18}}></View>
        <View>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
            Company Name:{' '}
            <Text style={{color: 'black', fontWeight: '300'}}>
              {workspaces?.name}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
            Description:{' '}
            <Text style={{color: 'black', fontWeight: '300'}}>
              {workspaces?.description}
            </Text>
          </Text>
        </View>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>User Details</Text>

        <View style={styles.action}>
          <FlatList
            data={user}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            contentContainerStyle={{}}
            renderItem={({item, index}) => {
              return (
                <View style={{justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    key={item}
                    style={{
                      backgroundColor: '#fff',
                      marginHorizontal: 30,
                      borderWidth: 1,
                      padding: 20,
                      borderRadius: 10,
                      marginVertical: 5,
                    }}
                    onPress={() => {}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>
                        <View style={{flexDirection: 'row'}}></View>
                        <FontAwesome
                          name="user"
                          color="#009387"
                          size={20}
                        />: {item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>
                        <MaterialCommunityIcons
                          name="email"
                          color="#009387"
                          size={20}
                        />{' '}
                        : {item.email}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}></FlatList>
        </View>
      </Animatable.View>
    </View>
  );
};

export default WorkspaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    paddingBottom: 5,
  },
});
