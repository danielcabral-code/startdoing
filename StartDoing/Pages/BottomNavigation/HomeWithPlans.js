import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
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

          <Text style={styles.userName}>HI, {}!</Text>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={onPressButton}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>PLAN1</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={onPressButton}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>PLAN2</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.suggestedBtn}
            onPress={onPressButton}
            underlayColor="#006DA899">
            <Text style={styles.suggestedText}>SUGGESTED TRAINING</Text>
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
  suggestedBtn: {
    marginTop: 38,
    marginBottom: 20,
    width: '85%',
    height: 90.9,
    borderRadius: 10,
    backgroundColor: '#006DA8',
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
  suggestedText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
});

export default Home;
