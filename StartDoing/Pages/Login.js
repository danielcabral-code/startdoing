import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const Login = () => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 100;

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.background}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Image
          source={require('../Images/LogoStartDoing.png')}
          style={styles.logo}></Image>
        <Text style={styles.logoName}>StartDoing</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>EMAIL</Text>
          <TextInput style={styles.inputLine} />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>PASSWORD</Text>
          <TextInput style={styles.inputLine} secureTextEntry={true} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#26282B',
    alignItems: 'center',
  },
  logo: {
    height: 210,
    width: 184,
    marginTop: -10,
  },
  logoName: {
    color: '#FF8A3B',
    fontFamily: 'OpenSans-Light',
    fontSize: 36,
    marginTop: -22,
  },
  inputView: {
    marginTop: 30,
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
  },
});

export default Login;
