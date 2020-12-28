import React from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';

const Login = () => {
  return (
    <>
      <View style={styles.background}>
        <Image
          source={require('../Images/LogoStartDoing.png')}
          style={styles.logo}></Image>
        <Text style={styles.logoName}>StartDoing</Text>
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
  logo: {
    height: 210,
    width: 184,
    marginTop: -10
  },
  logoName: {
    color: '#FF8A3B',
    fontFamily: 'OpenSans-Light',
    fontSize: 36,
    marginTop: -22
  },
});

export default Login;
