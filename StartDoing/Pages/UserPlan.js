import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaskImageView} from 'react-native-mask-image';
import {createStyles, minWidth, maxWidth} from 'react-native-media-queries';

const Stack = createStackNavigator();
const UserPlans = () => {
  return (
    <Stack.Navigator initialRouteName="UserPlan">
      <Stack.Screen
        options={{headerShown: false}}
        name="UserPlan"
        component={UserPlan}
      />
    </Stack.Navigator>
  );
};

function UserPlan({route}) {
  const id = route.params.id;
  const token = route.params.token;
  //console.log(id, token);
  let myData = {};

  function onPressButton() {
    alert('You Pressed Me!');
  }

  function getExercises() {
    fetch(`https://startdoing.herokuapp.com/user_plans/plan/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        result.map((result) => {
          //console.log(result.exercises);
          result.exercises.map((data) => {
            //console.log(data.exercise_id);
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
                myData = result;
                console.log(myData.exerciseName);
                /*  console.log(result);
                console.log(result.exerciseName);
                console.log(result.videoUrl); */
              })

              .catch((error) => console.log('error', error));
          });
        });
      })

      .catch((error) => console.log('error', error));
  }

  useEffect(() => {
    getExercises();
  });

  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
          <Text style={styles.planNameText}>TRAINING PLAN NAME</Text>
        </View>
      </View>

      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={stylesMediaQueries.maskView}>
            <MaskImageView
              urlImage={
                'https://firebasestorage.googleapis.com/v0/b/startdoing-bd1bc.appspot.com/o/CHEST%20-%20PUSH%20UP%20-%20ov%2030.png?alt=media&token=82b03b7d-d935-450f-ae48-c12f88a836c9'
              }
              urlMask={'https://i.imgur.com/NDpYsdD.png'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <Text style={stylesMediaQueries.exerciseText}>EXERCISE EX</Text>
          </View>

          <View style={stylesMediaQueries.maskView}>
            <MaskImageView
              urlImage={
                'https://firebasestorage.googleapis.com/v0/b/startdoing-bd1bc.appspot.com/o/CHEST%20-%20PUSH%20UP%20-%20ov%2030.png?alt=media&token=82b03b7d-d935-450f-ae48-c12f88a836c9'
              }
              urlMask={'https://i.imgur.com/NDpYsdD.png'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <Text style={stylesMediaQueries.exerciseText}>EXERCISE EX</Text>
          </View>

          <View style={stylesMediaQueries.maskView}>
            <MaskImageView
              urlImage={
                'https://firebasestorage.googleapis.com/v0/b/startdoing-bd1bc.appspot.com/o/CHEST%20-%20PUSH%20UP%20-%20ov%2030.png?alt=media&token=82b03b7d-d935-450f-ae48-c12f88a836c9'
              }
              urlMask={'https://i.imgur.com/NDpYsdD.png'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <Text style={stylesMediaQueries.exerciseText}>EXERCISE EX</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSectionView}>
        <TouchableHighlight
          style={styles.startBtn}
          onPress={onPressButton}
          underlayColor="#F27A2999">
          <Text style={styles.startText}>START</Text>
        </TouchableHighlight>
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
  bottomSectionView: {
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26282B',
  },
  startBtn: {
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
  startText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
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
});

const base = {
  maskView: {
    height: 178,
    width: '85%',
    marginTop: 10,
    marginBottom: 14,
    alignItems: 'center',
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

export default UserPlans;
