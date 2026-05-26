import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from '../(app)/Authentication';
import BottomTabs from './BottomTabNavigator';
import SignUp from '../(app)/SignUp';
import ForgotPassword from '../(app)/ForgotPassword';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="Authentication" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="App" component={BottomTabs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
  );
}