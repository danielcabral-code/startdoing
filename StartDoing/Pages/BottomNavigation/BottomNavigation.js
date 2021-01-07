import React from 'react';

import {StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import Home from './Home';
import Plans from './Plans';
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

  function HomeScreen() {
    return <Home />;
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

            if (route.name === 'HOME') {
              iconName = focused ? 'home-sharp' : 'home-sharp';
            } else if (route.name === 'PLANS') {
              iconName = focused ? 'barbell-sharp' : 'barbell-sharp';
            } else if (route.name === 'SETTINGS') {
              iconName = focused ? 'settings-sharp' : 'settings-sharp';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#F27A29',
          inactiveTintColor: '#F27A2930',
          style: {
            backgroundColor: '#26282B',
            height: 60,
            paddingBottom: 4,
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
