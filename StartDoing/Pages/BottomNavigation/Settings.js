import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';

const Settings = () => {
  function onPressButton() {
    alert('You Pressed Me!');
  }

  return (
    <>
      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.profileImageBackground1}>
            <View style={styles.profileImageBackground2}>
              <Image
                style={styles.profileImage}
                source={require('../../Images/Person.jpg')}></Image>
            </View>
          </View>

          <Text style={styles.userName}>HI, !</Text>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={onPressButton}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>EDIT WEIGHT & HEIGHT</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={onPressButton}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>CHANGE PROFILE PICTURE</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={onPressButton}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>CHANGE PASSWORD</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

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
  planBtn: {
    marginTop: 38,
    width: '85%',
    height: 90.9,
    borderRadius: 10,
    backgroundColor: '#F27A29',
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
  planText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
});

export default Settings;
