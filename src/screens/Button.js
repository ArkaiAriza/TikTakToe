import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
const circle = require('../../assets/circle.png');
const x = require('../../assets/x.png');

const Button = ({ index, value, handleTouch }) => {
  return (
    <View
      key={index}
      style={styles.button}
      onTouchStart={() => handleTouch(index)}
    >
      <Image
        source={value ? (value == 'O' ? circle : x) : null}
        style={styles.image}
        resizeMode='center'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '80%',
    width: '80%',
  },
  button: {
    width: '30%',
    height: 120,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 2,
  },
});

export default Button;
