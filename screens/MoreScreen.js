import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';


const MoreScreen = ({navigation}) => {


  
    return (
      <View style={styles.container}> 
        <Text>More Screen</Text>
      </View>
    );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});