import * as React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: null, password: null };
    }

    signUp(email, password) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                Alert.alert("User created successfully \n Please login to continue");
                this.props.navigation.replace('Authentication');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email: email })}
                    keyboardType='email-address'
                />
                <TextInput
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password: password })}
                    secureTextEntry
                    keyboardType='password'
                />
                <TouchableOpacity onPress={() => this.signUp(this.state.email, this.state.password)}>
                    <Text>Create User</Text>
                </TouchableOpacity>
            </View>
        );
    }
}