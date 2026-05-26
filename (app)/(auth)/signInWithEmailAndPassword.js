import * as React from 'react';
import {Alert} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigation} from '@react-navigation/native';

export async function signIn(email, password) {
    const navigation = useNavigation();
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigation.replace('App')
            Alert.alert("Login successful");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

export async function createUser(email, password) {
    const navigation = useNavigation();
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            Alert.alert("User created successfully \n Please login to continue");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}