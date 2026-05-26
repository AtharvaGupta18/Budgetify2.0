import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { initializeApp } from 'firebase/app';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    //firebase configuration
    this.firebaseConfig = {
      apiKey: "AIzaSyArR_BPY8EITq3zSmN2KcD-0tMh5ceRQ0A",
      authDomain: "budgetify2.firebaseapp.com",
      databaseURL: "https://budgetify2-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "budgetify2",
      storageBucket: "budgetify2.firebasestorage.app",
      messagingSenderId: "946519206042",
      appId: "1:946519206042:web:430dd1215d57d0d0a05723"
    };
  }

  // Initialize Firebase
  async componentDidMount() {
    await initializeApp(this.firebaseConfig);
  }

  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}