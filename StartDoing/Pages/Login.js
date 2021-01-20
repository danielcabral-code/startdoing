import React from 'react';
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';

import {LoginForm} from '../Components/Login/LoginForm';
import RegisterScreen from '../Pages/Register';
import {
  ButtonForgotPassword,
  ButtonNoAccount,
  ButtonGuest,
} from '../Components/Login/Buttons';

import ResetPasswordScreen from '../Pages/ResetPassword';
import BottomNavigation from '../Pages/BottomNavigation/BottomNavigation';
import UserPlan from '../Pages/UserPlan';
import CreatePlan from '../Pages/CreatePlan';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserPlanExercises from '../Pages/UserPlanExercises';
import CustomizeUserPlan from '../Pages/CustomizeUserPlan'

const Stack = createStackNavigator();
const LoginPage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="BottomNavigation"
          component={BottomNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserPlan"
          component={UserPlan}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CreatePlan"
          component={CreatePlan}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserPlanExercises"
          component={UserPlanExercises}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="CustomizeUserPlan"
          component={CustomizeUserPlan}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function LoginScreen({navigation}) {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.bg2}>
        <Image
          source={require('../Images/gifLogo.gif')}
          style={styles.logo}></Image>
        <Text style={styles.logoName}>StartDoing</Text>

        <LoginForm />

        <View style={styles.forgotPasswordView}>
          <ButtonForgotPassword />
        </View>

        <ButtonNoAccount />
        <ButtonGuest />
      </View>
    </ScrollView>
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
  forgotPasswordView: {
    width: '85%',
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
});

export default LoginPage;
