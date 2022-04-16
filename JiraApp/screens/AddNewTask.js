import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';

const AddNewTask = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>ADD NEW TASK</Text>
    </View>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
