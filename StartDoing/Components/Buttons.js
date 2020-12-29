import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

export const ButtonForgotPassword = () => {
  function onPressButton() {
    alert('You Pressed Me!');
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.forgotPasswordBtn}>
          <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const ButtonLogin = () => {
  function onPressButton() {
    alert('You Pressed Me!');
  }

  return (
    <>
      <TouchableHighlight
        style={styles.loginBtn}
        onPress={onPressButton}
        underlayColor="#F27A2999">
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableHighlight>
    </>
  );
};

export const ButtonNoAccount = () => {
  function onPressButton() {
    alert('You Pressed Me!');
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.noAccountBtn}>
          <Text style={styles.noAccountText}>
            DON'T HAVE AN ACCOUNT? CREATE ONE
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const ButtonGuest = () => {
  function onPressButton() {
    alert('You Pressed Me!');
  }

  return (
    <>
      <TouchableHighlight
        style={styles.guestBtn}
        onPress={onPressButton}
        underlayColor="#006DA899">
        <Text style={styles.guestText}>ENTER AS GUEST</Text>
      </TouchableHighlight>
    </>
  );
};

const styles = StyleSheet.create({
  forgotPasswordBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  loginBtn: {
    marginTop: 24,
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F27A29',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  loginText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  noAccountBtn: {
    marginTop: 20,
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#26282B',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  noAccountText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
  },
  guestBtn: {
    marginTop: 20,
    marginBottom: 20,
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#006DA8',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  guestText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
});
