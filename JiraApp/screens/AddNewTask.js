import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {jira} from '../axios/axios';
import RNPickerSelect from 'react-native-picker-select';
import {useSelector} from 'react-redux';

const AddNewTask = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const user = useSelector(state => state.workspace.workspaceUsers);
  const [value1, setValue1] = useState(null);
  const [value, setValue] = useState(null);

  const [data, setData] = React.useState({
    title: '',
    description: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        title: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        title: val,
        check_textInputChange: false,
      });
    }
  };
  const textInputChanged = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        description: val,
        check_textInputChanged: true,
      });
    } else {
      setData({
        ...data,
        description: val,
        check_textInputChanged: false,
      });
    }
  };
  const token = useSelector(state => state.userData.users.token);

  const addData = () => {
    jira
      .post(
        '/newtasks',
        {
          title: data.title,
          description: data.description,
          reporter: value,
          assign_to: value1,
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
        navigation.navigate('tabScreen');
      })
      .catch(error => console.log(error));
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };

  // console.log('Reporter==', token);
  // console.log('Assigned==', value1);
  // console.log('Title==', data.title);
  // console.log('Description==', data.description);
  // console.log('Status==', selectedValue);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Add Task</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Title</Text>
          <View style={styles.action}>
            <FontAwesome name="tasks" color="#05375a" size={20} />
            <TextInput
              placeholder="Add Title"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
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
            Description
          </Text>
          <View style={styles.action}>
            <MaterialIcons name="description" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Description"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChanged(val)}
            />
            {data.check_textInputChanged ? (
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
            Reported By
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user" color="#05375a" size={20} />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={user}
              search
              maxHeight={300}
              labelField="name"
              valueField="_id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item._id);
              }}
              renderItem={renderItem}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Assign To
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user" color="#05375a" size={20} />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={user}
              search
              maxHeight={300}
              labelField="name"
              valueField="_id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value1}
              onChange={item => {
                setValue1(item._id);
              }}
              renderItem={renderItem}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Status
          </Text>

          <View style={styles.action}>
            <MaterialIcons name="work" color="#05375a" size={20} />

            <View>
              <RNPickerSelect
                onValueChange={selectedValue => setSelectedValue(selectedValue)}
                items={[
                  {label: 'Todo', value: '0'},
                  {label: 'Processing', value: '1'},
                  {label: 'Done', value: '2'},
                ]}
              />
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                addData();
              }}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Submit Task</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#009387',
                  },
                ]}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
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
    fontSize: 30,
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
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  dropdown: {
    margin: 16,
    height: 50,
    width: 250,

    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
