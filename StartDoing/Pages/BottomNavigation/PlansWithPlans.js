import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Plans = () => {
  //navigation variable
  const navigation = useNavigation();

  //state variables
  const [planName, setPlanName] = useState([]);
  const [planCreateEnabler, setPlanCreateEnabler] = useState(false);

  //get plan name from token stored
  const getPlanName = async () => {
    let newData = [];
    const newPlan = await AsyncStorage.getItem('@plans');
    if (newPlan !== null) {
      newData = JSON.parse(newPlan);
      setPlanName(...planName, newData);
    }
  };

  useEffect(() => {
    getPlanName();
  }, []);

  return (
    <>
      <View style={styles.background}>
        <View style={styles.bg2}>
          <TouchableHighlight
            style={[
              planCreateEnabler ? styles.createBtnOpacity : styles.createBtn,
            ]}
            disabled={planCreateEnabler}
            onPress={() => navigation.navigate('CreatePlan')}
            underlayColor="#F27A2999">
            <Text
              style={[
                planCreateEnabler
                  ? styles.createTextOpacity
                  : styles.createText,
              ]}>
              CREATE NEW PLAN
            </Text>
          </TouchableHighlight>

          <View style={styles.customizeTextView}>
            <Text style={styles.customizeText}>CUSTOMIZE PLANS</Text>
          </View>

          <Text style={styles.maxPlansMessage}>
            YOU CAN CREATE UP TO 2 PLANS!
          </Text>
        </View>
      </View>

      {/* FlatList to set plans */}
      <FlatList
        style={styles.background}
        keyExtractor={(item) => item._id}
        data={planName}
        renderItem={({item}) => {
           {/* check plans name array length */}
          if (planName.length >= 2) {
            setPlanCreateEnabler(true);

            return (
              <View style={styles.bg3}>
                <TouchableHighlight
                  style={styles.createBtn}
                  underlayColor="#F27A2999"
                  onPress={() =>
                    navigation.navigate('CustomizeUserPlan', {
                      screen: 'CustomizeUserPlanScreen',
                      params: {planID: item._id},
                    })
                  }>
                  <Text style={styles.createText}>
                    {item.plan_name.toUpperCase()}
                  </Text>
                </TouchableHighlight>
              </View>
            );
          } else {
            return (
              <>
                <View style={styles.bg3}>
                  <TouchableHighlight
                    style={styles.createBtn}
                    underlayColor="#F27A2999"
                    onPress={() =>
                      navigation.navigate('CustomizeUserPlan', {
                        screen: 'CustomizeUserPlanScreen',
                        params: {planID: item._id},
                      })
                    }>
                    <Text style={styles.createText}>
                      {item.plan_name.toUpperCase()}
                    </Text>
                  </TouchableHighlight>

                  <TouchableWithoutFeedback>
                    <View style={styles.unactiveBtn}>
                      <Text style={styles.unactiveText}>
                        TRY CREATING MORE PLANS
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </>
            );
          }
        }}></FlatList>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    backgroundColor: '#26282B',
  },
  bg2: {
    width: '100%',
    alignItems: 'center',
  },
  bg3: {
    width: '100%',
    alignItems: 'center',
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
  createBtnOpacity: {
    marginTop: 38,
    width: '85%',
    height: 90.9,
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
  createText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  createTextOpacity: {
    alignSelf: 'center',
    color: '#FFFFFF85',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
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
  maxPlansMessage: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    marginTop: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Plans;
