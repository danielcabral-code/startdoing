import React, {useState} from 'react';

import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const ChangeProfilePicture = () => {
  return (
    <Stack.Navigator initialRouteName="ChangeProfilePicturePage">
      <Stack.Screen
        options={{headerShown: false}}
        name="ChangeProfilePicture"
        component={ChangeProfilePicturePage}
      />
    </Stack.Navigator>
  );
};

function ChangeProfilePicturePage({route}) {
  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
          <Text style={styles.planNameText}>CHANGE PASSWORD</Text>
        </View>
      </View>

      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.profileImageBackground1}>
            <View style={styles.profileImageBackground2}>
              <Image
                style={styles.profileImage}
                source={require('../Images/Person.jpg')}></Image>
            </View>
          </View>

          <TouchableHighlight
            style={styles.saveBtn}
            underlayColor="#F27A2999"
            /* onPress={checkRegisterInputs} */
          >
            <Text style={styles.saveText}>SAVE CHANGES</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
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
  topSectionView: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
  },
  arrowLeft: {
    fontSize: 50,
    color: '#F27A29',
    marginLeft: -20,
    alignSelf: 'flex-start',
  },
  planNameText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginLeft: 6,
    alignSelf: 'center',
  },
  topBarInfoView: {
    width: '85%',
    flexDirection: 'row',
  },
  profileImageBackground1: {
    width: 273,
    height: 273,
    borderRadius: 150,
    backgroundColor: '#F27A29',
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageBackground2: {
    width: 253,
    height: 253,
    borderRadius: 150,
    backgroundColor: '#26282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 233,
    height: 233,
    borderRadius: 150,
  },
  saveBtn: {
    marginTop: 100,
    marginBottom: 24,
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
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  textError: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'red',
    marginTop: 10,
  },
});

export default ChangeProfilePicture;
