import React, {useState} from 'react';

import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {} from '../Components/Login/LoginForm';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const Stack = createStackNavigator();
const Register = () => {
  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MoreInfo"
        component={MoreInfo}
      />
    </Stack.Navigator>
  );
};

function RegisterScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [nameErrorShow, setNameErrorShow] = useState(false);
  const [emailErrorShow, setEmailErrorShow] = useState(false);
  const [invalidEmailErrorShow, setInvalidEmailErrorShow] = useState(false);
  const [passwordErrorShow, setPasswordErrorShow] = useState(false);
  const [confirmPasswordErrorShow, setConfirmpasswordErrorShow] = useState(
    false,
  );
  const [emailInUse, setEmailInUse] = useState(false);

  validateEmail = (email) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  function checkRegisterInputs() {
    let code = 0;

    if (!name || name.trim() === '') {
      setNameErrorShow(true);
      return;
    } else {
      setNameErrorShow(false);
    }

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
    } else {
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
          setEmailInUse(true);
        } else {
          setEmailInUse(false);
          navigation.navigate('MoreInfo', {
            name: name,
            email: email,
            password: password,
          });
        }
      })
      .catch((error) => console.log('error', error));
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.bg2}>
        <Image
          source={require('../Images/LogoStartDoing.png')}
          style={styles.logo}></Image>
        <Text style={styles.logoName}>StartDoing</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>NAME</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          {nameErrorShow ? (
            <Text style={styles.textError}>Please Enter Your Name.</Text>
          ) : null}
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>EMAIL</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            value={email}
          />
          {emailErrorShow ? (
            <Text style={styles.textError}>Please Enter Your Email.</Text>
          ) : null}
          {invalidEmailErrorShow ? (
            <Text style={styles.textError}>Please Enter a Valid Email.</Text>
          ) : null}
          {emailInUse ? (
            <Text style={styles.textError}>Email Already in Use.</Text>
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
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>REPEAT PASSWORD</Text>
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
          style={styles.nextBtn}
          onPress={checkRegisterInputs}
          underlayColor="#F27A2999">
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

function MoreInfo({route}) {
  const navigation = useNavigation();

  const [height, setHeight] = useState('');
  const [birth, setBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [showDate, setShowDate] = useState('');

  const [birthErrorShow, setBirthErrorShow] = useState(false);
  const [heightErrorShow, setHeigthErrorShow] = useState(false);
  const [weightErrorShow, setWeightErrorShow] = useState(false);
  const [onlyNumbersHeightErrorShow, setOnlyNumbersHeightErrorShow] = useState(
    false,
  );
  const [onlyNumbersWeightErrorShow, setOnlyNumbersWeightErrorShow] = useState(
    false,
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  function validateHeight(height) {
    let numreg = /^[0-9]+$/;
    return numreg.test(height);
  }

  function validateWeight(weight) {
    let numreg = /^[0-9]+$/;
    return numreg.test(weight);
  }

  const checkMoreInfoInputs = () => {
    if (!birth) {
      setBirthErrorShow(true);
      return;
    } else {
      setBirthErrorShow(false);
    }

    if (!height) {
      setHeigthErrorShow(true);
      return;
    } else {
      setHeigthErrorShow(false);
    }

    if (!validateHeight(height)) {
      setOnlyNumbersHeightErrorShow(true);
      return;
    } else {
      setOnlyNumbersHeightErrorShow(false);
    }

    if (!weight) {
      setWeightErrorShow(true);
      return;
    } else {
      setWeightErrorShow(false);
    }

    if (!validateWeight(weight)) {
      setOnlyNumbersWeightErrorShow(true);
      return;
    } else {
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
          photoUrl:
            'https://firebasestorage.googleapis.com/v0/b/startdoing-bd1bc.appspot.com/o/person.jpg?alt=media&token=d201079f-9035-4f11-9421-58d1e9293359',
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
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
          {birthErrorShow ? (
            <Text style={styles.textError}>Please Enter Your DOB.</Text>
          ) : null}
          <Text style={styles.pickedDate}>{showDate}</Text>
          <View style={styles.inputViewMeasurement}>
            <Text style={styles.inputText}>INDICATE YOUR HEIGHT IN CM</Text>
            <TextInput
              style={styles.inputLine}
              onChangeText={(text) => setHeight(text)}
              keyboardType="numeric"
              value={height}
            />
            {heightErrorShow ? (
              <Text style={styles.textError}>Please Enter Your Height.</Text>
            ) : null}
            {onlyNumbersHeightErrorShow ? (
              <Text style={styles.textError}>Field Only Accepts Numbers.</Text>
            ) : null}
          </View>
          <View style={styles.inputViewMeasurement}>
            <Text style={styles.inputText}>INDICATE YOUR WEIGHT IN KG</Text>
            <TextInput
              style={styles.inputLine}
              onChangeText={(text) => setWeight(text)}
              keyboardType="number-pad"
              value={weight}
            />
            {weightErrorShow ? (
              <Text style={styles.textError}>Please Enter Your Weight.</Text>
            ) : null}
            {onlyNumbersWeightErrorShow ? (
              <Text style={styles.textError}>Field Only Accepts Numbers.</Text>
            ) : null}
          </View>
          <TouchableHighlight
            style={styles.createBtn}
            onPress={checkMoreInfoInputs}
            underlayColor="#F27A2999">
            <Text style={styles.createText}>CREATE ACCOUNT</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
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
    marginTop: 16,
    width: '85%',
  },
  inputText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  textError: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'red',
    marginTop: 10,
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
  inputViewMeasurement: {
    alignSelf: 'center',
    marginTop: 64,
    width: '85%',
  },
  nextBtn: {
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
  nextText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  selectBtn: {
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
  selectText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  createBtn: {
    marginTop: 70,
    marginBottom: 20,
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
    alignSelf: 'center',
  },
});

export default Register;
