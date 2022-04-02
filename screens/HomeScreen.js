import React,{useState,Component} from 'react';
import { 
  View, 
  Text, 

  TouchableOpacity, 
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Button,
  ScrollView,
  ToastAndroid,
  FlatList,

} from 'react-native';

import { jira } from '../axios/axios';
import WorkIcon from 'react-native-vector-icons/Foundation'

const data = [{

  name:'Todo',
  age:4,
  key:210
},
{
  name:'Todo1',
  age:45,
  key:220
}]
  


const HomeScreen = ({navigation,data}) => {



const [name,setName] = useState('Fenil')
const [person,setPerson] = useState({name:'deep' , age :40})

const clickHandler =() =>{
  setName('ToDO');
  setPerson({name:'dsdsdsa', age :45})
}


const clickHandler1 =() =>{
  setName('Remaining');
  setPerson({name:'dsdsdfgfgdfgsa', age :20})
}

const clickHandler2 =() =>{
  setName('Done');
  setPerson({name:'Deep', age :19})
}
    // const ListEmptyComponent = ()=>{
    //   return <View>
    //     <Text>No Data Found</Text>

    //   </View>
    // }

    const renderItem =({item}) =>{
      console.log('item' ,item);

      return(
          <TouchableOpacity>
            <Text>Task-1 </Text>
          </TouchableOpacity>

      )
    } 
    return (
     
      <View style={{flex:1}}> 
          <View style={{flex:0.1}}>
            <ScrollView horizontal={true} contentContainerStyle={{width:'100%', alignItems:'center'}}>
      
              <View style={{flexDirection:'row',alignItems:'center',paddingLeft:50,paddingTop:5}}>
                <TouchableOpacity 
                    style={{borderRadius:360,borderWidth:1,height:30,width:30,justifyContent:'center'}}
                    onPress={clickHandler}>
                    <Text style={{alignSelf:'center',}}>FC</Text>
                </TouchableOpacity>  
             </View>
            </ScrollView>
          </View>
      
          <View style={{flex:0.1}}>
            <ScrollView horizontal={true} contentContainerStyle={{width:'100%', alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>     
                 <TouchableOpacity 
                    style={styles.button}
                    onPress={clickHandler}>
                        <Text style={styles.text}>To Do</Text>
                   </TouchableOpacity>       

                  <TouchableOpacity 
                  style={styles.button}
                onPress={clickHandler1}>
                    <Text style={styles.text}>Processing</Text>
                </TouchableOpacity> 

                  <TouchableOpacity 
                  style={styles.button}
                onPress={clickHandler2}>
                    <Text  style={styles.text}>Done</Text>
                </TouchableOpacity>    
                </View>
                </ScrollView>
                </View>


                <ScrollView contentContainerStyle={{width:'100%'}}  > 
                    <View style={{backgroundColor:'#fff',marginHorizontal:20,borderWidth:1,borderColor:'grey'}}>
                       <Text style={{fontSize:20}}>To Do Issues</Text>
                     <View style={{marginHorizontal:20,marginVertical:20}}>
                        <Text>Create Issue</Text>
                        <Text style={{paddingTop:10}}><WorkIcon name="checkbox" size={20}/>Fenil</Text>
                     </View>
                
                     {/* <FlatList 
                        renderItem={renderItem}  
                        data={data} 
                        keyExtractor={(item) => String(item._id)}
                        ListEmptyComponent={ListEmptyComponent}

                      
                     /> */}
                    </View>
            
                 </ScrollView>
              
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
  },

});