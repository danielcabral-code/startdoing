import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { TextInput, Button, StyleSheet, View, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-swiper'
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from 'react-native-reanimated';

function RegisterScreen({ navigation }) {

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

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
        onPressIn={() => navigation.navigate('Results', { name: name, email: email, password: password })}
        style={{ height: 50, width: 300, backgroundColor: "#F27A29", alignSelf: "center" }}>
        <Text style={{ textAlign: "center", marginTop: 12.5 }}>NEXT</Text>
      </Pressable>


    </View>


  )
}

function MoreRegisterInfo({ navigation, route }) {
  const [height, setHeight] = useState('');
  const [birth, setBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
    console.log(currentDate);
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  return (

    <Swiper style={styles.wrapper} showsButtons={true}>
      
      <View style={styles.slide1}>
        <Text style={styles.text}>INDICATE YOUR DATE OF BIRTH</Text>
        <View>
          <Button onPress={showDatepicker} title="Select date" />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.slide2}>
        <Text style={styles.text}>INDICATE YOUR WEIGTH</Text>
        <TextInput
        style={{ width: 200,height:40, color:"white",marginTop:"58%", borderColor: 'gray', borderBottomWidth: 2, marginBottom: 20 }}
        onChangeText={text => setHeight(text)}
        value={height}/>
      </View>

      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>

    /* <View style={{ flex: 1 }}>
      <Text>{route.params.name}</Text>
      <Text>{route.params.email} {route.params.password}</Text>
    </View> */
  );
}

const Stack = createStackNavigator();
const register = () => {


  

  //Não apagar!
  /*   function createUser() {
  
  
      try {
        fetch('http://192.168.1.66:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": "setName",
            "email": email,
            "password": "test",
            "height": "1.80",
            "birth": "04-06-2000",
            "weight": "70",
            "photoUrl": "xskk"
          })
  
        })
  
      } catch (error) {
        console.log(error);
      }
    }
   */


  return (



    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterScreen">
        <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Results" component={MoreRegisterInfo} />
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
    justifyContent: 'center',
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
