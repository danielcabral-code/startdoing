import React, {useState, useEffect, Component} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaskImageView} from 'react-native-mask-image';
import {createStyles, minWidth, maxWidth} from 'react-native-media-queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import jwt_decode from 'jwt-decode';

const Stack = createStackNavigator();
const CreatePlans = () => {
  return (
    <Stack.Navigator initialRouteName="CreatePlan">
      <Stack.Screen
        options={{headerShown: false}}
        name="CreatePlan"
        component={CreatePlan}
      />
    </Stack.Navigator>
  );
};

function CreatePlan() {
  const [token, setToken] = useState('');

  const [displayExerGroups, setDisplayExerGroups] = useState(false);
  const [numberForGroups, setNumberForGroups] = useState(1);
  const [exercises, setExercises] = useState([]);

  const [modalGroupVisibility, setModalGroupVisibility] = useState(false);

  const [planBeingCreatedExercises, setPlanBeingCreatedExercises] = useState([]);

  const [exerciseID, setExerciseID] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState();

  const [planName, setPlanName] = useState('');

  const chest = 'CHEST';
  const core = 'CORE';
  const back = 'BACK';
  const legs = 'LEGS';

  let decoded = '';

  function displayExerciseGroups() {
    if (numberForGroups === 1) {
      setDisplayExerGroups(true);
      setNumberForGroups(2);
    } else if (numberForGroups === 2) {
      setDisplayExerGroups(false);
      setNumberForGroups(1);
    }
  }

  async function getToken() {
    try {
      setToken(await AsyncStorage.getItem('@token'));
      decoded = jwt_decode(token);
    } catch (e) {}
  }

  function displayExercises(category) {
    let myData = [];

    if (token !== null) {
      fetch(`https://startdoing.herokuapp.com/exercises/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          myData = result;

          setExercises(...exercises, myData);

          setModalGroupVisibility(!modalGroupVisibility);
        })
        .catch((error) => console.log('error', error));
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    console.log('updated data');

    console.log('meus', exercises);
  }, [exercises]);

  const selectExercise = (id, duration) => {
    setExerciseID(id);
    setExerciseDuration(duration);
  };

  return (
    <>
      <View
        style={[
          displayExerGroups
            ? styles.topSectionViewOpacity
            : styles.topSectionView,
        ]}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons
            name="keyboard-arrow-left"
            style={[
              displayExerGroups ? styles.arrowLeftOpacity : styles.arrowLeft,
            ]}
          />
          <Text
            style={[
              displayExerGroups
                ? styles.planNameTextOpacity
                : styles.planNameText,
            ]}>
            NEW PLAN
          </Text>
        </View>
      </View>

      <ScrollView
        style={[
          displayExerGroups ? styles.backgroundOpacity : styles.background,
        ]}>
        <View style={styles.bg2}>
          <View style={styles.inputView}>
            <Text
              style={[
                displayExerGroups ? styles.inputTextOpacity : styles.inputText,
              ]}>
              NAME YOUR PLAN
            </Text>
            <TextInput
              style={[
                displayExerGroups ? styles.inputLineOpacity : styles.inputLine,
              ]}
              onChangeText={(text) => setPlanName(text)}
            />
          </View>

          <TouchableHighlight
            style={[
              displayExerGroups
                ? styles.addExerciseBtnOpacity
                : styles.addExerciseBtn,
            ]}
            underlayColor="#F27A2999"
            onPress={displayExerciseGroups}>
            <Text
              style={[
                displayExerGroups
                  ? styles.addExerciseTextOpacity
                  : styles.addExerciseText,
              ]}>
              ADD EXERCISE
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              displayExerGroups ? styles.exerciseBtn1 : styles.noExerciseBtn1,
            ]}
            underlayColor="#F27A2999"
            onPress={() => displayExercises(chest)}>
            <Text style={styles.exerciseText1}>CHEST</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              displayExerGroups ? styles.exerciseBtn : styles.noExerciseBtn,
            ]}
            underlayColor="#F27A2999"
            onPress={() => displayExercises(core)}>
            <Text style={styles.exerciseText}>CORE</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              displayExerGroups ? styles.exerciseBtn : styles.noExerciseBtn,
            ]}
            underlayColor="#F27A2999"
            onPress={() => displayExercises(back)}>
            <Text style={styles.exerciseText}>BACK</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              displayExerGroups ? styles.exerciseBtn : styles.noExerciseBtn,
            ]}
            underlayColor="#F27A2999"
            onPress={() => displayExercises(legs)}>
            <Text style={styles.exerciseText}>LEGS</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

      <Modal
        isVisible={modalGroupVisibility}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => {
          setModalGroupVisibility(false);
          setExercises([]);
        }}>
        <View style={styles.modalView}>
          <FlatList
            style={styles.backgroundFlatlist}
            keyExtractor={(item) => item.exerciseName}
            data={exercises}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setModalGroupVisibility(false);
                  setExercises([]);

                  setExerciseDuration(item.duration);
                  selectExercise(item._id, item.duration);
                }}>
                <View style={stylesMediaQueries.maskView}>
                  <MaskImageView
                    urlImage={item.videoUrl}
                    urlMask={'https://i.imgur.com/NDpYsdD.png'}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Text style={stylesMediaQueries.exerciseText}>
                    {item.exerciseName}
                  </Text>
                </View>
              </TouchableOpacity>
            )}></FlatList>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#26282B',
  },
  backgroundOpacity: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2F3032',
  },
  backgroundFlatList: {
    width: '100%',
    backgroundColor: '#26282B',
  },
  bg2: {
    flex: 1,
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
  topSectionViewOpacity: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F3032',
  },
  arrowLeft: {
    fontSize: 50,
    color: '#F27A29',
    marginLeft: -20,
    alignSelf: 'flex-start',
  },
  arrowLeftOpacity: {
    fontSize: 50,
    color: '#F27A2980',
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
  planNameTextOpacity: {
    color: '#FFFFFF85',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginLeft: 6,
    alignSelf: 'center',
  },
  topBarInfoView: {
    width: '85%',
    flexDirection: 'row',
  },
  inputView: {
    alignSelf: 'center',
    marginTop: 30,
    width: '85%',
  },
  inputText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  inputTextOpacity: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#FFFFFF85',
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
  inputLineOpacity: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    borderColor: '#FFFFFF85',
    borderBottomWidth: 2,
    color: 'white',
    alignSelf: 'center',
  },
  addExerciseBtn: {
    width: '85%',
    height: 50,
    marginTop: 50,
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
  addExerciseBtnOpacity: {
    width: '85%',
    height: 50,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: '#F27A2980',
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
  addExerciseText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  addExerciseTextOpacity: {
    alignSelf: 'center',
    color: '#FFFFFF85',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  exerciseBtn1: {
    width: '85%',
    height: 50,
    marginTop: 50,
    marginBottom: 24,
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
  exerciseText1: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  noExerciseBtn1: {
    display: 'none',
  },
  exerciseBtn: {
    width: '85%',
    height: 50,
    marginTop: 10,
    marginBottom: 24,
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
  exerciseText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  noExerciseBtn: {
    display: 'none',
  },
  modalView: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#26282B',
    borderWidth: 1,
    borderColor: 'white',
  },
});

const base = {
  maskView: {
    height: 178,
    width: '85%',
    marginTop: 14,
    marginBottom: 14,
    alignItems: 'center',
    alignSelf: 'center',
  },

  exerciseText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginTop: -172,
    marginRight: '-62%',
  },
};

const stylesMediaQueries = createStyles(
  base,

  // override styles only if screen width is less than 320
  maxWidth(320, {
    exerciseText: {
      fontSize: 12,
      marginTop: -168,
    },
  }),

  // override styles only if screen width is more than 500
  minWidth(480, {
    maskView: {
      width: 360,
    },
  }),
);

export default CreatePlans;
