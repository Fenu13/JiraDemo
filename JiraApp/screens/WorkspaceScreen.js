import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useState} from 'react';
import {jira} from '../axios/axios';

const WorkspaceScreen = ({navigation}) => {
  const [workname, setWorkname] = useState(null);

  return (
    <View style={styles.container}>
      <Text>WorkSpace Screen</Text>
    </View>
  );
};

export default WorkspaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
