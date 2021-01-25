import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import jwt_decode from 'jwt-decode';

const Stack = createStackNavigator();
const GuestHome = () => {
  return (
    <Stack.Navigator initialRouteName="GuestHome">
      <Stack.Screen
        options={{headerShown: false}}
        name="Guest"
        component={GuestPage}
      />
    </Stack.Navigator>
  );
};

function GuestPage({route}) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  let decoded = '';

  function onPressButton() {
    alert('You Pressed Me!');
  }

  const getToken = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'));
      if (token !== null) {
        decoded = jwt_decode(token);
        setName(decoded.data.name);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getToken();
  });

  return (
    <>
      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.profileImageBackground1}>
            <View style={styles.profileImageBackground2}>
              <Image
                style={styles.profileImage}
                source={require('../Images/Person.jpg')}></Image>
            </View>
          </View>

          <Text style={styles.userName}>HI!</Text>

          <TouchableWithoutFeedback>
            <View style={styles.unactiveBtn}>
              <Text style={styles.unactiveText}>
                YOU DON'T HAVE ANY PLANS YET
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <MaterialIcons name="keyboard-arrow-down" style={styles.arrowDown} />

          <TouchableWithoutFeedback onPress={onPressButton}>
            <View style={styles.createPlanBtn}>
              <Text style={styles.createPlanText}>CREATE A PLAN</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableHighlight
            style={styles.suggestedBtn}
            onPress={onPressButton}
            underlayColor="#006DA899">
            <Text style={styles.suggestedText}>SUGGESTED TRAINING</Text>
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
  profileImageBackground1: {
    width: 84,
    height: 84,
    borderRadius: 50,
    backgroundColor: '#F27A29',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageBackground2: {
    width: 78,
    height: 78,
    borderRadius: 50,
    backgroundColor: '#26282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userName: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    marginTop: 6,
    alignSelf: 'center',
  },
  unactiveBtn: {
    marginTop: 40,
    width: '85%',
    height: 90.9,
    borderRadius: 10,
    backgroundColor: '#F27A2940',
    justifyContent: 'center',
  },
  unactiveText: {
    alignSelf: 'center',
    color: '#FFFFFF40',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
  },
  arrowDown: {
    fontSize: 60,
    color: 'white',
    marginTop: 12,
  },
  createPlanBtn: {
    marginTop: 10,
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#26282B',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  createPlanText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
  },
  suggestedBtn: {
    marginTop: 38,
    marginBottom: 20,
    width: '85%',
    height: 90.9,
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
  suggestedText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
});

export default GuestHome;
