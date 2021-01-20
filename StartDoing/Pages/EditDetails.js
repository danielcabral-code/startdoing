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
const EditDetails = () => {
  return (
    <Stack.Navigator initialRouteName="EditDetailsPage">
      <Stack.Screen
        options={{headerShown: false}}
        name="EditDetails"
        component={EditDetailsPage}
      />
    </Stack.Navigator>
  );
};

function EditDetailsPage({route}) {
  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
          <Text style={styles.planNameText}>EDIT WEIGHT & HEIGHT</Text>
        </View>
      </View>

      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.inputViewMeasurement}>
            <Text style={styles.inputText}>INDICATE YOUR WEIGHT IN KG</Text>
            <TextInput
              style={styles.inputLine}
              /* onChangeText={(text) => setWeight(text)} */
              keyboardType="number-pad"
              /* value={weight} */
            />
          </View>

          <View style={styles.inputViewMeasurement}>
            <Text style={styles.inputText}>INDICATE YOUR HEIGHT IN CM</Text>
            <TextInput
              style={styles.inputLine}
              /* onChangeText={(text) => setHeight(text)} */
              keyboardType="numeric"
              /* value={height} */
            />
          </View>

          <TouchableHighlight
            style={styles.saveBtn}
            /* onPress={startExercise} */
            underlayColor="#F27A2999">
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
  inputLine: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    borderColor: 'white',
    borderBottomWidth: 2,
    color: 'white',
    alignSelf: 'center',
  },
  inputViewMeasurement: {
    alignSelf: 'center',
    marginTop: 90,
    width: '85%',
  },
  inputText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  saveBtn: {
    marginTop: 140,
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
});

export default EditDetails;