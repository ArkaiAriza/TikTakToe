import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet, View, Button as RButton } from 'react-native';
import { Button as Bt, RadioButton, Dialog, Portal } from 'react-native-paper';
import Button from './Button';
import Header from './Header';
import { winner, movesLeft, find_best_move } from '../logic/index';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import Firebase from '../db/Firebase';

import GeneralOptionsContext from '../contexts/GeneralOptionsContext';

const db = Firebase.database();

let initValues = ['', '', '', '', '', '', '', '', ''];

const clickSound = new Audio.Sound();
const winSound = new Audio.Sound();
const loseSound = new Audio.Sound();

const Game = ({ navigation }) => {
  const {
    audio,
    victoryMessage,
    difficulty,
    reset,
    changeReset,
    gameId,
    player,
  } = useContext(GeneralOptionsContext);

  const [values, setValues] = useState(initValues);
  const [finished, setFinished] = useState(false);
  const [win, setWin] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    clickSound.loadAsync(require('../../assets/Click.mp3'));
    winSound.loadAsync(require('../../assets/Win.mp3'));
    loseSound.loadAsync(require('../../assets/Lose.mp3'));
  }, []);

  useEffect(() => {
    db.ref('/games/' + gameId).on('value', (data) => {
      setValues(data.val().board);
      setData(data.val());
      setFinished(data.val().finished);
      console.log(player, data.val().finished);
    });
  }, []);

  useEffect(() => {
    const w = winner(values);
    if (w) {
      setWin(w);
      setFinished(true);
      db.ref('/games/' + gameId).update({
        finished: true,
      });
      if (w === player && audio) {
        winSound.replayAsync();
      } else if (audio) {
        loseSound.replayAsync();
      }
    } else if (!movesLeft(values)) {
      setFinished(true);
      db.ref('/games/' + gameId).update({
        finished: true,
      });
    }
  }, [values]);

  const showDialog = () => {
    navigation.push('Settings');
  };

  const handleTouch = (index) => {
    if (
      player === data.currentUser &&
      values[index] === '' &&
      !finished &&
      data.full
    ) {
      if (audio) clickSound.replayAsync();
      db.ref('/games/' + gameId).update({
        board: values.map((el, i) => (i === index ? player : el)),
        currentUser: player === 'O' ? 'X' : 'O',
      });
    }
  };

  useEffect(() => {
    db.ref('/games/' + gameId).update({
      board: initValues,
      currentUser: 'O',
      finished: false,
    });
    setValues(initValues);
    setFinished(false);
    setWin(null);
  }, [reset]);

  const renderButtons = () => {
    return values.map((value, index) => {
      return (
        <Button
          key={index}
          index={index}
          value={value}
          handleTouch={(index) => handleTouch(index)}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {data.full
              ? player === data.currentUser
                ? 'Your move'
                : "Opponent's turn"
              : 'Waiting for opponent'}
          </Text>
        </View>
        <View style={styles.gameBoard}>{renderButtons()}</View>
        <View style={styles.textContainer}>
          {finished ? (
            <Text style={styles.text}>
              {win
                ? win === player
                  ? victoryMessage
                  : 'Opponent wins'
                : 'Draw'}
            </Text>
          ) : null}
        </View>
      </View>
      <Header onReset={changeReset} onSettingsSelect={showDialog} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: '100%',
  },
  mainContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: { height: '15%', justifyContent: 'center' },
  text: { fontSize: 30 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 200,
  },
  optionText: {
    fontSize: 5,
  },
  gameBoard: {
    maxHeight: '60%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Game;
