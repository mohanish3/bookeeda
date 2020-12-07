import {createStackNavigator} from '@react-navigation/stack';
import {HomeNavigator} from '../navigation/HomeNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LoginPage} from '../routes/LoginPage';

const Stack = createStackNavigator();

export const RootNavigator = (params) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={params.start}
      >
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomeNavigator">
          {(props) => (
            <HomeNavigator {...props} firebaseInfo={params.firebaseInfo} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
