import * as React from 'react';
import {View, Text, Button, Modal} from 'react-native';
import HomeScreen from './HomeScreen';

function ModalScreen(route) {
  return (
    <Modal style={{margin: 60}}>
      <Text style={{fontSize: 30, paddingBottom: 20}}>Im a Modal Screen</Text>
      <Button
        title="Close MODEL"
        onPress={() => {
          navigation.navigate(HomeScreen);
        }}
      />
    </Modal>
  );
}
export default ModalScreen;
