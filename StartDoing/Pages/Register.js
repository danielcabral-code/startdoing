import 'react-native-gesture-handler';
import React, { useState } from 'react';

import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import { LogoWithText } from '../Components/LogoWithText';

const Stack = createStackNavigator();
const Register = () => {

  return (

    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MoreInfo"
        component={MoreInfo}
      />
    </Stack.Navigator>

  );
};


function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [nameErrorShow, setNameErrorShow] = useState(false);
  const [emailErrorShow, setEmailErrorShow] = useState(false);
  const [invalidEmailErrorShow, setInvalidEmailErrorShow] = useState(false);
  const [passwordErrorShow, setPasswordErrorShow] = useState(false);
  const [confirmPasswordErrorShow, setConfirmpasswordErrorShow] = useState(false);

  


  validateEmail = (email) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  function checkRegisterInputs() {

    if (!name || name.trim() === '') {
      setNameErrorShow(true)
      return;
    }
    setNameErrorShow(false)
    if (!email || email.trim() === '') {
      setEmailErrorShow(true)
      return;
    }
    setEmailErrorShow(false)
    if (!validateEmail(email)) {
      setInvalidEmailErrorShow(true)
      return
    }
    setInvalidEmailErrorShow(false)
    if (!password || password.trim() === '') {
      setPasswordErrorShow(true)
      return;
    }
    setPasswordErrorShow(false)
    if (!repeatPassword || repeatPassword.trim() === '') {
      setConfirmpasswordErrorShow(true)
      return;
    }
    setConfirmpasswordErrorShow(false)
    if (password !== repeatPassword) {
      setConfirmpasswordErrorShow(true)
      return;
    } else {
      navigation.navigate('MoreInfo', {
        name: name,
        email: email,
        password: password,
      });
    }
  }
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView behavior="position">
        <LogoWithText></LogoWithText>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>NAME</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          {nameErrorShow ? (<Text style={styles.textError}>Please enter your name</Text>) : null}

        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>EMAIL</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            value={email}
          />
          {emailErrorShow ? (<Text style={styles.textError}>Please enter your email</Text>) : null}
          {invalidEmailErrorShow ? (<Text style={styles.textError}>Please enter a valid email</Text>) : null}
        
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>PASSWORD</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
          {passwordErrorShow ? (<Text style={styles.textError}>Please enter a password</Text>) : null}
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>REPEAT PASSWORD</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setRepeatPassword(text)}
            secureTextEntry={true}
            value={repeatPassword}
          />
          {confirmPasswordErrorShow ? (<Text style={styles.textError}>Password must match</Text>) : null}
        </View>
        <TouchableHighlight
          style={styles.nextBtn}
          onPress={checkRegisterInputs}
          underlayColor="#F27A2999">
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </View>
  );
}

function MoreInfo({ navigation, route }) {
  const [height, setHeight] = useState('');
  const [birth, setBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [showDate, setShowDate] = useState('');

  const [birthErrorShow, setBirthErrorShow] = useState(false);
  const [heightErrorShow, setHeigthErrorShow] = useState(false);
  const [weightErrorShow, setWeightErrorShow] = useState(false);
  const [onlyNumbersHeightErrorShow, setOnlyNumbersHeightErrorShow] = useState(false);
  const [onlyNumbersWeightErrorShow, setOnlyNumbersWeightErrorShow] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  function validateHeight(height) {
    let numreg = /^[0-9]+$/;
    return numreg.test(height)
  }

  function validateWeight(weight) {
    let numreg = /^[0-9]+$/;
    return numreg.test(weight)
  }
  const checkMoreInfoInputs = () => {

    if (!birth) {
      setBirthErrorShow(true)
      return;
    }
    setBirthErrorShow(false)

    if (!height) {
      setHeigthErrorShow(true)
      return;
    }
    setHeigthErrorShow(false)

    if (!validateHeight(height)) {
     setOnlyNumbersHeightErrorShow(true)
      return;
    }
    setOnlyNumbersHeightErrorShow(false)

    if (!weight) {
      setWeightErrorShow(true);
      return;
    }
    setWeightErrorShow(false)

    if (!validateWeight(weight)) {
     setOnlyNumbersWeightErrorShow(true)
      return;
    }

    else {
      createUser();
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirth(date);
    setShowDate(Moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  async function createUser() {

    try {
      await fetch('https://startdoing.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: route.params.name,
          email: route.params.email,
          password: route.params.password,
          height: height,
          birth: birth,
          weight: weight,
          photoUrl: 'xskk',
        })
      })
        .then(response => response.json())
        .then(result => console.log(result))


    }
    catch (error) {
      Alert.alert(
        "Error",
        "This email is already in use! Please choose another",
        [
          { text: "OK", onPress: () => navigation.navigate("RegisterScreen") }
        ],
        { cancelable: false }
      );
    
    }
  }

  return (
    <>
      <View style={styles.background}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.indicateValue}>INDICATE YOUR DATE OF BIRTH</Text>
          <TouchableHighlight
            style={styles.selectBtn}
            onPress={showDatePicker}
            underlayColor="#F27A2999">
            <Text style={styles.selectText}>SELECT DATE</Text>
          </TouchableHighlight>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={styles.pickedDate}>{showDate}</Text>
          {birthErrorShow ? (<Text style={styles.textError}>Please enter your birth date</Text>) : null}

          <Text style={styles.indicateValue}>INDICATE YOUR HEIGHT</Text>
          <View style={styles.inputViewMeasurement}>
            <TextInput
              style={styles.inputLineMeasurement}
              onChangeText={(text) => setHeight(text)}
              keyboardType='numeric'
              value={height}
            />
            <Text style={styles.inputText}>CM</Text>

          </View>
          {heightErrorShow ? (<Text style={styles.textError}>Please enter your height</Text>) : null}
          {onlyNumbersHeightErrorShow ? (<Text style={styles.textError}>Please enter only numbers in height</Text>) : null}

          <Text style={styles.indicateValue}>INDICATE YOUR WEIGHT</Text>
          <View style={styles.inputViewMeasurement}>
            <TextInput
              style={styles.inputLineMeasurement}
              onChangeText={(text) => setWeight(text)}
              keyboardType="number-pad"
              value={weight}
            />
            <Text style={styles.inputText}>KG</Text>
          </View>
          {weightErrorShow ? (<Text style={styles.textError}>Please enter your weight</Text>) : null}
          {onlyNumbersWeightErrorShow ? (<Text style={styles.textError}>Please enter only numbers in weight</Text>) : null}

          <TouchableHighlight
            style={styles.createBtn}
            onPress={checkMoreInfoInputs}
            underlayColor="#F27A2999">
            <Text style={styles.createText}>CREATE ACCOUNT</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#26282B',
    alignItems: 'center',
  },
  inputView: {
    alignSelf: 'center',
    marginTop: 16,
  },
  inputText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  textError: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: 'red',
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
  nextBtn: {
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
  nextText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  selectBtn: {
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
  selectText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  createBtn: {
    marginTop: 70,
    width: 300,
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
  createText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  indicateValue: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
    marginTop: 50,
  },
  pickedDate: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
    marginTop: 20,
    alignSelf: 'center'
  },
  inputViewMeasurement: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 14,
  },
  inputLineMeasurement: {
    width: 272,
    height: 40,
    alignSelf: 'center',
    borderColor: 'white',
    borderBottomWidth: 2,
    color: 'white',
    alignSelf: 'center',
  },
});

export default Register;
