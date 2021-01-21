import React, {useState, useEffect, Component} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
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
import jwt_decode from 'jwt-decode';

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
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [myExcerciseData, setMyExcerciseData] = useState([]);
  const [planName, setPlanName] = useState();
  const [exerciseID, setExerciseID] = useState('');

  const [modalRemoveVisibility, setModalRemoveVisibility] = useState(false);

  const [
    modalChangeDurationVisibility,
    setModalChangeDurationVisibility,
  ] = useState(false);

  const [modalDeletePlanVisibility, setModalDeletePlanVisibility] = useState(
    false,
  );

  const planID = route.params.planID;

  const getToken = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'));
      console.log('TOKEN ', token);
      if (token !== null) {
        let myData = [];

        fetch(`https://startdoing.herokuapp.com/user_plans/plan/${planID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            result.map((result) => {
              setPlanName(result.plan_name);
              result.exercises.map((data) => {
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

  function onPressButton() {
    alert('You Pressed Me!');
  }

  function removeExerciseModal(id) {
    console.log(id);
    setExerciseID(id);
    setModalRemoveVisibility(!modalRemoveVisibility);
  }

  function editDurationModal() {
    setModalChangeDurationVisibility(!modalChangeDurationVisibility);
  }

  const deletePlanModal = () => {
    setModalDeletePlanVisibility(!modalDeletePlanVisibility);
  };

  const deletePlan = () => {
    fetch(`https://startdoing.herokuapp.com/user_plans/${planID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        navigation.navigate('HOME');
      })

      .catch((error) => console.log('error', error));
  };

  const deleteExercise = (exerc) => {
    console.log('teste ', exerc);

    let newArray = [...myExcerciseData];
    console.log(newArray);

   const removeExercise= newArray.filter((task) => task._id !== exerc);
    console.log(removeExercise);
    setMyExcerciseData(removeExercise)
    setModalRemoveVisibility(false)
  };

  function savePlanModal() {
    fetch(`https://startdoing.herokuapp.com/user_plans/${planID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        exercises: myExcerciseData,
      }),
    })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => console.log('error', error));
  }

  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(() => {
    console.log('updated data');
    console.log(myExcerciseData);
  }, [myExcerciseData]);

  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
          <Text style={styles.planNameText}>{planName}</Text>
        </View>
      </View>

      <View style={styles.background}>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>CHANGE PLAN NAME</Text>
          <TextInput style={styles.inputLine} />
        </View>

        <FlatList
          style={styles.background}
          keyExtractor={(item) => item.exerciseName}
          data={myExcerciseData}
          renderItem={({item}) => (
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
                {'DURATION: ' + item.duration + ' ' + 'SECONDS'}
              </Text>

              <View style={styles.editButtonsView}>
                <TouchableHighlight
                  style={styles.removeBtn}
                  onPress={() => removeExerciseModal(item._id)}
                  underlayColor="#FF000099">
                  <Text style={styles.removeText}>REMOVE EX.</Text>
                </TouchableHighlight>

                <TouchableWithoutFeedback onPress={editDurationModal}>
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
            <TextInput style={styles.modalInputLine} />

            <View style={styles.modalButtonsView}>
              <TouchableWithoutFeedback onPress={onPressButton}>
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
  topSectionView: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
  },
  inputView: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 20,
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
