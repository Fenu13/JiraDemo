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
  ImageBackground,
  ImagePickerIOS,
} from 'react-native';
import {jira} from '../axios/axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {setUserData} from '../store/User/userAction';
import storage from '@react-native-firebase/storage';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state?.userData?.users);

  //console.log('USERDATA==', userData);
  const user = userData?.user;
  // console.log('User==', user);
  const user_id = useSelector(state => state?.userData?.users?.user?._id);
  const token = useSelector(state => state?.userData?.users?.token);
  // console.log('ID&TOKEN==', user_id, token);
  const [data, setData] = useState({
    name: userData?.user?.name ?? '', // userData.user.name?userData.user.name:''
    email: userData?.user?.email ?? '',
    avatar: userData?.user?.url ?? '',
    // check_textInputChange: false,
    // secureTextEntry: true,
  });
  const [profile, setProfile] = useState('');

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [fName, setfName] = useState(userData?.user?.name ?? '');
  const [email, setEmail] = useState(userData?.user?.email ?? '');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const updateProfile = async () => {
    try {
      await jira
        .patch(`/user/me/${user_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          // console.log('RES==', res.data);
          const storageData = {
            token: token,
            user: {...res.data},
          };
          // console.log('Storage==', storageData);
          AsyncStorage.setItem('userData', JSON.stringify(storageData));
          dispatch(setUserData(storageData));
          console.warn('Your Data Has Updated !');
        });

      // const resData = response.data;
    } catch (err) {
      console.log('ERROR', err);
      throw err;
    }
  };

  useEffect(() => {
    getUpdatedData();
  }, []);

  const getUpdatedData = async () => {
    const jsonValue = await AsyncStorage.getItem('userData');
    const userObj = JSON.parse(jsonValue);
    const token = userObj.token;
    // console.log('TOKENN==', userObj);
    try {
      const res = await jira.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData({name: res.data.name, email: res.data.email});
      setImage(res.data.avatar);
      // console.log('RESPONES==', res.data.avatar);
    } catch (err) {
      console.log('ERROR', err);
      throw err;
    }
  };

  // Image Upload
  const imageUpload = async imagePath => {
    setProfile(imagePath);
    // set image name
    const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    const ext = imageName.split('.').pop();
    const name = imageName.split('.')[0];
    const newImageName = name + Date.now() + '.' + ext;
    const folderPath = `images/${newImageName}`;

    // console.log(folderPath);

    //FileName
    const uploadUri =
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;

    bs.current.snapTo(1);

    setUploading(true);
    setTransferred(0);

    try {
      const imageReference = storage().ref(folderPath);
      const task = imageReference.putFile(uploadUri);
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        );
      });

      task.then(async () => {
        const url = await storage().ref(folderPath).getDownloadURL();

        setData({...data, avatar: url});
        console.log('URL=', url);
      });
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      //console.log(image);
      setImage(image.path);

      imageUpload(image.path);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      //console.log(image);
      setImage(image.path);
      imageUpload(image.path);
      bs.current.snapTo(1);
    });
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  renderHeader = () => (
    <View style={styles.header1}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.useRef();

  fall = new Animated.Value(1);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" />
      <BottomSheet
        ref={bs}
        snapPoints={[500, 0]} //How much it will open from bottom {x=0,y=1}
        initialSnap={1} //
        renderContent={renderInner}
        renderHeader={renderHeader} //imp fun()
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <Text style={styles.text_header}>Update Profile!</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={image ? {uri: image} : require('../asserts/user.png')}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </ImageBackground>
            </View>
            <Icon
              name="camera"
              size={35}
              color="#fff"
              style={{
                opacity: 0.7,
                position: 'absolute',
                left: 90,
                top: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
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
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  header1: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
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
