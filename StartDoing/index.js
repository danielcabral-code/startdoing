import {AppRegistry} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../StartDoing/Pages/Login';
import RegisterScreen from '../StartDoing/Pages/Register'
import ResetPasswordScreen from '../StartDoing/Pages/ResetPassword';
import GuestHome from '../StartDoing/Pages/GuestHome';
import BottomNavigation from '../StartDoing/Pages/BottomNavigation/BottomNavigation';
import UserPlan from '../StartDoing/Pages/UserPlan';
import CreatePlan from '../StartDoing/Pages/CreatePlan';
import UserPlanExercises from '../StartDoing/Pages/UserPlanExercises';
import CustomizeUserPlan from '../StartDoing/Pages/CustomizeUserPlan';
import EditDetails from '../StartDoing/Pages/EditDetails';
import ChangePassword from '../StartDoing/Pages/ChangePassword';
import SuggestedPlanScreen from '../StartDoing/Pages/SuggestedPlan';
import SuggestedPlanScreenGuest from '../StartDoing/Pages/SuggestedPlanGuest';
import SuggestedExercisesScreen from '../StartDoing/Pages/SuggestedPlanExercises';
import SuggestedExercisesScreenGuest from '../StartDoing/Pages/SuggestedPlanGuestExercises';
import ChangeProfilePicture from '../StartDoing/Pages/ChangeProfilePicture';

import {name as appName} from './app.json';

const Stack = createStackNavigator();
const Navigation = (navigation) => {
  //Navigation routes
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Guest"
          component={GuestHome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="BottomNavigation"
          component={BottomNavigation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserPlan"
          component={UserPlan}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CreatePlan"
          component={CreatePlan}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserPlanExercises"
          component={UserPlanExercises}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="CustomizeUserPlan"
          component={CustomizeUserPlan}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="EditDetails"
          component={EditDetails}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="ChangePassword"
          component={ChangePassword}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SuggestedPlanScreen"
          component={SuggestedPlanScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SuggestedPlanScreenGuest"
          component={SuggestedPlanScreenGuest}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SuggestedExercisesScreen"
          component={SuggestedExercisesScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SuggestedExercisesScreenGuest"
          component={SuggestedExercisesScreenGuest}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="ChangeProfilePicture"
          component={ChangeProfilePicture}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Navigation);
