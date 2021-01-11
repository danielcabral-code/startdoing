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

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const UserPlans = () => {


    return (
        <Stack.Navigator initialRouteName="UserPlan">
            <Stack.Screen
                options={{ headerShown: false }}
                name="UserPlan"
                component={UserPlan}
            />
        </Stack.Navigator>
    )

}

function UserPlan({ route }) {
    const { id } = route.params
    console.log(id);

    return (
        <Text>ola</Text>
    )
}

export default UserPlans