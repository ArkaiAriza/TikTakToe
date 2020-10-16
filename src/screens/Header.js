import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, BackHandler } from 'react-native';

const Header = ({ onReset, onSettingsSelect }) => (
  <Appbar style={styles.bottom}>
    <Appbar.Action icon='autorenew' onPress={() => onReset()}>
      New Game
    </Appbar.Action>

    <Appbar.Action icon='settings' onPress={() => onSettingsSelect()} />
    <Appbar.Action icon='exit-to-app' onPress={() => BackHandler.exitApp()} />
  </Appbar>
);

export default Header;

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
