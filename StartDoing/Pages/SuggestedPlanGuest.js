import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaskImageView} from 'react-native-mask-image';
import {createStyles, minWidth, maxWidth} from 'react-native-media-queries';

const Stack = createStackNavigator();
const SuggestedPlanScreenGuest = () => {
  return (
    <Stack.Navigator initialRouteName="SuggestedPlanScreenGuest">
      <Stack.Screen
        options={{headerShown: false}}
        name="SuggestedPlanScreenGuest"
        component={SuggestedPlanScreen}
      />
    </Stack.Navigator>
  );
};

function SuggestedPlanScreen({route}) {
  //navigation variable
  const navigation = useNavigation();

  //state variable
  const [myExcerciseData, setMyExcerciseData] = useState([]);

  //function to randomly select an suggested plan to guest
  function calculateAge() {
    let myData = [];

    const ages = [30, 40, 50, 60];

    let ageParam = ages[Math.floor(Math.random() * ages.length)];

    //API request to get suggested plan
    fetch(
      `https://startdoing.herokuapp.com/default_plans/getdefault/${ageParam}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((result) => {
        result.map((data) => {
          data.exercises.map((exerc) => {
            //API request of suggested plan exercises
            fetch(
              `https://startdoing.herokuapp.com/exercises/${exerc.exercise_id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
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

  useEffect(() => {
    calculateAge();
  }, []);

  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-arrow-left"
            style={styles.arrowLeft}
          />
          <Text style={styles.planNameText}>SUGGESTED PLAN</Text>
        </View>
      </View>

      {/* FlatList of suggested plan exercises */}
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
          </View>
        )}></FlatList>

      <View style={styles.bottomSectionView}>
        <TouchableHighlight
          style={styles.startBtn}
          underlayColor="#F27A2999"
          onPress={() =>
            navigation.navigate('SuggestedExercisesScreenGuest', {
              screen: 'SuggestedExercisesScreenGuest',
              params: {exercises: myExcerciseData},
            })
          }>
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

export default SuggestedPlanScreenGuest;
