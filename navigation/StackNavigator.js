import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../(app)/(auth)/SignIn';
import BottomTabs from './BottomTabNavigator';
import SignUp from '../(app)/(auth)/SignUp';
import ForgotPassword from '../(app)/(auth)/ForgotPassword';
import SplashScreen from '../(app)/SplashScreen';
import HomeScreen from '../(app)/(screens)/HomeScreen';
import TransactionScreen from '../(app)/(screens)/TransactionScreen';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="App" component={BottomTabs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
  );
}