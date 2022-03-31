import React from 'react';
import { 
  View, 
  Text, 

  TouchableOpacity, 
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Button,
  ScrollView
} from 'react-native';

import {red} from '../asserts/themes'


const HomeScreen = ({navigation}) => {

    return (
     
      <View style={{flex:1}}>
      
      <View style={{flex:0.1}}>
        <ScrollView style={{}}
        horizontal={true}
       contentContainerStyle={{width:'100%', alignItems:'center'}}
        >
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity 
                  style={styles.button}
                onPress={()=>navigation.navigate('SignInScreen')}>
                    <Text style={styles.text}>To Do</Text>
                </TouchableOpacity>       

                  <TouchableOpacity 
                  style={styles.button}
                onPress={()=>navigation.navigate('SignInScreen')}>
                    <Text style={styles.text}>Remaining</Text>
                </TouchableOpacity> 

                  <TouchableOpacity 
                  style={styles.button}
                onPress={()=>navigation.navigate('SignInScreen')}>
                    <Text  style={styles.text}>Done</Text>
                </TouchableOpacity>    
                </View>
                </ScrollView>

                </View>
                <View>

                </View>
                </View>

   
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  
  button:{
    backgroundColor:'#e0ffff',
    height:30,
   paddingHorizontal:20,
    marginHorizontal:20,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: 'cyan',
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 5 ,
    shadowOffset : { width: 0, height: 1},
  
    
  },

  text:{
    fontSize:15,
    fontWeight:'bold'
  }
});