import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment'

const convert = require('convert-units')
 



function RegisterScreen({ navigation }) {


  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');


  const checkRegisterInputs = () => {
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
    }
    else{
      navigation.navigate('MoreInfo', { name: name, email: email, password: password })

    }
    
  };
  return (

    <View>

      <Text>NAME</Text>
      <TextInput
        style={{ width: 300, height: 40, alignSelf: 'center', borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
        onChangeText={text => setName(text)}
        value={name}
      />
      
      <Text>EMAIL</Text>
      <TextInput
        style={{ width: 300, height: 40, alignSelf: 'center', borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        value={email}
      />

      <Text>PASSWORD</Text>
      <TextInput
        style={{ width: 300, height: 40, alignSelf: 'center', borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />

      <Text>REPEAT PASSWORD</Text>
      <TextInput
        style={{ width: 300, height: 40, alignSelf: 'center', borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
        onChangeText={text => setRepeatPassword(text)}
        secureTextEntry={true}
        value={repeatPassword}
      />

      <Pressable
        onPressIn={checkRegisterInputs}
        style={{ height: 50, width: 300, backgroundColor: "#F27A29", alignSelf: "center" }}>
        <Text style={{ textAlign: "center", marginTop: 12.5 }}>NEXT</Text>
      </Pressable>


    </View>


  )
}

function MoreInfo({ navigation, route }) {

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
    }
    else{
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
    setShowDate(Moment(date).format("DD/MM/YYYY"))
    hideDatePicker();
    console.log(birth);

  };

  function createUser() {
  
    console.log(height)
    try {
      fetch('https://startdoing.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": route.params.name,
          "email": route.params.email,
          "password": route.params.password,
          "height": height,
          "birth": birth,
          "weight": weight,
          "photoUrl": "xskk"
        })

      })
      console.log("created");
    } catch (error) {
      console.log(error);

    }
  }

  return (

    <View style={styles.slide1}>
      <Text style={styles.text}>INDICATE YOUR DATE OF BIRTH</Text>


      <Pressable
        onPressIn={showDatePicker}
        style={{ height: 50, width: 300, backgroundColor: "#F27A29", alignSelf: "center" }}>
        <Text style={{ textAlign: "center", marginTop: 12.5 }}>Select date</Text>
      </Pressable>

      <Text style={styles.text}>{showDate}</Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.text}>INDICATE YOUR HEIGHT</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          style={{ width: 100, height: 40,color: "white", alignSelf: 'center', borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
          onChangeText={text => setHeight(convert(text).from('cm').to('m'))}
          keyboardType="number-pad"
          value={height}
        />
        <Text style={{ color: "white", marginTop: 25, marginLeft: 10 }}>cm</Text>
      </View>

      <Text style={styles.text}>INDICATE YOUR WEIGHT</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>

        <TextInput
          style={{ width: 100, height: 40,color: "white", alignSelf: 'center', borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
          onChangeText={text => setWeight(text)}
          keyboardType="number-pad"
          value={weight}
          
        />
        <Text style={{ color: "white", marginTop: 25, marginLeft: 10 }}>kg</Text>
      </View>

      <Pressable
        onPressIn={checkMoreInfoInputs}
        style={{ height: 50, width: 300, backgroundColor: "#F27A29", alignSelf: "center" }}>
        <Text style={{ textAlign: "center", marginTop: 12.5 }}>CREATE ACCOUNT</Text>
      </Pressable>

    </View>


  );
}

const Stack = createStackNavigator();
const register = () => {

  return (



    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterScreen">
        <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="MoreInfo" component={MoreInfo} />
      </Stack.Navigator>
    </NavigationContainer>



  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#26282B'

  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#26282B'
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#26282B'
  },
  text: {
    color: '#fff',
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
  }

})

export default register;
