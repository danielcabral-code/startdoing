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
  const navigation = useNavigation();

  const [token, setToken] = useState('');

  const [displayExerGroups, setDisplayExerGroups] = useState(false);
  const [numberForGroups, setNumberForGroups] = useState(1);

  const [exercises, setExercises] = useState([]);
  const [numberForExercises, setNumberForExercises] = useState(1);

  const [currentExerciseCategory, setCurrentExerciseCategory] = useState('');

  const [modalGroupVisibility, setModalGroupVisibility] = useState(false);

  const [planBeingCreatedExercises, setPlanBeingCreatedExercises] = useState(
    [],
  );

  const [planBeingCreatedFlatlist, setPlanBeingCreatedFlatlist] = useState([]);

  const [exerciseID, setExerciseID] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState();
  const [exerciseName, setExerciseName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [planName, setPlanName] = useState('');

  const [modalRemoveVisibility, setModalRemoveVisibility] = useState(false);
  const [
    modalChangeDurationVisibility,
    setModalChangeDurationVisibility,
  ] = useState(false);
  const [editDuration, setEditDuration] = useState('');

  const [numberForSave, setNumberForSave] = useState(1);
  const [saveEnabler, setSaveEnabler] = useState(true);

  const [editPlanName, setEditPlanName] = useState('');
  const [id, setId] = useState('');

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
      setId(decoded.data.id);
      console.log('dawd', id);
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
  });

  useEffect(() => {
    /* console.log('updated data');

    console.log('meus', exercises); */
  }, [exercises]);

  const selectExercise = (id, duration, exerciseName, videoUrl) => {
    setExerciseID(id);
    setExerciseDuration(duration);

    setExerciseName(exerciseName);
    setVideoUrl(videoUrl);

    let exercisesArr = {
      exercise_id: id,
      exercise_duration: duration,
    };

    let exercisesArrFlatlist = {
      exercise_name: exerciseName,
      exercise_duration: duration,
      exercise_videoUrl: videoUrl,
    };

    /* console.log(exercisesArr); */

    setPlanBeingCreatedExercises((planBeingCreatedExercises) => [
      ...planBeingCreatedExercises,
      exercisesArr,
    ]);

    setPlanBeingCreatedFlatlist((planBeingCreatedFlatlist) => [
      ...planBeingCreatedFlatlist,
      exercisesArrFlatlist,
    ]);

    /* console.log(planBeingCreatedExercises); */
  };

  useEffect(() => {
    /* console.log('updated data');

    console.log(planBeingCreatedExercises); */

    if (planBeingCreatedFlatlist.length >= 1) {
      setSaveEnabler(false);
    } else if (planBeingCreatedFlatlist.length < 1) {
      setSaveEnabler(true);
    }
  }, [planBeingCreatedExercises]);

  function removeExerciseModal(id) {
    /* console.log('vvv', id); */
    setExerciseID(id);
    setModalRemoveVisibility(!modalRemoveVisibility);
  }

  function editDurationModal(id) {
    console.log(id);
    setExerciseID(id);
    setModalChangeDurationVisibility(!modalChangeDurationVisibility);
  }

  const deleteExercise = (exerc) => {
    /* console.log('teste ', exerc); */

    let arrayToRemoveFlatList = [...planBeingCreatedFlatlist];

    const removeExerciseFL = arrayToRemoveFlatList.filter(
      (task) => task.exercise_name !== exerc,
    );

    /* console.log('removido', removeExerciseFL); */

    setPlanBeingCreatedFlatlist(removeExerciseFL);
    setModalRemoveVisibility(false);
  };

  const editExerciseDuration = (exerc, value) => {
    /* console.log('teste ', exerc, value); */
    let arrayToEditDuration = [...planBeingCreatedFlatlist];
    let arrayToEditDurationPlan = [...planBeingCreatedExercises];
    /* console.log(arrayToEditDuration); */

    /*   const editDuration = arrayToEditDuration.filter((task) => task.exercise_id === exerc);
    console.log(editDuration); */

    const elementsIndex = planBeingCreatedFlatlist.findIndex(
      (element) => element.exercise_name === exerc,
    );

    /* console.log(elementsIndex); */

    arrayToEditDuration[elementsIndex] = {
      ...arrayToEditDuration[elementsIndex],
      exercise_duration: value,
    };

    arrayToEditDurationPlan[elementsIndex] = {
      ...arrayToEditDurationPlan[elementsIndex],
      exercise_duration: value,
    };

    setPlanBeingCreatedFlatlist(arrayToEditDuration);
    setPlanBeingCreatedExercises(arrayToEditDurationPlan);
    /* console.log('mudado: ', planBeingCreatedFlatlist); */
    setModalChangeDurationVisibility(false);
  };

  function savePlanModal() {
    /* console.log(planBeingCreatedFlatlist.length); */

    console.log(editPlanName.length);
    let planNameEdited = '';

    if (editPlanName.length > 0) {
      planNameEdited = editPlanName;
      setEditPlanName('');

      fetch(`https://startdoing.herokuapp.com/user_plans/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          plan_name: planNameEdited.toUpperCase(),
          user_id: id,
          exercises: planBeingCreatedExercises,
        }),
      })
        .then((response) => {
          console.log(response.status);
          navigation.navigate('HOME');
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
              onChangeText={(text) => setEditPlanName(text)}
              value={editPlanName}
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

        <FlatList
          style={[
            displayExerGroups ? styles.backgroundOpacity : styles.background,
          ]}
          keyExtractor={(item) => item.exercise_name}
          data={planBeingCreatedFlatlist}
          renderItem={({item, index}) => (
            <View style={stylesMediaQueries.maskView}>
              <MaskImageView
                urlImage={planBeingCreatedFlatlist[index].exercise_videoUrl}
                urlMask={'https://i.imgur.com/NDpYsdD.png'}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              <Text style={stylesMediaQueries.exerciseText}>
                {planBeingCreatedFlatlist[index].exercise_name}
              </Text>

              <Text style={styles.durationText}>
                {'DURATION: ' +
                  planBeingCreatedFlatlist[index].exercise_duration +
                  ' ' +
                  'SECONDS'}
              </Text>

              <View style={styles.editButtonsView}>
                <TouchableHighlight
                  style={styles.removeBtn}
                  onPress={() => removeExerciseModal(item.exercise_name)}
                  underlayColor="#FF000099">
                  <Text style={styles.removeText}>REMOVE EX.</Text>
                </TouchableHighlight>

                <TouchableWithoutFeedback
                  onPress={() => editDurationModal(item.exercise_name)}>
                  <View style={styles.editDurationBtn}>
                    <Text style={styles.editDurationText}>EDIT DURATION</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}></FlatList>
      </ScrollView>

      <View
        style={[
          displayExerGroups
            ? styles.bottomSectionViewOpacity
            : styles.bottomSectionView,
        ]}>
        <TouchableHighlight
          style={[saveEnabler ? styles.saveBtnOpacity : styles.saveBtn]}
          underlayColor="#F27A2999"
          disabled={saveEnabler}
          onPress={savePlanModal}>
          <Text
            style={[saveEnabler ? styles.saveTextOpacity : styles.saveText]}>
            SAVE NEW PLAN
          </Text>
        </TouchableHighlight>
      </View>

      <Modal
        isVisible={modalGroupVisibility}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => {
          setModalGroupVisibility(false);
          setExercises([]);
        }}>
        <View style={styles.modalViewExercises}>
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
                  selectExercise(
                    item._id,
                    item.duration,
                    item.exerciseName,
                    item.videoUrl,
                  );
                }}>
                <View style={stylesMediaQueries.maskViewModal}>
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

      <Modal
        isVisible={modalRemoveVisibility}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => setModalRemoveVisibility(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>ARE YOU SURE YOU WANT TO REMOVE</Text>
          <Text style={styles.modalText}>THIS EXERCISE?</Text>

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
    flex: 1,
    width: '100%',
    backgroundColor: '#26282B',
  },
  backgroundFlatListOpacity: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2F3032',
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
  modalViewExercises: {
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
  durationText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    textShadowRadius: 6,
    marginTop: 160,
    marginBottom: 20,
  },
  editButtonsView: {
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
  bottomSectionView: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
  },
  bottomSectionViewOpacity: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F3032',
  },
  saveBtn: {
    width: '85%',
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
  saveBtnOpacity: {
    width: '85%',
    height: 50,
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
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  saveTextOpacity: {
    alignSelf: 'center',
    color: '#FFFFFF85',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
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

  maskViewModal: {
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

    maskViewModal: {
      width: 360,
    },
  }),
);

export default CreatePlans;
