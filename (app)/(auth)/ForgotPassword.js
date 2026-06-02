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
    Image,
    ActivityIndicator,
    Appearance
} from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { SafeAreaView } from 'react-native-safe-area-context';

let Theme;
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isThemeLoaded: false
        };
    }

    async componentDidMount() {
        // Fetch the user's theme preference from the database and set it in the state
        Theme = await Appearance.getColorScheme();
        if (Theme === "dark" || Theme === "light") {
            this.setState({ isThemeLoaded: true });
        }
    }


    async forgotPassword(email) {
        const auth = getAuth();
        return await sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                Alert.alert("Password reset email sent! \n Please check your email to reset your password");
                this.props.navigation.replace('SignIn');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Failed to send reset email \n Please check the email address");
            });
    }


    render() {
        if (!this.state.isThemeLoaded) {
            return (
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: Theme === "#FAFAFA"
                }}>
                    <ActivityIndicator size="large" color="#0F8A50" />
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: Theme === "light" ? "#FAFAFA" : "#050C1C",
                }}>
                    <StatusBar barStyle="dark-content" backgroundColor={Theme === "light" ? "#FAFAFA" : "#050C1C"} />

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
                                <Text style={Theme === "light" ? styles.subtitle : styles.subtitleDark}>Reset Password</Text>

                                <Text style={styles.description}>
                                    Enter Email-ID to send password reset Email.
                                </Text>
                            </View>

                            <View style={styles.formContainer}>
                                <View style={styles.inputWrapper}>
                                    <Text style={Theme === "light" ? styles.inputLabel : styles.inputLabelDark}>Email Address</Text>
                                    <TextInput
                                        style={Theme === "light" ? styles.input : styles.inputDark}
                                        placeholder="example@mail.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.bottomContainer}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
                                    this.forgotPassword(this.state.email);
                                }}>
                                    <Text style={styles.buttonText}>Send Reset Email</Text>
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
        marginBottom: 30,
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
        marginBottom: 25,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitleDark: {
        fontSize: 18,
        fontWeight: '700',
        color: '#9faec2',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: '#475569',
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
        color: '#A0A0A0',
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
        backgroundColor: '#b0bea0',
        borderWidth: 1,
        borderColor: '#1c293b',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 54,
        fontSize: 15,
        color: '#0F172A',
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
    }
});