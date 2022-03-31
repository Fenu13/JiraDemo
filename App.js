import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

 import { DrawerContent } from './screens/DrawerContent';

 import MainTabScreen from './screens/MainTabScreen';


import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage'


const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  //  const [userToken, setUserToken] = React.useState(null); 

 const initalLoginState ={
    isLoading : true,
    userName:null,
    userToken:null,
  }

  const loginReducer = (prevState,action) =>{
    switch(action.type){
      case 'RETRIEVE_TOKEN':   //For First Time Login previously or not
        return {
          ...prevState,
          userToken:action.token, 
          isLoading:false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName:action.id,
          userToken :action.token,
          isLoading:false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName:null,
          userToken :null,
          isLoading:false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName:action.id,
          userToken :action.token,
          isLoading:false,
        };
      
    }
  }
  const[loginState,dispatch] = React.useReducer(loginReducer,initalLoginState)
  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      //  setUserToken('fenu');
      //  setIsLoading(false);
    
    const  userToken = foundUser[0].userToken;
    const  userName = foundUser[0].username;
  
        try{
    
          await AsyncStorage.setItem('userToken',userToken)
        }catch(e){
          console.log(e)
        }
      
  
   
      dispatch({type:'LOGIN',id:userName,token:userToken})
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try{
        await AsyncStorage.removeItem('userToken')
      }catch(e){
        console.log(e)
      }
      dispatch({type:'LOGOUT'})
    },
    signUp: () => {
      setUserToken('fenu');
      setIsLoading(false); 
    },
 
  }),[]);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken')
      }catch(e){
        console.log(e)
      }
      dispatch({type:'RETRIEVE_TOKEN',token:userToken})
    }, 1000);
  }, []);

  if(loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
  
    <AuthContext.Provider value={authContext}>
    <NavigationContainer >
      {loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Jira Software" component={MainTabScreen}/>
        </Drawer.Navigator>
      )
    : 
      <RootStackScreen/>
     } 
    </NavigationContainer>
    </AuthContext.Provider>
  
  );
}

export default App;