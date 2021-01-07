import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const LoginForm = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorShow, setEmailErrorShow] = useState(false);
  const [passwordErrorShow, setPasswordErrorShow] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  async function appLogin() {
    if (!email || email.trim() === '') {
      setEmailErrorShow(true);
      return;
    } else {
      setEmailErrorShow(false);
    }

    if (!password || password.trim() === '') {
      setPasswordErrorShow(true);
      return;
    } else {
      setPasswordErrorShow(false);
    }

    try {
      await fetch('https://startdoing.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          try {
            AsyncStorage.setItem('@token', result.token);
            console.log(result.token);
            setInvalidCredentials(false);
            navigation.navigate('BottomNavigation');
          } catch (e) {
            console.log(e);
          }
        });
    } catch (error) {
      setInvalidCredentials(true);
    }
   
  }

  return (
    <>
      <View style={styles.inputView}>
        
        <Text style={styles.inputText}>EMAIL</Text>
        <TextInput
          style={styles.inputLine}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        {emailErrorShow ? (
          <Text style={styles.textError}>Please Enter Your Email.</Text>
        ) : null}
      </View>

      <View style={styles.inputView}>
        <Text style={styles.inputText}>PASSWORD</Text>
        <TextInput
          style={styles.inputLine}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
        {passwordErrorShow ? (
          <Text style={styles.textError}>Please Enter a Password.</Text>
        ) : null}
        {invalidCredentials ? (
          <Text style={styles.textError}>Wrong Email or Password.</Text>
        ) : null}
      </View>

      <TouchableHighlight
        style={styles.loginBtn}
        onPress={appLogin}
        underlayColor="#F27A2999">
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableHighlight>
    </>
  );
};

const styles = StyleSheet.create({
  inputView: {
    alignSelf: 'center',
    marginTop: 16,
    width: '85%',
  },
  inputText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  inputLine: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    borderColor: 'white',
    borderBottomWidth: 2,
    color: 'white',
    alignSelf: 'center',
  },
  loginBtn: {
    marginTop: 24,
    width: '85%',
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
  textError: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'red',
    marginTop: 10,
  },
});
