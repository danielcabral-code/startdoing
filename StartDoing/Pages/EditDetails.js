import React, {useState, useEffect} from 'react';

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
  const navigation = useNavigation();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [onlyNumbersHeightErrorShow, setOnlyNumbersHeightErrorShow] = useState(
    false,
  );
  const [onlyNumbersWeightErrorShow, setOnlyNumbersWeightErrorShow] = useState(
    false,
  );

  let id = route.params.id;
  let token = route.params.token;

  function getUser() {
    fetch(`https://startdoing.herokuapp.com/getuser/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        result.map((data) => {
          setHeight(data.height);
          setWeight(data.weight);
        });
      })
      .catch((error) => console.log('error', error));
  }

  function validateHeight(height) {
    let numreg = /^[0-9]+$/;
    return numreg.test(height);
  }

  function validateWeight(weight) {
    let numreg = /^[0-9]+$/;
    return numreg.test(weight);
  }

  function editDetails() {
    let saveHeight = '';
    let saveWeight = '';

    if (editWeight.length === 0) {
      console.log(editWeight.length);
      console.log(weight);
      saveWeight = weight;
    } else {
      if (!validateWeight(editWeight)) {
        setOnlyNumbersWeightErrorShow(true);
        return;
      } else {
        setOnlyNumbersWeightErrorShow(false);
      }
      saveWeight = editWeight;
    }

    if (editHeight.length === 0) {
      console.log(editHeight.length);
      console.log(height);
      saveHeight = height;
    } else {
      if (!validateHeight(editHeight)) {
        setOnlyNumbersHeightErrorShow(true);
        return;
      } else {
        setOnlyNumbersHeightErrorShow(false);
      }
      saveHeight = editHeight;
    }

    fetch(`https://startdoing.herokuapp.com/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        height: saveHeight,
        weight: saveWeight,
      }),
    })
      .then((response) => {
        console.log(response.status);
        navigation.navigate('SETTINGS');
      })
      .catch((error) => console.log('error', error));
  }

  useEffect(() => {
    getUser();
  }, [height, weight]);

  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-arrow-left"
            style={styles.arrowLeft}
          />
          <Text style={styles.planNameText}>EDIT WEIGHT & HEIGHT</Text>
        </View>
      </View>

      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.inputViewMeasurement}>
            <Text style={styles.inputText}>INDICATE YOUR WEIGHT IN KG</Text>
            <TextInput
              style={styles.inputLine}
              placeholder={weight.toString()}
              placeholderTextColor="gray"
              onChangeText={(text) => setEditWeight(text)}
              keyboardType="number-pad"
              value={editWeight}
            />
          </View>
          {onlyNumbersWeightErrorShow ? (
            <Text style={styles.textError}>Field Only Accepts Numbers.</Text>
          ) : null}

          <View style={styles.inputViewMeasurement}>
            <Text style={styles.inputText}>INDICATE YOUR HEIGHT IN CM</Text>
            <TextInput
              style={styles.inputLine}
              placeholder={height.toString()}
              placeholderTextColor="gray"
              onChangeText={(text) => setEditHeight(text)}
              keyboardType="numeric"
              value={editHeight}
            />
          </View>
          {onlyNumbersHeightErrorShow ? (
            <Text style={styles.textError}>Field Only Accepts Numbers.</Text>
          ) : null}

          <TouchableHighlight
            style={styles.saveBtn}
            onPress={editDetails}
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
  textError: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'red',
    marginTop: 10,
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
