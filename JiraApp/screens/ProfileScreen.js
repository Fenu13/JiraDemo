import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {jira} from '../axios/axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.userData.users);
  const user = userData.user;

  const [data, setData] = React.useState({
    name: userData?.user?.name ?? '', // userData.user.name?userData.user.name:''
    email: userData?.user?.email ?? '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const [fName, setfName] = useState(userData?.user?.name ?? '');
  const [email, setEmail] = useState(userData?.user?.email ?? '');

  // const submitValue = () => {
  //   const frmdetails = data;
  //   console.log(frmdetails);
  // };
  const updateProfile = async () => {
    const jsonValue = await AsyncStorage.getItem('userData');
    const userObj = JSON.parse(jsonValue);
    const user_id = userObj.user._id;
    const token = userObj.token;
    console.log('Jdhfgdsf', data);
    try {
      await jira
        .patch(`/user/me/${user_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log('RESSS', res);
        });
      alert('Your Data Has Updated !');
      // const resData = response.data;
    } catch (err) {
      console.log('ERROR', err);
      throw err;
    }
  };
  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        name: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textInputChange: false,
      });
    }
  };
  const textInputChanged = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val.users.email,
        check_textInputChanged: true,
      });
    } else {
      setData({
        ...data,
        email: val.users.email,
        check_textInputChanged: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Update Profile!</Text>

        <View>
          <Animatable.Image
            animation="bounceIn"
            source={require('../asserts/user.png')}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 95,
            right: 150,
            zIndex: 999,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome name="pencil" size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your name"
              style={styles.textInput}
              value={data?.name ?? ''}
              autoCapitalize="none"
              onChangeText={e => setData({...data, name: e})}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              value={data?.email ?? ''}
              autoCapitalize="none"
              onChangeText={e => setData({...data, email: e})}
            />
            {data.check_textInputChanged ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <View style={styles.button}>
              <TouchableOpacity onPress={() => updateProfile()}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text style={styles.textSign}>Update</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default ProfileScreen;

// const {height} = Dimensions.get('screen');
// const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,

    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 4 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 360,

    alignSelf: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
