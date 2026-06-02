import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../(app)/(auth)/SignIn';
import SignUp from '../(app)/(auth)/SignUp';
import ForgotPassword from '../(app)/(auth)/ForgotPassword';
import SplashScreen from '../(app)/SplashScreen';
import HomeScreen from '../(app)/(screens)/HomeScreen';
import TransactionScreen from '../(app)/(screens)/TransactionScreen';
import ReportsScreen from '../(app)/(screens)/ReportsScreen';
import ProfileScreen from '../(app)/(screens)/ProfileScreen';
import ThemeScreen from '../(app)/(screens)/(subScreens)/ThemeScreen';
import PersonalInfoScreen from '../(app)/(screens)/(subScreens)/PersonalInfoScreen';
import AddExpenseScreen from '../(app)/(screens)/(subScreens)/AddExpenseScreen';
import AddIncomeScreen from '../(app)/(screens)/(subScreens)/AddIncomeScreen';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transactions" component={TransactionScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
      </Stack.Navigator>
  );
}