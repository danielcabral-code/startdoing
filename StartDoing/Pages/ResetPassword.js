import React, {useState} from 'react';

import {
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const ResetPassword = () => {
  return (
    <Stack.Navigator initialRouteName="ResetPassword">
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailErrorShow, setEmailErrorShow] = useState(false);
  const [invalidEmailErrorShow, setInvalidEmailErrorShow] = useState(false);
  const [unknownEmail, setUnknownEmail] = useState(false);
  const [passwordErrorShow, setPasswordErrorShow] = useState(false);
  const [confirmPasswordErrorShow, setConfirmpasswordErrorShow] = useState(
    false,
  );
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  validateEmail = (email) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  function checkRegisterInputs() {
    let code = 0;

    if (!email || email.trim() === '') {
      setEmailErrorShow(true);
      return;
    } else {
      setEmailErrorShow(false);
    }

    if (!validateEmail(email)) {
      setInvalidEmailErrorShow(true);
      return;
    } else {
      setInvalidEmailErrorShow(false);
    }

    if (!password || password.trim() === '') {
      setPasswordErrorShow(true);
      return;
    } else if (password.length < 6) {
      setPasswordLengthError(true);
      return;
    } else {
      setPasswordLengthError(false);
      setPasswordErrorShow(false);
    }

    if (!repeatPassword || repeatPassword.trim() === '') {
      setConfirmpasswordErrorShow(true);
      return;
    } else {
      setConfirmpasswordErrorShow(false);
    }

    if (password !== repeatPassword) {
      setConfirmpasswordErrorShow(true);
      return;
    }

    fetch('https://startdoing.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        code = JSON.stringify(response.status);

        if (code == 406) {
          fetch(`https://startdoing.herokuapp.com/recoverpassword/${email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: password,
            }),
          })
            .then((response) => {
              console.log(response.status);
            })
            .catch((error) => console.log('error', error));

          navigation.navigate('Login');
        } else {
          setUnknownEmail(true);
        }
      })
      .catch((error) => console.log('error', error));
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.bg2}>
        <Image
          source={require('../Images/gifLogo.gif')}
          style={styles.logo}></Image>
        <Text style={styles.logoName}>StartDoing</Text>

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
          {invalidEmailErrorShow ? (
            <Text style={styles.textError}>Please Enter a Valid Email.</Text>
          ) : null}
          {unknownEmail ? (
            <Text style={styles.textError}>This Email Does not Exist.</Text>
          ) : null}
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputText}>NEW PASSWORD</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
          {passwordErrorShow ? (
            <Text style={styles.textError}>Please Enter a Password.</Text>
          ) : null}
          {passwordLengthError ? (
            <Text style={styles.textError}>
              Password Must Have at Least 6 Characters.
            </Text>
          ) : null}
        </View>

        <View style={styles.inputViewRepeat}>
          <Text style={styles.inputText}>REPEAT NEW PASSWORD</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setRepeatPassword(text)}
            secureTextEntry={true}
            value={repeatPassword}
          />
          {confirmPasswordErrorShow ? (
            <Text style={styles.textError}>Passwords Must Match.</Text>
          ) : null}
        </View>

        <TouchableHighlight
          style={styles.resetBtn}
          underlayColor="#F27A2999"
          onPress={checkRegisterInputs}>
          <Text style={styles.resetText}>RESET PASSWORD</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#26282B',
    width: '100%',
  },
  bg2: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    height: 210,
    width: 184,
    marginTop: -10,
    alignSelf: 'center',
  },
  logoName: {
    color: '#FF8A3B',
    fontFamily: 'OpenSans-Light',
    fontSize: 36,
    marginTop: -22,
    alignSelf: 'center',
  },
  inputView: {
    alignSelf: 'center',
    marginTop: 30,
    width: '85%',
  },
  inputViewRepeat: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
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
  resetBtn: {
    marginTop: 24,
    marginBottom: 20,
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
  resetText: {
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
export default ResetPassword;
