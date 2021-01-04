import React from 'react';

import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';

import {LogoWithText} from '../Components/LogoWithText';
import {TextInputEmail, TextInputPassword} from '../Components/Login/TextInputs';

import {
  ButtonForgotPassword,
  ButtonLogin,
  ButtonNoAccount,
  ButtonGuest,
} from '../Components/Login/Buttons';

const Login = () => {
  return (
    <>
      <View style={styles.background}>
        <KeyboardAvoidingView behavior="position">
          <LogoWithText></LogoWithText>
          <TextInputEmail></TextInputEmail>
          <TextInputPassword></TextInputPassword>
          <ButtonForgotPassword></ButtonForgotPassword>
          <ButtonLogin></ButtonLogin>
          <ButtonNoAccount></ButtonNoAccount>
          <ButtonGuest></ButtonGuest>
        </KeyboardAvoidingView>
      </View>
    </>
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
