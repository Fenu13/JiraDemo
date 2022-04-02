import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';


const WorkspaceScreen = ({navigation}) => {


  
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
    justifyContent: 'center'
  },
});