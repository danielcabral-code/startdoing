import React from 'react';

import {StyleSheet, Text, Image} from 'react-native';

export const LogoWithText = () => {
  return (
    <>
      <Image
        source={require('../Images/LogoStartDoing.png')}
        style={styles.logo}></Image>
      <Text style={styles.logoName}>StartDoing</Text>
    </>
  );
};

const styles = StyleSheet.create({
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
