import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { FlatList } from 'react-native-gesture-handler';
let myData = [];
const Plans = () => {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [plans, setPlans] = useState([]);

  let decoded = ''


  const getToken = async () => {

    try {

      setToken(await AsyncStorage.getItem('@token'))
      if (token !== null) {

        decoded = jwt_decode(token);
        console.log(decoded);


        setId(decoded.data.id)

        console.log(id);

      }
      const newPlan =(await AsyncStorage.getItem('@plans'))
      if (newPlan !== null) {
       setPlans(newPlan)
        console.log("leu ", JSON.parse(plans));
    
      }


    } catch (e) {

    }

  }

  useEffect(() => {
    getToken()
    console.log("tem?",plans);
  },[])





  return (
    <>
      <View style={styles.background}>
        <View style={styles.bg2}>
          <TouchableHighlight
            style={styles.createBtn}

            underlayColor="#F27A2999">
            <Text style={styles.createText}>CREATE NEW PLAN</Text>
          </TouchableHighlight>

          <View style={styles.customizeTextView}>
            <Text style={styles.customizeText}>CUSTOMIZE PLANS</Text>
          </View>
          
          <TouchableWithoutFeedback>
            <View style={styles.unactiveBtn}>
              <Text style={styles.unactiveText}>TRY CREATING MORE PLANS</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <View style={styles.unactiveBtn}>
              <Text style={styles.unactiveText}>TRY CREATING MORE PLANS</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <View style={styles.unactiveBtn}>
              <Text style={styles.unactiveText}>TRY CREATING MORE PLANS</Text>
            </View>
          </TouchableWithoutFeedback>

          {/* <FlatList
            style={styles.background}
            keyExtractor={(item) => {plans[item]._id}}
            data={Object.keys(plans)}
            renderItem={({ item }) => (
              <View>
                <TouchableHighlight
                  style={styles.createBtn}
                  underlayColor="#F27A2999">
                  <Text style={styles.createText}>{plans[item]._id}</Text>
                </TouchableHighlight>
              </View>
            )}></FlatList> */}

        </View>
      </View>
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
    paddingBottom: 72,
  },
  createBtn: {
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
  createText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  customizeTextView: {
    width: '85%',
  },
  customizeText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginTop: 36,
    marginBottom: -4,
    alignSelf: 'flex-start',
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
    fontSize: 14,
  },
});

export default Plans;
