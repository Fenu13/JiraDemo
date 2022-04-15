import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';


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
      
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
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
        <HomeStack.Screen name="Home123" component={HomeScreen}  />
</HomeStack.Navigator>
);



import React, { useEffect, usetst } from "react";
import { Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RefreshSpinner() {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    spin();

    return spinValue.stopAnimation();
  }, [spin]);

  function spin() {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => spin());
  }

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Ionicons color="red" name="md-refresh-circle" size={30}></Ionicons>
    </Animated.View>
    //<Ionicons color="red" name="md-refresh-circle" size={30}></Ionicons>
  );`enter code here`
}

export default RefreshSpinner;






<FlatList
data={data}
keyExtractor={(index,item) =>{index.key}}
renderItem={
  ({item})=>{
  return(
  <View style={{backgroundColor:'#fff',marginHorizontal:20,borderWidth:1}}>
  <Text >My Name is {item.name}</Text>
    <View style={{marginHorizontal:20,marginVertical:20}}>
    <Text >My Name is {item.name}</Text>
    <Text>My Name is {item.name} and age is {item.age}</Text>
 
    </View>
  </View>
  )
  }
}

/>
  


//HOMESCREEN.JS
 // const [name,setName] = useState('Fenil')
// const [person,setPerson] = useState({name:'deep' , age :40})

// const clickHandler =() =>{
//   setName('ToDO');
//   setPerson({name:'dsdsdsa', age :45})
// }


// const clickHandler1 =() =>{
//   setName('Remaining');
//   setPerson({name:'dsdsdfgfgdfgsa', age :20})
// }

// const clickHandler2 =() =>{
//   setName('Done');
//   setPerson({name:'Deep', age :19})
// }




//WORKSPACE SCREEN


const [token, setToken] = useState(null);
const [axiosData, setAxiosData] = useState(null);

useEffect(() => {
  // await AsyncStorage.setItem('userToken', userToken);

  AsyncStorage.getItem('userData').then(res => {
    if (res) {
      const userObj = JSON.parse(res);
      const token1 = userObj.token;
      console.log('TOKEN==', token1);
      setToken(token1);
    }
  });
}, []);

const getworkspaceData = async id => {
  this.setState({
    loading: true,
  });
  jira
    .get(`/getuserbyworkspace/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('getting data from axios', response.data);
      setTimeout(() => {
        this.setState({
          loading: false,
          axiosData: response.data,
        });
      }, 2000);
    })
    .catch(error => {
      console.log(error);
    });
};
