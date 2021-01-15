import React, { useState, useEffect, Component } from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    FlatList,
    Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaskImageView } from 'react-native-mask-image';
import { createStyles, minWidth, maxWidth } from 'react-native-media-queries';


const Stack = createStackNavigator();
const UserPlanExercises = () => {
    return (
        <Stack.Navigator initialRouteName="UserPlanExercises">
            <Stack.Screen
                options={{ headerShown: false }}
                name="UserPlanExercises"
                component={UserPlanExercisesScreen}
            />
        </Stack.Navigator>
    );
};

function UserPlanExercisesScreen({ route }) {
    const navigation = useNavigation();

    const exercisesList = route.params.exercises;
    //console.log("lista ", exercisesList.length);
    const [seconds, setSeconds] = useState(0);
    const [index, setIndex] = useState(0)
    const [showGoButton, setShowGoButton] = useState(true)
    const [showNextButton, setShowNextButton] = useState(false)
    const [disableNextButton, setDisableNextButton] = useState(true)
    const [exerciseNumber, setExerciseNumber] = useState("1")

    function nextExercise() {
        let activeIndex = index
        let activeExerciseNumber = exerciseNumber
        if (activeIndex == exercisesList.length - 1) {
            activeIndex = 0;
        } else {
            activeIndex++;
            activeExerciseNumber++
        }
        setIndex(activeIndex)
        setExerciseNumber(activeExerciseNumber)
        setShowGoButton(true)
        setShowNextButton(false)



    }

    function startExercise() {
        setSeconds(exercisesList[index].duration)
        setShowGoButton(false)
        setShowNextButton(true)
        setDisableNextButton(true)

    }

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds('');
            setDisableNextButton(false)
        }
    }), [seconds];

    return (
        <>
            <View style={styles.topSectionView}>
                <View style={styles.topBarInfoView}>
                    <MaterialIcons name="keyboard-arrow-left" style={styles.arrowLeft} />
                    <Text style={styles.planNameText}>EXERCISE {exerciseNumber}</Text>
                </View>
            </View>

            <ScrollView style={styles.background}>
                <View style={styles.bg2}>


                    <View style={stylesMediaQueries.maskView}>
                        <MaskImageView
                            urlImage={exercisesList[index].videoUrl}
                            urlMask={'https://i.imgur.com/NDpYsdD.png'}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                        <Text style={stylesMediaQueries.exerciseText}>
                            {exercisesList[index].exerciseName.toUpperCase()}
                        </Text>

                    </View>
                    <Text>
                        {"DURATION " + exercisesList[index].duration + " " + "SECONDS"}
                    </Text>

                    {showGoButton ? (
                        <TouchableHighlight
                            style={styles.planBtn}
                            onPress={startExercise}
                            underlayColor="#F27A2999">
                            <Text style={styles.planText}>GO!</Text>
                        </TouchableHighlight>
                    ) : null}

                    {showNextButton ? (
                        <TouchableHighlight
                            style= {styles.planBtn}
                            disabled={disableNextButton}
                            onPress={nextExercise}
                            underlayColor="#F27A2999">
                            <Text style={styles.planText}>{[(disableNextButton) ? seconds +"s" : "NEXT EXERCISE"]}</Text>
                        </TouchableHighlight>
                    ) : null}


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
        fontSize: 18,
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
    unactiveBtn: {
        marginTop: 40,
        width: '85%',
        height: 90.9,
        borderRadius: 10,
        backgroundColor: '#F27A2940',
        justifyContent: 'center',
    },




})
const base = {
    maskView: {
        height: 178,
        width: '85%',
        marginTop: 10,
        marginBottom: 14,
        alignItems: 'center',
        alignSelf: 'center'
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

export default UserPlanExercises;
