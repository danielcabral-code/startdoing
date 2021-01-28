import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaskImageView} from 'react-native-mask-image';
import {createStyles, minWidth, maxWidth} from 'react-native-media-queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

const CustomizeUserPlan = () => {
  return (
    <Stack.Navigator initialRouteName="CustomizeUserPlanScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="CustomizeUserPlanScreen"
        component={CustomizeUserPlanScreen}
      />
    </Stack.Navigator>
  );
};

function CustomizeUserPlanScreen({route}) {
  //navigation variable
  const navigation = useNavigation();

  //state variables
  const [token, setToken] = useState('');
  const [myExcerciseData, setMyExcerciseData] = useState([]);
  const [planName, setPlanName] = useState();
  const [exerciseID, setExerciseID] = useState('');
  const [modalRemoveVisibility, setModalRemoveVisibility] = useState(false);
  const [modalChangeDurationVisibility, setModalChangeDurationVisibility] = useState(false);
  const [modalDeletePlanVisibility, setModalDeletePlanVisibility] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState([]);
  const [editDuration, setEditDuration] = useState('');
  const [editPlanName, setEditPlanName] = useState('');
  const [invalidDurationErrorShow, setInvalidDurationErrorShow] = useState(false);
  const [removerExerciseErrorShow, setRemoveExerciseErrorShow] = useState(false);

  //receive plan id via param
  const planID = route.params.planID;

  //get stored token
  const getToken = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'));

      if (token !== null) {
        let myData = [];
        //request plan by plan id
        fetch(`https://startdoing.herokuapp.com/user_plans/plan/${planID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            result.map((result, index) => {
              //set variables with plan name and exercises durations
              setPlanName(result.plan_name);
              setExerciseDuration(result.exercises);

              result.exercises.map((data) => {
                //request exercises that plan contains by id
                fetch(
                  `https://startdoing.herokuapp.com/exercises/${data.exercise_id}`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                  .then((response) => response.json())
                  .then((result) => {
                    //set the exercises array that will be used in FlatList
                    myData.push(result);
                    setMyExcerciseData(...myExcerciseData, myData);
                  })

                  .catch((error) => console.log('error', error));
              });
            });
          })

          .catch((error) => console.log('error', error));
      }
    } catch (e) {}
  };

  //show remove exercise modal
  function removeExerciseModal(id) {
    setExerciseID(id);
    setModalRemoveVisibility(!modalRemoveVisibility);
  }

  //show edit duration modal
  function editDurationModal(id) {
    setExerciseID(id);
    setModalChangeDurationVisibility(!modalChangeDurationVisibility);
  }

  //show delete plan modal
  const deletePlanModal = () => {
    setModalDeletePlanVisibility(!modalDeletePlanVisibility);
  };

  //function to delete plan
  const deletePlan = () => {
    //delete plan using the value received from param
    fetch(`https://startdoing.herokuapp.com/user_plans/${planID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        navigation.navigate('HOME');
      })

      .catch((error) => console.log('error', error));
  };

  //function to delete exercise from user plan
  const deleteExercise = (exerc) => {
    //check exercises length, if exist only one, user can't remove
    if (exerciseDuration.length <= 1) {
      setRemoveExerciseErrorShow(true);
    } else {
      setRemoveExerciseErrorShow(false);
      let arrayToRemoveDB = [...exerciseDuration];
      let arrayToRemoveFlatList = [...myExcerciseData];

      //array to remove from database
      const removeExerciseDB = arrayToRemoveDB.filter(
        (task) => task.exercise_id !== exerc,
      );

      //array to remove from FlatList
      const removeExerciseFL = arrayToRemoveFlatList.filter(
        (task) => task._id !== exerc,
      );

      setExerciseDuration(removeExerciseDB);
      setMyExcerciseData(removeExerciseFL);
      setModalRemoveVisibility(false);
    }
  };

  //function to edit user plan exercises duration
  const editExerciseDuration = (exerc, value) => {
    //check if duration is a valid number
    function validateDuration(time) {
      let numreg = /^[0-9]+$/;
      return numreg.test(time);
    }

    if (value <= 0) {
      setInvalidDurationErrorShow(true);
    } else if (!validateDuration(value)) {
      setInvalidDurationErrorShow(true);
    } else {
      setInvalidDurationErrorShow(false);
      let arrayToEditDuration = [...exerciseDuration];

      const elementsIndex = exerciseDuration.findIndex(
        (element) => element.exercise_id === exerc,
      );

      arrayToEditDuration[elementsIndex] = {
        ...arrayToEditDuration[elementsIndex],
        exercise_duration: value,
      };
      setExerciseDuration(arrayToEditDuration);
      setModalChangeDurationVisibility(false);
    }
  };

  //function to save plan changes
  function savePlanModal() {
    //variable to receive the new plan name if user change it
    let planNameEdited = '';

    //check if user changed the plan name
    if (editPlanName.length > 0) {
      planNameEdited = editPlanName;
      setEditPlanName('');

      //request API to save changes
      fetch(`https://startdoing.herokuapp.com/user_plans/${planID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          plan_name: planNameEdited.toUpperCase(),
          exercises: exerciseDuration,
        }),
      })
        .then((response) => {
          navigation.navigate('HOME');
        })
        .catch((error) => console.log('error', error));
    } else {
      //request API to save changes
      fetch(`https://startdoing.herokuapp.com/user_plans/${planID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          plan_name: planName,
          exercises: exerciseDuration,
        }),
      })
        .then((response) => {
          navigation.navigate('HOME');
        })
        .catch((error) => console.log('error', error));
    }
  }

  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(() => {}, [myExcerciseData, exerciseDuration]);

  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-arrow-left"
            style={styles.arrowLeft}
          />
          <Text style={styles.planNameText}>{planName}</Text>
        </View>
      </View>

      <View style={styles.background}>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>CHANGE PLAN NAME</Text>
          <TextInput
            style={styles.inputLine}
            onChangeText={(text) => setEditPlanName(text)}
            value={editPlanName}
          />
        </View>

        <FlatList
          style={styles.flatlistBackground}
          keyExtractor={(item) => item.exerciseName}
          data={myExcerciseData}
          renderItem={({item, index}) => (
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

              <Text style={styles.durationText}>
                {'DURATION: ' +
                  exerciseDuration[index].exercise_duration +
                  ' ' +
                  'SECONDS'}
              </Text>

              <View style={styles.editButtonsView}>
                <TouchableHighlight
                  style={styles.removeBtn}
                  onPress={() => removeExerciseModal(item._id)}
                  underlayColor="#FF000099">
                  <Text style={styles.removeText}>REMOVE EX.</Text>
                </TouchableHighlight>

                <TouchableWithoutFeedback
                  onPress={() => editDurationModal(item._id)}>
                  <View style={styles.editDurationBtn}>
                    <Text style={styles.editDurationText}>EDIT DURATION</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}></FlatList>

        <Modal
          isVisible={modalRemoveVisibility}
          hideModalContentWhileAnimating={true}
          onBackdropPress={() => setModalRemoveVisibility(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ARE YOU SURE YOU WANT TO REMOVE
            </Text>
            <Text style={styles.modalText}>THIS EXERCISE?</Text>
            {removerExerciseErrorShow ? (
              <Text style={styles.modalTextError}>
                You Must Have at Least 1 Exercise.
              </Text>
            ) : null}

            <View style={styles.modalButtonsView}>
              <TouchableHighlight
                style={styles.modalRemoveBtn}
                onPress={() => deleteExercise(exerciseID)}
                underlayColor="#FF000099">
                <Text style={styles.modalRemoveText}>REMOVE EX.</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.modalCancelBtn}
                onPress={() => setModalRemoveVisibility(false)}
                underlayColor="#006DA899">
                <Text style={styles.modalCancelText}>CANCEL</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={modalChangeDurationVisibility}
          hideModalContentWhileAnimating={true}
          onBackdropPress={() => setModalChangeDurationVisibility(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>CHANGE DURATION</Text>
            <TextInput
              style={styles.modalInputLine}
              onChangeText={(text) => setEditDuration(text)}
              keyboardType="numeric"
              value={editDuration}
            />
            {invalidDurationErrorShow ? (
              <Text style={styles.modalTextErrorDuration}>
                Exercise Duration is too Short.
              </Text>
            ) : null}

            <View style={styles.modalButtonsView}>
              <TouchableWithoutFeedback
                onPress={() => editExerciseDuration(exerciseID, editDuration)}>
                <View style={styles.modalChangeDurationBtn}>
                  <Text style={styles.modalChangeDurationText}>CHANGE</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableHighlight
                style={styles.modalCancelBtn}
                onPress={() => setModalChangeDurationVisibility(false)}
                underlayColor="#006DA899">
                <Text style={styles.modalCancelText}>CANCEL</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={modalDeletePlanVisibility}
          hideModalContentWhileAnimating={true}
          onBackdropPress={() => setModalDeletePlanVisibility(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ARE YOU SURE YOU WANT TO DELETE
            </Text>
            <Text style={styles.modalText}>THIS PLAN?</Text>

            <View style={styles.modalButtonsView}>
              <TouchableHighlight
                style={styles.modalRemoveBtn}
                onPress={deletePlan}
                underlayColor="#FF000099">
                <Text style={styles.modalRemoveText}>DELETE</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.modalCancelBtn}
                onPress={() => setModalDeletePlanVisibility(false)}
                underlayColor="#006DA899">
                <Text style={styles.modalCancelText}>CANCEL</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.bottomSectionView}>
        <View style={styles.bottomButtonsBigView}>
          <View style={styles.bottomButtonsView}>
            <TouchableHighlight
              style={styles.deleteBtn}
              onPress={deletePlanModal}
              underlayColor="#FF000099">
              <Text style={styles.deleteText}>DELETE</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.startBtn}
              onPress={savePlanModal}
              underlayColor="#F27A2999">
              <Text style={styles.startText}>SAVE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
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
  flatlistBackground: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#26282B',
  },
  topSectionView: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
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
  inputLine: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    borderColor: 'white',
    borderBottomWidth: 2,
    color: 'white',
    alignSelf: 'center',
  },
  bottomSectionView: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
  },
  deleteBtn: {
    width: '48%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FF0000',
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
  deleteText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  startBtn: {
    width: '48%',
    marginLeft: '4%',
    height: 50,
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
  startText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textShadowRadius: 6,
  },
  editButtonsView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  bottomButtonsBigView: {
    width: '85%',
  },
  bottomButtonsView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  removeBtn: {
    width: '48%',
    height: 40,
    marginTop: -6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#FF0000',
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
  removeText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    textShadowRadius: 6,
  },
  editDurationBtn: {
    marginTop: 20,
    width: '48%',
    marginTop: -16,
    marginLeft: '4%',
    alignSelf: 'flex-end',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#26282B',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  editDurationText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
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
  durationText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    textShadowRadius: 6,
    marginTop: 160,
    marginBottom: 20,
  },
  modalView: {
    alignSelf: 'center',
    height: 145,
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#26282B',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
  },
  modalButtonsView: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  modalText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    alignSelf: 'center',
  },
  modalTextError: {
    color: 'red',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    marginTop: 6,
    marginBottom: -6,
    alignSelf: 'center',
  },
  modalTextErrorDuration: {
    color: 'red',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    marginTop: 4,
    marginBottom: -16,
    alignSelf: 'center',
  },
  modalRemoveBtn: {
    width: '48%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FF0000',
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
  modalRemoveText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    textShadowRadius: 6,
  },
  modalCancelBtn: {
    width: '48%',
    marginLeft: '4%',
    height: 40,
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
  modalCancelText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    textShadowRadius: 6,
  },
  modalChangeDurationBtn: {
    width: '48%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#26282B',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  modalChangeDurationText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  modalInputLine: {
    width: '30%',
    height: 40,
    alignSelf: 'center',
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    alignSelf: 'center',
  },
});

const base = {
  maskView: {
    height: 178,
    width: '85%',
    marginTop: 10,
    marginBottom: 120,
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

export default CustomizeUserPlan;
