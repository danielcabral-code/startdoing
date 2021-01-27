import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { useNavigation } from '@react-navigation/native';

const Home = ({ navigate }) => {
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [id, setId] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://firebasestorage.googleapis.com/v0/b/startdoing-bd1bc.appspot.com/o/person.jpg?alt=media&token=d201079f-9035-4f11-9421-58d1e9293359')
  const [planOneName, setPlanOneName] = useState('');
  const [planTwoName, setPlanTwoName] = useState('');
  const [stylePlanTwoNonExistent, setStylePlanTwoNonExistent] = useState(true)
  const [stylePlanTwoExistent, setStylePlanTwoExistent] = useState(false)
  const [idPlanOne, setIdPlanOne] = useState('')
  const [idPlanTwo, setIdPlanTwo] = useState('')

  let decoded = ''


  const getToken = async () => {
    let save = []
    try {

      setToken(await AsyncStorage.getItem('@token'))
      if (token !== null) {

        decoded = jwt_decode(token);
        console.log(decoded);

        setEmail(decoded.data.email)
        setName(decoded.data.name)
        setId(decoded.data.id)
        setBirth(decoded.data.birth)
        setPhotoUrl(decoded.data.photoUrl)
        console.log(email, name, id, birth, photoUrl);

      }

      fetch(`https://startdoing.herokuapp.com/user_plans/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${token}`,
        },

      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          save = result
          try {
            const jsonValue = JSON.stringify(save)

            AsyncStorage.setItem('@plans', jsonValue);
            console.log("guardou: ", jsonValue);

          } catch (e) {
            console.log(e);
          }

          if (result.length >= 2) {
            setStylePlanTwoNonExistent(false)
            setStylePlanTwoExistent(true)
            setPlanOneName(result[0].plan_name)
            setIdPlanOne(result[0]._id)
            setPlanTwoName(result[1].plan_name)
            setIdPlanTwo(result[1]._id)

          }
          else {
            setStylePlanTwoNonExistent(true)
            setStylePlanTwoExistent(false)
            setPlanOneName(result[0].plan_name)
            setIdPlanOne(result[0]._id)

          }

        })




        .catch((error) => console.log('error', error));


    } catch (e) {

    }

  }

  useEffect(() => {
    getToken()

  })
  function onPressButton() {
    alert('You Pressed Me!');
  }

  return (
    <>
      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <View style={styles.profileImageBackground1}>
            <View style={styles.profileImageBackground2}>
              <Image
                style={styles.profileImage}
                source={{ uri: photoUrl }}></Image>
            </View>
          </View>

          <Text style={styles.userName}>HI, {name.toUpperCase()}!</Text>

          <TouchableHighlight
            style={styles.planBtn}
            onPress={() => navigation.navigate('UserPlan', {
              screen: 'UserPlan',
              params: { id: idPlanOne, token: token, planName: planOneName }
            })}
            underlayColor="#F27A2999">
            <Text style={styles.planText}>{planOneName}</Text>
          </TouchableHighlight>

          {stylePlanTwoNonExistent ? (
            <TouchableHighlight
              style={styles.unactiveBtn}
              underlayColor="#F27A2999">
              <Text style={styles.unactiveText}>CREATE MORE PLANS </Text>
            </TouchableHighlight>
          ) : null}

          {stylePlanTwoExistent ? (
            <TouchableHighlight
              style={styles.planBtn}
              onPress={() => navigation.navigate('UserPlan', {
                screen: 'UserPlan',
                params: { id: idPlanTwo, token: token, planName: planTwoName }
              })}
              underlayColor="#F27A2999">
              <Text style={styles.planText}>{planTwoName}</Text>
            </TouchableHighlight>
          ) : null}


          <TouchableHighlight
          style={styles.suggestedBtn}
          onPress={() => navigation.navigate('SuggestedPlanScreen',{
            screen: 'SuggestedPlanScreen',
            params: { birth: birth, token: token}
          })}
          underlayColor="#006DA899">
          <Text style={styles.suggestedText}>SUGGESTED TRAINING</Text>
        </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

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
  profileImageBackground1: {
    width: 84,
    height: 84,
    borderRadius: 50,
    backgroundColor: '#F27A29',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageBackground2: {
    width: 78,
    height: 78,
    borderRadius: 50,
    backgroundColor: '#26282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userName: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    marginTop: 6,
    alignSelf: 'center',
  },
  planBtn: {
    marginTop: 38,
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
  planText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  suggestedBtn: {
    marginTop: 38,
    marginBottom: 20,
    width: '85%',
    height: 90.9,
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
  suggestedText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  unactiveBtn: {
    marginTop: 40,
    width: '85%',
    height: 90.9,
    borderRadius: 10,
    backgroundColor: '#F27A2940',
    justifyContent: 'center',
  },
  unactiveText: {
    alignSelf: 'center',
    color: '#FFFFFF40',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
});

export default Home;
