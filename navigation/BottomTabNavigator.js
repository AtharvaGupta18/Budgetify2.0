import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../(app)/(screens)/HomeScreen';
import TransactionScreen from '../(app)/(screens)/TransactionScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={TransactionScreen} />
    </Tab.Navigator>
  );
}