import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {getTask} from '../store/Task/taskAction';
import {getTaskById} from '../store/Task/taskAction';
import {useSelector, useDispatch} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {jira} from '../axios/axios';
import WorkIcon from 'react-native-vector-icons/Foundation';
import AsyncStorage from '@react-native-community/async-storage';
import * as workspaceAction from '../store/workspace/workspaceAction';
import UserAvatar from 'react-native-user-avatar';
import * as taskAction from '../store/Task/taskAction';
import ActionButton from 'react-native-action-button';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const HomeScreen = props => {
  const [openPopUP, setOpenPopUp] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  // const [activeComment, setActiveComment] = useState(null);
  const [selectedValue, setSelectedValue] = useState(0);
  const [taskLane, setTaskLane] = useState(0);
  const [token, setToken] = useState(null);
  const [comments, setComments] = useState(false);
  const [data, setData] = React.useState({
    comment: '',

    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        comment: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        comment: val,
        check_textInputChange: false,
      });
    }
  };

  const user = useSelector(state => state.workspace.workspaceUsers);
  // console.log('USER=', user);
  const reporter_name = useSelector(state => state.tasks?.reporter);
  // const tasks_comment = useSelector(state => state.tasks?.task);

  // console.log('TASKS DETAIL==', tasks_comment);
  const assign_to = useSelector(state => state.tasks?.assigned);

  // console.log('report==', assign_to._id);
  useEffect(() => {
    dispatch(workspaceAction.getWorkspace());
  }, []);

  // state.rootreducer.reducer
  const tasks = useSelector(state => state.tasks.task);

  // console.log('TASKS==', tasks);
  let task;
  const click = item => {
    //  console.log('Item', item.comments);
    // setActiveComment(item);
    setActiveItem(item);
    dispatch(taskAction.getuserbyreport(item.reporter));
    dispatch(taskAction.getassigneduser(item.assign_to));
  };

  useEffect(() => {
    AsyncStorage.getItem('userData').then(res => {
      if (res) {
        const userObj = JSON.parse(res);
        const token1 = userObj.token;
        setToken(token1);
      }
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      //console.log('token=', token);
      dispatch(getTask(taskLane, token));
    }
  }, [taskLane, token]);

  const updateTask = async id => {
    // console.log('Id=', id);
    //console.log('Selected VA=', selectedValue);

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
        //console.log('DATA====', response.data);
        dispatch(getTask(taskLane, token));
      })
      .catch(error => console.log(error));
  };

  const focused = (name, _id) => {
    alert(name);
  };

  const comment_token = useSelector(state => state.userData.users.token);
  const id = activeItem?._id;
  const tasks_id = activeItem;
  // console.log('CID==', tasks_id);
  const user_name = useSelector(state => state?.userData?.users?.user?._id);

  // console.log('NAme==', name);
  const addComment = () => {
    jira
      .post(
        `/tasks/features/${id}`,
        {
          comments: data.comment,
          postedBy: user_name,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${comment_token}`,
          },
        },
      )
      .then(response => {
        if (!data.comment) {
          alert('Comment Cannot Be Blank');
        } else {
          alert('Comment Added Please Save Once Comment Is Added');
        }
      })
      .catch(error => console.log(error));
  };

  const deleteComment = commentId => {
    jira.delete(`/deletecomment/${id}/${commentId}`);
    const comment = tasks_id.comments.filter(function (el) {
      return el._id != commentId;
    });
    //  console.log('Comments=', comment);
    tasks_id.comments = comment;
    alert('Comment Deleted Successfully');
    // tasks_id.save();
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Add Comments</Text>
      </View>
      <FlatList
        data={activeItem?.comments}
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
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>
                  Comments : {item?.text}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Name : {item.postedBy}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <MaterialIcons
                  name="delete"
                  size={25}
                  color={'black'}
                  onPress={() => {
                    deleteComment(item._id);
                    updateTask(activeItem?._id);
                    setOpenModel(false);
                    setComments(false);
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          // click(item);
          setOpenModel(true);
        }}>
        <Entypo name="circle-with-plus" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
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

  bs = React.createRef();

  fall = new Animated.Value(1);

  return (
    <View style={{flex: 1}}>
      {comments && (
        <BottomSheet
          ref={this.bs}
          snapPoints={[500, 0]} //How much it will open from bottom {x=0,y=1}
          initialSnap={1} //
          renderContent={this.renderInner}
          renderHeader={this.renderHeader} //imp fun()
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
      )}
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{height: 40}}>
          <View
            style={{
              paddingLeft: 20,
              paddingTop: 5,
            }}>
            <FlatList
              data={user}
              horizontal={true}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              contentContainerStyle={{}}
              renderItem={({item, index}) => {
                return (
                  <View style={{margin: 2, paddingBottom: 10}}>
                    <TouchableOpacity
                      onPress={() => focused(item.name, item._id)}>
                      <UserAvatar size={35} name={item.name} />
                    </TouchableOpacity>
                  </View>
                );
              }}></FlatList>
          </View>
        </View>

        <View style={{height: 40, marginBottom: 10}}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        <View></View>
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
                borderRadius: 20,
                paddingHorizontal: 50,
                paddingVertical: 50,
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  // backgroundColor: 'rgba(70,142,13,0.2)',
                  borderRadius: 10,
                  padding: 5,
                  marginBottom: 50,
                  position: 'absolute',
                  top: 0,
                }}
                onPress={() => {
                  setOpenPopUp(false);
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  <Entypo name="circle-with-cross" size={25} color={'red'} />
                </Text>
              </TouchableOpacity>
              <Text style={styles.desgin}>Title : {activeItem?.title}</Text>
              <Text style={styles.desgin}>
                Reported By :{reporter_name?.name}
              </Text>
              <Text style={styles.desgin}>Assigned to :{assign_to?.name}</Text>
              <Text style={styles.desgin}>
                Desciption : {activeItem?.description}
              </Text>

              <View style={styles.desgin}>
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
              <View style={styles.desgin}>
                <TouchableOpacity
                  onPress={() => {
                    bs?.current?.snapTo(0);
                    setOpenPopUp(false);
                    setComments(true);

                    // bs.current.snapTo(0);
                  }}>
                  <Text style={{color: 'blue'}}>
                    Click To Add/Delete/View Comment
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  // backgroundColor: 'rgba(70,142,13,0.2)',
                  borderRadius: 10,
                  padding: 5,
                }}
                onPress={() => {
                  updateTask(activeItem?._id);
                  setOpenPopUp(false);
                }}>
                <MaterialIcons name="save-alt" size={25} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          visible={openModel}
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
                borderRadius: 20,
                paddingHorizontal: 100,
                paddingVertical: 100,
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  // backgroundColor: 'rgba(70,142,13,0.2)',
                  borderRadius: 10,
                  padding: 5,
                  marginBottom: 50,
                  position: 'absolute',
                  top: 0,
                }}
                onPress={() => {
                  setOpenModel(false);
                  // setOpenPopUp(true);
                  // setComments(false);
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  <Entypo name="circle-with-cross" size={25} color={'red'} />
                </Text>
              </TouchableOpacity>
              <View style={styles.footer}>
                <Text style={styles.text_footer}>Comment</Text>

                <View style={styles.action}>
                  <FontAwesome name="tasks" color="#05375a" size={20} />
                  <TextInput
                    placeholder="Add Title"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => textInputChange(val)}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  // backgroundColor: 'rgba(70,142,13,0.2)',
                  borderRadius: 10,
                  padding: 5,
                }}
                onPress={() => {
                  addComment();
                  updateTask(activeItem?._id);
                  setOpenModel(false);
                  setComments(false);
                  setOpenPopUp(true);
                }}>
                <MaterialIcons name="save-alt" size={25} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Animated.View>
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => props.navigation.navigate('AddNewTask')}
      />
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
    fontSize: 20,
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
  footer: {
    //flex: Platform.OS === 'ios' ? 4 : 5,
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
    // flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  desgin: {
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
});
