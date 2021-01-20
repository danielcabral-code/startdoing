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
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaskImageView} from 'react-native-mask-image';
import {createStyles, minWidth, maxWidth} from 'react-native-media-queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const planID = route.params.planID;
  console.log(planID);

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

           
          </View>
        )}></FlatList>

      <View style={styles.bottomSectionView}>
        <TouchableHighlight style={styles.startBtn} underlayColor="#F27A2999">
          <Text style={styles.startText}>SAVE</Text>
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
  durationText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    textShadowRadius: 6,
    marginTop: 160,
    marginBottom: 20,
  },
});

const base = {
  maskView: {
    height: 178,
    width: '85%',
    marginTop: 10,
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

export default CustomizeUserPlan;
