import React, {useState} from 'react';

import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import {LogoWithText} from '../Components/LogoWithText';

const Stack = createStackNavigator();
const Register = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

function RegisterScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  function checkRegisterInputs() {
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Please Enter Name');
      return;
    }
    if (!email.trim()) {
      alert('Please Enter Email');
      return;
    }
    if (!password.trim()) {
      alert('Please Enter Password');
      return;
    }
    if (!repeatPassword.trim()) {
      alert('Please Enter Password');
      return;
    }
    if (password.trim() !== repeatPassword.trim()) {
      alert('Password must match');
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
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>EMAIL</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>PASSWORD</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>REPEAT PASSWORD</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setRepeatPassword(text)}
            secureTextEntry={true}
            value={repeatPassword}
          />
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

function MoreInfo({navigation, route}) {
  const [height, setHeight] = useState('');
  const [birth, setBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [showDate, setShowDate] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const checkMoreInfoInputs = () => {
    //Check for the Name TextInput

    if (!height) {
      alert('Please Enter Height');
      return;
    }
    if (!weight.trim()) {
      alert('Please Enter Weight');
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
    console.log(birth);
  };

  function createUser() {
    console.log(height);
    try {
      fetch('https://startdoing.herokuapp.com/register', {
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
        }),
      });
      console.log('created');
    } catch (error) {
      console.log(error);
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

          <Text style={styles.indicateValue}>INDICATE YOUR HEIGHT</Text>
          <View style={styles.inputViewMeasurement}>
            <TextInput
              style={styles.inputLineMeasurement}
              onChangeText={(text) =>
                setHeight(text)
              }
              keyboardType="number-pad"
              value={height}
            />
            <Text style={styles.inputText}>CM</Text>
          </View>

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
