import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ToastAndroid,
    Image,
    ActivityIndicator,
    Appearance
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {SafeAreaView} from 'react-native-safe-area-context';

let Theme;
export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isThemeLoaded: false,
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            secureTextEntry: true,
            secureTextEntryConfirm: true,
        };
    }

    async componentDidMount() {
        Theme = await Appearance.getColorScheme();
        if (Theme === "dark" || Theme === "light") {
            this.setState({
                isThemeLoaded: true
            });
        }
        else {
            Alert.alert("Error");
        }
    }

    toggleSecureEntry = () => {
        this.setState((prevState) => ({
            secureTextEntry: !prevState.secureTextEntry,
        }));
    };

    toggleSecureEntryConfirm = () => {
        this.setState((prevState) => ({
            secureTextEntryConfirm: !prevState.secureTextEntryConfirm,
        }));
    };

    async createDatabaseEntry(uid) {
        const db = getDatabase();
        await set(ref(db, 'users/' + uid), {
            name: this.state.name,
            email: this.state.email,
        });
    }

    async signUp(name, email, password, confirmPassword) {
        if (name && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
                this.setState({ password: '', confirmPassword: '' });
            }
            else {
                const auth = getAuth();
                return await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        Alert.alert("User created successfully \n Please login to continue");
                        this.createDatabaseEntry(user.uid);
                        this.props.navigation.replace('SignIn');
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        Alert.alert("User creation failed \n Please try again later");
                    });
            }
        } else {
            Alert.alert("Please fill all the fields");
        }
    }

    render() {
        if (!this.state.isThemeLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0F8A50" />
                    </View>
                </SafeAreaView>
            );
        }
        else {
            return (
                <SafeAreaView style={Theme === "light" ? styles.container : styles.containerDark}>
                    <StatusBar barStyle="dark-content" backgroundColor="#F4F9F9" />

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.contentContainer}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require('../../assets/logo.png')}
                                        style={styles.logo}
                                    />
                                </View>

                                <Text style={styles.title}>Budgetify</Text>
                                <Text style={Theme === "light" ? styles.subtitle : styles.subtitleDark}>Create an Account</Text>

                                <Text style={Theme === "light" ? styles.description : styles.descriptionDark}>
                                    Sign up to start managing your finances.
                                </Text>
                            </View>

                            <View style={styles.formContainer}>
                                <View style={styles.inputWrapper}>
                                    <Text style={Theme === "light" ? styles.inputLabel : styles.inputLabelDark}>Name</Text>
                                    <TextInput
                                        style={Theme === "light" ? styles.input : styles.inputDark}
                                        placeholder="Enter your name"
                                        placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                        keyboardType="default"
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({ name: text })}
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={Theme === "light" ? styles.inputLabel : styles.inputLabelDark}>Email Address</Text>
                                    <TextInput
                                        style={Theme === "light" ? styles.input : styles.inputDark}
                                        placeholder="example@mail.com"
                                        placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })}
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={Theme === "light" ? styles.inputLabel : styles.inputLabelDark}>Password</Text>
                                    <View style={Theme === "light" ? styles.passwordContainer : styles.passwordContainerDark}>
                                        <TextInput
                                            style={[
                                                Theme === "light" ? styles.input : styles.inputDark,
                                                { flex: 1, borderWidth: 0, height: '100%', marginBottom: 0, paddingHorizontal: 0 },
                                            ]}
                                            placeholder="Enter your password"
                                            placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                            secureTextEntry={this.state.secureTextEntry}
                                            autoCapitalize="none"
                                            value={this.state.password}
                                            onChangeText={(text) => this.setState({ password: text })}
                                        />
                                        <TouchableOpacity
                                            onPress={this.toggleSecureEntry}
                                            style={styles.toggleButton}
                                        >
                                            <Text style={styles.toggleText}>
                                                {this.state.secureTextEntry ? 'Show' : 'Hide'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={Theme === "light" ? styles.inputLabel : styles.inputLabelDark}>Confirm Password</Text>
                                    <View style={Theme === "light" ? styles.passwordContainer : styles.passwordContainerDark}>
                                        <TextInput
                                            style={[
                                                Theme === "light" ? styles.input : styles.inputDark,
                                                { flex: 1, borderWidth: 0, height: '100%', marginBottom: 0, paddingHorizontal: 0 },
                                            ]}
                                            placeholder="Confirm your password"
                                            placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                            secureTextEntry={this.state.secureTextEntryConfirm}
                                            autoCapitalize="none"
                                            value={this.state.confirmPassword}
                                            onChangeText={(text) => this.setState({ confirmPassword: text })}
                                        />
                                        <TouchableOpacity
                                            onPress={this.toggleSecureEntryConfirm}
                                            style={styles.toggleButton}
                                        >
                                            <Text style={styles.toggleText}>
                                                {this.state.secureTextEntryConfirm ? 'Show' : 'Hide'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.bottomContainer}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
                                    this.signUp(this.state.name, this.state.email, this.state.password, this.state.confirmPassword);
                                }}>
                                    <Text style={styles.buttonText}>Create Account</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F9F9',
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#050C1C',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 40,
    },
    logoContainer: {
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
    },
    logo: {
        width: 110,
        height: 110,
        borderRadius: 30,
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#22A467',
        marginBottom: 15,
        letterSpacing: 0.5,
        marginTop: -10,
    },
    subtitle: {
		fontSize: 22,
		fontWeight: '700',
		color: '#1E293B',
		marginBottom: 10,
		textAlign: 'center',
	},
	subtitleDark: {
		fontSize: 22,
		fontWeight: '700',
		color: '#F5F5F5',
		marginBottom: 10,
		textAlign: 'center',
	},
    description: {
		fontSize: 18,
		color: '#475569',
		textAlign: 'center',
		lineHeight: 22,
		fontWeight: '500',
	},
	descriptionDark: {
		fontSize: 18,
		color: '#A0A0A0',
		textAlign: 'center',
		lineHeight: 22,
		fontWeight: '500',
	},
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 8,
    },
    inputLabelDark: {
        fontSize: 14,
        fontWeight: '600',
        color: '#A5A5A5',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 54,
        fontSize: 15,
        color: '#0F172A',
    },
    inputDark: {
        backgroundColor: '#0F172A',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 54,
        fontSize: 15,
        color: '#A0A0A0',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        height: 54,
        paddingLeft: 16,
        paddingRight: 16,
    },
    passwordContainerDark: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#0F172A',
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderRadius: 12,
		height: 54,
		paddingLeft: 16,
		paddingRight: 16,
	},
    toggleButton: {
        justifyContent: 'center',
    },
    toggleText: {
        color: '#22A467',
        fontSize: 13,
        fontWeight: '600',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    forgotPasswordText: {
        fontSize: 13,
        color: '#22A467',
        fontWeight: '600',
    },
    bottomContainer: {
        marginTop: 40,
    },
    button: {
        backgroundColor: '#22A467',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#22A467',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    signupLink: {
        fontSize: 14,
        color: '#22A467',
        fontWeight: '700',
    },
});