import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { LogoWithText } from '../Components/LogoWithText';
import { LoginForm } from '../Components/LoginForm';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../Pages/Register'

import {
  ButtonForgotPassword,
  ButtonNoAccount,
  ButtonGuest,
} from '../Components/Buttons';

function LoginScreen({ navigation }) {

  return(
  <View style={styles.background}>
        <KeyboardAvoidingView behavior="position">
          <LogoWithText />
          <LoginForm />
          <ButtonForgotPassword />
          <ButtonNoAccount />
          <ButtonGuest />
        </KeyboardAvoidingView>
      </View>
  )
}

const Stack = createStackNavigator();
const Login = () => {
  return (
    

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#26282B',
    alignItems: 'center',
  },
});

export default Login;
