import * as React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: null, password: null };
    }

    async signIn(email, password) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);
                this.props.navigation.replace('App');
                Alert.alert("Login successful");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Login failed \n Please check your email and password");
            });
    }

    // async createUser(email, password) {
    //     const navigation = useNavigation();
    //     const auth = getAuth();
    //     return await createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //             console.log(user)
    //             Alert.alert("User created successfully \n Please login to continue");
    //         }).catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorCode);
    //             console.log(errorMessage);
    //         });
    // }
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email: email})}
                    keyboardType='email-address'
                />
                <TextInput
                    placeholder="Password" 
                    value={this.state.password} 
                    onChangeText={(password) => this.setState({ password: password})} 
                    secureTextEntry 
                    keyboardType='password' 
                />

                <TouchableOpacity onPress={() => this.signIn(this.state.email, this.state.password)}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}