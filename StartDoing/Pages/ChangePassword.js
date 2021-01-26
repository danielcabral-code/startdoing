import React, { useState } from 'react';

import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const ChangePassword = () => {
  return (
    <Stack.Navigator initialRouteName="ChangePasswordPage">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePasswordPage}
      />
    </Stack.Navigator>
  );
};

function ChangePasswordPage({ route }) {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailErrorShow, setEmailErrorShow] = useState(false);
  const [invalidEmailErrorShow, setInvalidEmailErrorShow] = useState(false);
  const [unknownEmail, setUnknownEmail] = useState(false);
  const [passwordErrorShow, setPasswordErrorShow] = useState(false);
  const [confirmPasswordErrorShow, setConfirmpasswordErrorShow] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  let email = route.params.email
  console.log(email);



  function checkRegisterInputs() {
    let code = 0;


    if (!password || password.trim() === '') {
      setPasswordErrorShow(true);
      return;
    }else if (password.length<6) {
 
      setPasswordLengthError(true)
      return
    }
    else {
      setPasswordLengthError(false)
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
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
          <Text style={styles.planNameText}>CHANGE PASSWORD</Text>
        </View>
      </View>

      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.inputView}>
            <Text style={styles.inputText}>EMAIL</Text>
            <TextInput
              style={styles.inputLine}
              placeholderTextColor='gray'
              editable={false}
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
              <Text style={styles.textError}>Password Must Be at Least 6 characters.</Text>
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
            style={styles.saveBtn}
            underlayColor="#F27A2999"
            onPress={checkRegisterInputs}
          >
            <Text style={styles.saveText}>RESET PASSWORD</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#26282B',
  },
  bg2: {
    width: '100%',
    alignItems: 'center',
  },
  topSectionView: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
  },
  arrowLeft: {
    fontSize: 50,
    color: '#F27A29',
    marginLeft: -20,
    alignSelf: 'flex-start',
  },
  planNameText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginLeft: 6,
    alignSelf: 'center',
  },
  topBarInfoView: {
    width: '85%',
    flexDirection: 'row',
  },
  inputView: {
    alignSelf: 'center',
    marginTop: 50,
    width: '85%',
  },
  inputViewRepeat: {
    alignSelf: 'center',
    marginTop: 50,
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
  saveBtn: {
    marginTop: 80,
    marginBottom: 24,
    width: '85%',
    height: 90.9,
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
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  textError: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'red',
    marginTop: 10,
  },
});

export default ChangePassword;
