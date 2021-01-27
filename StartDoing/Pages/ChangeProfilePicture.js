import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import storage from '@react-native-firebase/storage';

const Stack = createStackNavigator();
const ChangeProfilePicture = () => {
  return (
    <Stack.Navigator initialRouteName="ChangeProfilePicturePage">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangeProfilePicture"
        component={ChangeProfilePicturePage}
      />
    </Stack.Navigator>
  );
};

function ChangeProfilePicturePage({ route }) {

  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [photoUrl, setPhotoUrl] = useState()
  const [id, setId] = useState('');
  const [uploadSuccessMensage, setUploadSucessMensage] = useState(false);


  let decoded = ''
  let firebasePhotoLink = ''

  const getToken = async () => {

    try {
      setToken(await AsyncStorage.getItem('@token'))
      if (token !== null) {

        decoded = jwt_decode(token);
        console.log(decoded);
        setPhotoUrl(decoded.data.photoUrl)
        setId(decoded.data.id)

      }

    } catch (e) {

    }

  }
  const options = {
    title: 'Select your photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openPicker = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri
        console.log(source);
        setPhotoUrl(source)
      };


    });
  }

  const savePhoto = async () => {

    const uri = photoUrl;
    console.log(uri);
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('content://', '') : uri;


    const task = storage()
      .ref(filename)
      .putFile(uploadUri)

    try {
      await task;
      let imageRef = storage().ref('/' + filename);
      imageRef
        .getDownloadURL()
        .then((url) => {

          firebasePhotoLink = url

          fetch(`https://startdoing.herokuapp.com/updatephoto/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              photoUrl: firebasePhotoLink,
            }),
          })
            .then((response) => {
              console.log(response.status);

            })
            .catch((error) => console.log('error', error));
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));


    } catch (e) {
      console.error(e);
    }

    console.log(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setUploadSucessMensage(true)

  }

  useEffect(() => {
    getToken()

  }, [token])

  return (
    <>
      <View style={styles.topSectionView}>
        <View style={styles.topBarInfoView}>
          <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
          <Text style={styles.planNameText}>CHANGE PROFILE PHOTO</Text>
        </View>
      </View>

      <ScrollView style={styles.background}>
        <View style={styles.bg2}>
          <TouchableWithoutFeedback
            onPress={openPicker}>
            <View style={styles.profileImageBackground1}>
              <View style={styles.profileImageBackground2}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: photoUrl }} ></Image>
              </View>
            </View>
          </TouchableWithoutFeedback>
         
            {uploadSuccessMensage ? (
              <Text style={styles.textSuccess}>Profile Image Changed! Next Time You Login Into App You Will See The New Photo!</Text>
            ) : null}
      
          <TouchableHighlight
            style={styles.saveBtn}
            underlayColor="#F27A2999"
            onPress={savePhoto}
          >
            <Text style={styles.saveText}>SAVE CHANGES</Text>
          </TouchableHighlight>
          
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#26282B',
  },
  image: {
    marginVertical: 24,
    alignItems: 'center',
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
  profileImageBackground1: {
    width: 273,
    height: 273,
    borderRadius: 150,
    backgroundColor: '#F27A29',
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageBackground2: {
    width: 253,
    height: 253,
    borderRadius: 150,
    backgroundColor: '#26282B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 233,
    height: 233,
    borderRadius: 150,
  },
  saveBtn: {
    marginTop: 100,
    marginBottom: 24,
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
  saveText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    textShadowRadius: 6,
  },
  textSuccess: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'green',
    marginTop: 10,
  },
});

export default ChangeProfilePicture;
