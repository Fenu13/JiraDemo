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

import * as taskAction from '../store/Task/taskAction';
import {useSelector, useDispatch} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {jira} from '../axios/axios';
import WorkIcon from 'react-native-vector-icons/Foundation';

const HomeScreen = ({navigation, data}) => {
  const [name, setName] = useState('Fenil');
  const [person, setPerson] = useState({name: 'deep', age: 40});
  const [openPopUP, setOpenPopUp] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [selectedValue, setSelectedValue] = useState(0);
  // state.rootreducer.reducer
  const tasks = useSelector(state => state.tasks.tasks);
  const click = item => {
    console.log(item);
    setActiveItem(item);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskAction.getTask(0));
  }, []);

  const clickHandler = () => {
    setName('ToDO');
    setPerson({name: 'dsdsdsa', age: 45});
  };

  const clickHandler1 = () => {};

  const clickHandler2 = () => {
    setName('Done');
    setPerson({name: 'Deep', age: 19});
  };

  const updateTask = id => {
    console.log('jhgj', id);
    jira
      .patch(
        `/updateTask/${id}`,
        {
          status: selectedValue,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
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
              onPress={clickHandler}>
              <Text style={{alignSelf: 'center'}}>FC</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={{flex: 0.1}}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.button} onPress={clickHandler}>
              <Text style={styles.text}>To Do</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={clickHandler1}>
              <Text style={styles.text}>Processing</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={clickHandler2}>
              <Text style={styles.text}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(index, item) => {
          index.key;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                marginHorizontal: 20,
                borderWidth: 1,
                padding: 20,
                borderRadius: 10,
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
