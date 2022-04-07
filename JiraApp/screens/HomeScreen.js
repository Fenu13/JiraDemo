import React, {useState, useEffect} from 'react';
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
  Modal,
} from 'react-native';

import {getTask} from '../store/Task/taskAction';
import {useSelector, useDispatch} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {jira} from '../axios/axios';
import WorkIcon from 'react-native-vector-icons/Foundation';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({navigation, data}) => {
  const [openPopUP, setOpenPopUp] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [selectedValue, setSelectedValue] = useState(0);
  const [taskLane, setTaskLane] = useState(0);
  const [token, setToken] = useState(null);

  // state.rootreducer.reducer
  const tasks = useSelector(state => state.tasks.tasks);
  const click = item => {
    console.log(item);
    setActiveItem(item);
  };
  useEffect(() => {
    // await AsyncStorage.setItem('userToken', userToken);
    AsyncStorage.getItem('userToken').then(res => {
      if (res) {
        setToken(res);
      }
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      console.log('token=', token);
      dispatch(getTask(taskLane, token));
    }
  }, [taskLane, token]);

  const updateTask = async id => {
    console.log('Id=', id);
    console.log('Selected VA=', selectedValue);

    console.log(token);
    jira
      .patch(
        `/updateTask/${id}`,
        {
          status: selectedValue,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log('DATA====', response.data);
        dispatch(getTask(taskLane, token));
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 40}}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 50,
              paddingTop: 5,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 360,
                borderWidth: 1,
                height: 30,
                width: 30,
                justifyContent: 'center',
              }}
              onPress={() => {}}>
              <Text style={{alignSelf: 'center'}}>FC</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={{height: 40, marginBottom: 10}}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTaskLane(0);
              }}>
              <Text style={styles.text}>To Do</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTaskLane(1);
              }}>
              <Text style={styles.text}>Processing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTaskLane(2);
              }}>
              <Text style={styles.text}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        contentContainerStyle={{paddingVertical: 10}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: '#fff',
                marginHorizontal: 30,
                borderWidth: 1,
                padding: 20,
                borderRadius: 10,
                marginVertical: 5,
              }}
              onPress={() => {
                click(item);
                setOpenPopUp(true);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Title : {item.title}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <WorkIcon name="checkbox" size={20} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        animationType="slide"
        visible={openPopUP}
        style={{flex: 1}}
        transparent={true}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(70,142,13,0.2)',
            flex: 1,
            borderRadius: 10,
          }}>
          <View
            style={{
              borderRadius: 10,
              padding: 20,
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                backgroundColor: 'rgba(70,142,13,0.2)',
                borderRadius: 10,
                padding: 5,
              }}
              onPress={() => {
                setOpenPopUp(false);
              }}>
              <Text style={{fontWeight: 'bold'}}>Close</Text>
            </TouchableOpacity>
            <Text style={{paddingTop: 5}}>Title : {activeItem?.title}</Text>
            <Text style={{paddingTop: 5, paddingBottom: 10}}>
              Desciption : {activeItem?.description}
            </Text>
            <View style={{paddingBottom: 5, justifyContent: 'center'}}>
              <Text>Select Task :</Text>
              <RNPickerSelect
                onValueChange={value => setSelectedValue(value)}
                items={[
                  {label: 'ToDo', value: 0},
                  {label: 'Processing', value: 1},
                  {label: 'Done', value: 2},
                ]}
              />
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: 'rgba(70,142,13,0.2)',
                borderRadius: 10,
                padding: 5,
              }}
              onPress={() => {
                updateTask(activeItem?._id);
                setOpenPopUp(false);
              }}>
              <Text style={{fontWeight: 'bold'}}> SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e0ffff',
    height: 30,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'cyan',
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 1},
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
