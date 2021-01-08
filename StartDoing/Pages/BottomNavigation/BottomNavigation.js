import React from 'react';

import {StyleSheet, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import HomeNoPlans from './HomeNoPlans';
import HomeWithPlans from './HomeWithPlans';

import Plans from './Plans';
import Settings from './Settings';

const Stack = createStackNavigator();
const BottomNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomNavigation">
          <Stack.Screen
            options={{headerShown: false}}
            name="BottomNavigation"
            component={BottomNav}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

function BottomNav({navigation}) {
  const Tab = createBottomTabNavigator();

  function HomeScreen() {
    return <HomeNoPlans />;
  }

  function PlansScreen() {
    return <Plans />;
  }

  function SettingsScreen() {
    return <Settings />;
  }
  return (
    <>
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

            // You can return any component that you like here!
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
            elevation: 20,
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
