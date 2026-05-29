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
	Image
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			secureTextEntry: true,
		};
	}

	toggleSecureEntry = () => {
		this.setState((prevState) => ({
			secureTextEntry: !prevState.secureTextEntry,
		}));
	};

	async signIn(email, password) {
		const auth = getAuth();
		return await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				this.props.navigation.replace('Home');
				ToastAndroid.show('Login successful', ToastAndroid.SHORT);
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				Alert.alert("Login failed \n Please check email and password");
			});
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
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
							<Text style={styles.subtitle}>Welcome Back!</Text>

							<Text style={styles.description}>
								Login to keep managing your finances.
							</Text>
						</View>

						<View style={styles.formContainer}>
							<View style={styles.inputWrapper}>
								<Text style={styles.inputLabel}>Email Address</Text>
								<TextInput
									style={styles.input}
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
								<View style={styles.passwordContainer}>
									<TextInput
										style={[
											styles.input,
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
								this.signIn(this.state.email, this.state.password);
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F9F9',
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