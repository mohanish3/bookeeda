import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from '../routes/HomePage';
import {SettingsPage} from '../routes/SettingsPage';
import React from 'react';

const Stack = createStackNavigator();

export const HomeNavigator = (params) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomePage'}
    >
      <Stack.Screen name="HomePage">
        {(props) => <HomePage {...props} firebaseInfo={params.firebaseInfo} />}
      </Stack.Screen>
      <Stack.Screen name="SettingsPage" component={SettingsPage} />
    </Stack.Navigator>
  );
};
