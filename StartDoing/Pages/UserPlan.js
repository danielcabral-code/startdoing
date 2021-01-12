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
 let myData ={}

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
                
                myData=result
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

  return(
     <>
     <Text>hello</Text>
     </>
  )
}

export default UserPlans;
