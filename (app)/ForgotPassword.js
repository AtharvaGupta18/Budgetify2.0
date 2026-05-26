import * as React from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: null };
    }

    forgotPassword(email) {
        const auth = getAuth();
        return sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                Alert.alert("Password reset email sent! \n Please check your email to reset your password");
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

                <TouchableOpacity onPress={() => this.forgotPassword(this.state.email)}>
                    <Text>Reset Password</Text>
                </TouchableOpacity>
            </View>
        );
    }
}