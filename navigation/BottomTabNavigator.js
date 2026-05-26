import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OneScreen from '../(app)/(screens)/OneScreen';
import TwoScreen from '../(app)/(screens)/TwoScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="One" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="One" component={OneScreen} />
      <Tab.Screen name="Two" component={TwoScreen} />
    </Tab.Navigator>
  );
}