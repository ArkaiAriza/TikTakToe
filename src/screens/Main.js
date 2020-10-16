import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Portal, Dialog, Button as Bt } from 'react-native-paper';
import Constants from 'expo-constants';
import GeneralOptionsContext from '../contexts/GeneralOptionsContext';

import firebase from '../db/Firebase';

const db = firebase.database();

const Main = ({ navigation }) => {
  const [name, setName] = useState('');
  const [nameVisible, setNameVisible] = useState(false);

  const { gameID, changeGameId, changePlayer } = useContext(
    GeneralOptionsContext
  );

  const handleCreateGame = () => {
    const id = db.ref('games/').push({
      board: ['', '', '', '', '', '', '', '', ''],
      currentUser: 'O',
      finished: false,
      gameName: name,
      full: false,
    }).key;

    setName('');
    changeGameId(id);
    navigation.push('Game');
    changePlayer('O');
  };

  const handleJoinGame = () => {
    navigation.push('JoinGame');
  };

  const showNameDialog = () => {
    setNameVisible(true);
  };
  const hideNameDialog = () => {
    setNameVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settings}>Welcome to TikTakToe!</Text>
      <TouchableOpacity style={styles.option} onPress={showNameDialog}>
        <Text style={styles.optionText}>Create game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleJoinGame}>
        <Text style={styles.optionText}>Join game</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={nameVisible} onDismiss={hideNameDialog}>
          <Dialog.Title>Type a name</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={{
                fontSize: 30,
                backgroundColor: '#eee',
                borderRadius: 10,
                padding: 5,
              }}
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Bt
              onPress={() => {
                handleCreateGame();
                hideNameDialog();
              }}
            >
              Create
            </Bt>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export default Main;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: '100%',
    paddingHorizontal: '5%',
  },
  audioOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    height: '10%',
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
  },
  optionText: { fontSize: 24 },
  subOptionText: {
    color: 'grey',
  },
  settings: { fontSize: 30, paddingVertical: '5%' },
});
