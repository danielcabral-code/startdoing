import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

export const ButtonForgotPassword = ({navigate}) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ResetPassword')}>
        <View style={styles.forgotPasswordBtn}>
          <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const ButtonNoAccount = ({navigate}) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('RegisterScreen')}>
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
  const navigation = useNavigation();
  return (
    <>
      <TouchableHighlight
        style={styles.guestBtn}
        onPress={() => navigation.navigate('Guest')}
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
  noAccountBtn: {
    marginTop: 20,
    width: '85%',
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
    width: '85%',
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
