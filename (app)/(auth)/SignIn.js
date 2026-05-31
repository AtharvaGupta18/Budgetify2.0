import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';

let Theme;
export default class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			secureTextEntry: true,
			isThemeLoaded: false,
		};
	}

	toggleSecureEntry = () => {
		this.setState((prevState) => ({
			secureTextEntry: !prevState.secureTextEntry,
		}));
	};

	async signIn(email, password, theme) {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const uid = userCredential.user.uid;
				const db = getDatabase();
				const themeRef = ref(db, "users/" + uid + "/theme");
				try {
					set(themeRef, theme);
				}
				catch (error) {
					Alert.alert("Something went wrong", error.message);
				}

				this.props.navigation.replace('Home');
				ToastAndroid.show('Login successful', ToastAndroid.SHORT);
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				Alert.alert("Login failed \n Please check email and password");
			});
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
								<Text style={Theme === "light" ? styles.subtitle : styles.subtitleDark}>Welcome Back!</Text>

								<Text style={Theme === "light" ? styles.description : styles.descriptionDark}>
									Login to keep managing your finances.
								</Text>
							</View>

							<View style={styles.formContainer}>
								<View style={styles.inputWrapper}>
									<Text style={styles.inputLabel}>Email Address</Text>
									<TextInput
										style={Theme === "light" ? styles.input : styles.inputDark}
										placeholder="example@mail.com"
										placeholderTextColor="#94A3B8"
										keyboardType="email-address"
										autoCapitalize="none"
										value={this.state.email}
										onChangeText={(text) => this.setState({ email: text })}
									/>
								</View>

								<View style={styles.inputWrapper}>
									<Text style={styles.inputLabel}>Password</Text>
									<View style={Theme==="light" ? styles.passwordContainer : styles.passwordContainerDark}>
										<TextInput
											style={[
												Theme === "light" ? styles.input : styles.inputDark,
												{ flex: 1, borderWidth: 0, height: '100%', marginBottom: 0, paddingHorizontal: 0 },
											]}
											placeholder="Enter your password"
											placeholderTextColor="#94A3B8"
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

								<TouchableOpacity style={styles.forgotPasswordContainer} activeOpacity={0.6} onPress={() => {
									// Navigate to Forgot Password Screen
									this.props.navigation.navigate('ForgotPassword');
								}}>
									<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.bottomContainer}>
								<TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
									// Handle Login
									this.signIn(this.state.email, this.state.password, Theme);
								}}>
									<Text style={styles.buttonText}>Login</Text>
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
		paddingHorizontal: 10,
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
		backgroundColor: '#0b162e',
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderRadius: 12,
		paddingHorizontal: 16,
		height: 54,
		fontSize: 15,
		color: '#0F172A',
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
		backgroundColor: '#0b162e',
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