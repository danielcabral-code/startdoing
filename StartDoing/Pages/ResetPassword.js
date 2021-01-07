import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { LogoWithText } from '../Components/LogoWithText';

const Stack = createStackNavigator();
const ResetPassword = () => {

    return (

        <Stack.Navigator initialRouteName="ResetPassword">
            <Stack.Screen
                options={{ headerShown: false }}
                name="ResetPassword"
                component={ResetPasswordScreen}
            />

        </Stack.Navigator>

    );
};

function ResetPasswordScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailErrorShow, setEmailErrorShow] = useState(false);
    const [invalidEmailErrorShow, setInvalidEmailErrorShow] = useState(false);
    const [unknownEmail, setUnknownEmail] = useState(false);
    const [passwordErrorShow, setPasswordErrorShow] = useState(false);
    const [confirmPasswordErrorShow, setConfirmpasswordErrorShow] = useState(false);


    validateEmail = (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    function checkRegisterInputs() {

        let code = 0


        if (!email || email.trim() === '') {
            setEmailErrorShow(true)
            return;
        }
        else {
            setEmailErrorShow(false)
        }

        if (!validateEmail(email)) {
            setInvalidEmailErrorShow(true)
            return
        }
        else {
            setInvalidEmailErrorShow(false)
        }

        if (!password || password.trim() === '') {
            setPasswordErrorShow(true)
            return;
        }
        else {
            setPasswordErrorShow(false)
        }

        if (!repeatPassword || repeatPassword.trim() === '') {
            setConfirmpasswordErrorShow(true)
            return;
        }
        else {
            setConfirmpasswordErrorShow(false)
        }

        if (password !== repeatPassword) {
            setConfirmpasswordErrorShow(true)
            return;
        }

        fetch('https://startdoing.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
            })

        })
            .then(response => {

                code = JSON.stringify(response.status)

                if (code == 406) {

                    fetch(`https://startdoing.herokuapp.com/${email}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidGVzdGluZ0BlbWFpbC5jb20iLCJpZCI6IjVmZGQzYzZkOGE2YWNlMjg2MDE0MGUwYSIsIm5hbWUiOiJ0ZXN0aW5nIn0sImlhdCI6MTYwODU2MTUxMiwiZXhwIjoxNjE1NzYxNTEyfQ.6LFbFI4QXw7jZfy4INAloW_CAXijqZ2nKdhClUlpM9M"
                        },
                        body: JSON.stringify({
                            "password": password,
                        })

                    })
                        .then(response => {
                            console.log(response.status);

                        })
                        .catch(error => console.log('error', error));

                    
                    navigation.navigate('Login');
                }
                else {
                    setUnknownEmail(true)
                }

            })
            .catch(error => console.log('error', error));




    }

    return (
        <View style={styles.background}>
            <LogoWithText />

            <View style={styles.inputView}>
                <Text style={styles.inputText}>EMAIL</Text>
                <TextInput style={styles.inputLine}
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    value={email}

                />
                {emailErrorShow ? (<Text style={styles.textError}>Please enter your email!</Text>) : null}
                {invalidEmailErrorShow ? (<Text style={styles.textError}>Please enter a valid email!</Text>) : null}
                {unknownEmail ? (<Text style={styles.textError}>This email does not exist!</Text>) : null}
            </View>

            <View style={styles.inputView}>
                <Text style={styles.inputText}>NEW PASSWORD</Text>
                <TextInput style={styles.inputLine}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    value={password}
                />
                {passwordErrorShow ? (<Text style={styles.textError}>Please enter a password!</Text>) : null}
            </View>

            <View style={styles.inputView}>
                <Text style={styles.inputText}>REPEAT NEW PASSWORD</Text>
                <TextInput style={styles.inputLine}
                    onChangeText={(text) => setRepeatPassword(text)}
                    secureTextEntry={true}
                    value={repeatPassword}
                />
                {confirmPasswordErrorShow ? (<Text style={styles.textError}>Password must match!</Text>) : null}
            </View>

            <TouchableHighlight
                style={styles.loginBtn}
                underlayColor="#F27A2999"
                onPress={checkRegisterInputs}>
                <Text style={styles.loginText}>RESET PASSWORD</Text>
            </TouchableHighlight>
        </View>


    );
}



const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#26282B',
        alignItems: 'center',
    },
    inputView: {
        alignSelf: 'center',
        marginTop: 16,
    },
    inputText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        color: 'white',
    },
    inputLine: {
        width: 300,
        height: 40,
        alignSelf: 'center',
        borderColor: 'white',
        borderBottomWidth: 2,
        color: 'white',
        alignSelf: 'center',
    },
    loginBtn: {
        marginTop: 24,
        width: 300,
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
    loginText: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        textShadowRadius: 6,
    },
    textError: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: 'red',
        marginTop: 10,
    },
});
export default ResetPassword;