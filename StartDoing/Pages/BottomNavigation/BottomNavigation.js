import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, BackHandler} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import HomeNoPlans from './HomeNoPlans';
import HomeWithPlans from './HomeWithPlans';
import PlansNoPlans from './PlansNoPlans';
import PlansWithPlans from './PlansWithPlans';
import Settings from './Settings';

const Stack = createStackNavigator();
const BottomNavigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="BottomNavigation">
        <Stack.Screen
          options={{headerShown: false}}
          name="BottomNavigation"
          component={BottomNav}
        />
      </Stack.Navigator>
    </>
  );
};

function BottomNav({navigation}) {
  const Tab = createBottomTabNavigator();

  //home screen
  function HomeScreen() {
    //state variables
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [plansExist, setPlansExist] = useState(false);

    //deactivate android back button
    useEffect(() => {
      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []);

    //variable that will receive token decoded
    let decoded = '';

    const getToken = async () => {
      try {
        //get token from storage
        setToken(await AsyncStorage.getItem('@token'));
        if (token !== null) {
          //decode token and set id
          decoded = jwt_decode(token);
          setId(decoded.data.id);
        }

        //get user plans from user id
        fetch(`https://startdoing.herokuapp.com/user_plans/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.length == 0) {
              setPlansExist(false);
            } else setPlansExist(true);
          })

          .catch((error) => console.log('error', error));
      } catch (e) {}
    };

    useEffect(() => {
      getToken();
    });

    //check if plans exist and return the appropriate home screen
    if (plansExist === true) {
      return <HomeWithPlans />;
    } else return <HomeNoPlans />;
  }

  function PlansScreen() {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [plansExist, setPlansExist] = useState(false);

    let decoded = '';

    const getToken = async () => {
      try {
        setToken(await AsyncStorage.getItem('@token'));
        if (token !== null) {
          decoded = jwt_decode(token);

          setId(decoded.data.id);
        }

        fetch(`https://startdoing.herokuapp.com/user_plans/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.length === 0) {
              setPlansExist(false);
            } else {
              setPlansExist(true);
            }
          })

          .catch((error) => console.log('error', error));
      } catch (e) {}
    };

    useEffect(() => {
      getToken();
    });

    //check if plans exist and return the appropriate customize plans screen
    if (plansExist === true) {
      return <PlansWithPlans />;
    } else return <PlansNoPlans />;
  }

  //settings screen
  function SettingsScreen() {
    return <Settings />;
  }
  return (
    <>
      {/* TabBotom navigation */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconNameHome;

            if (route.name === 'HOME') {
              iconNameHome = focused ? 'home' : 'home';
            } else if (route.name === 'PLANS') {
              iconName = focused ? 'fitness-center' : 'fitness-center';
            } else if (route.name === 'SETTINGS') {
              iconName = focused ? 'settings' : 'settings';
            }

            return (
              <>
                <Text>
                  <MaterialIcons name={iconName} size={30} color={color} />
                  <MaterialIcons name={iconNameHome} size={34} color={color} />
                </Text>
              </>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#F27A29',
          inactiveTintColor: '#F27A2940',
          labelPosition: 'below-icon',
          labelStyle: {
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 10,
            marginTop: -8,
          },
          style: {
            backgroundColor: '#26282B',
            height: 70,
            paddingTop: 0,
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 0,
            position: 'absolute',
          },
        }}>
        <Tab.Screen name="HOME" component={HomeScreen} />
        <Tab.Screen name="PLANS" component={PlansScreen} />
        <Tab.Screen name="SETTINGS" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});

export default BottomNavigation;
