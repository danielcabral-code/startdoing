import React from 'react';

import {StyleSheet, View, Text, TextInput} from 'react-native';

export const TextInputEmail = () => {
  return (
    <>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>EMAIL</Text>
        <TextInput style={styles.inputLine} />
      </View>
    </>
  );
};

export const TextInputPassword = () => {
  return (
    <>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>PASSWORD</Text>
        <TextInput style={styles.inputLine} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputView: {
    alignSelf: 'center',
    marginTop: 16,
  },
  inputText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  inputLine: {
    width: 300,
    height: 40,
    alignSelf: 'center',
    borderColor: 'white',
    borderBottomWidth: 2,
    color: 'white',
    alignSelf: 'center',
  },
});