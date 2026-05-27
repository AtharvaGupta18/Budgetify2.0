import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from 'react-native';

export default class SplashScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" backgroundColor="#F4F9F9" />
				<View style={styles.contentContainer}>
					<View style={styles.logoContainer}>
						<Image
							source={require('../assets/logo.png')}
							style={styles.logo}
						/>
					</View>

					<Text style={styles.title}>Budgetify</Text>
					<Text style={styles.subtitle}>Smart Money Management</Text>

					<Text style={styles.description}>
						Track your income and expenses{'\n'}effortlessly.
					</Text>
				</View>

				<View style={styles.bottomContainer}>
					<TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => {
						// Navigate to Sign Up Screen
						this.props.navigation.navigate('SignUp');
					}}>
						<Text style={styles.buttonText}>Get Started</Text>
					</TouchableOpacity>

					<View style={styles.loginContainer}>
						<Text style={styles.loginText}>Already have an account? </Text>
						<TouchableOpacity activeOpacity={0.6} onPress={() => {
							// Navigate to Login Screen
							this.props.navigation.navigate('SignIn');
						}}>
							<Text style={styles.loginLink}>Login</Text>
						</TouchableOpacity>
					</View>

				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F9F9', // Light tinted background
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
		marginTop: 40, // Adjusts center mass slightly upwards
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
		color: '#22A467', // Budgetify Green
		marginBottom: 25,
		letterSpacing: 0.5,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#1E293B', // Dark Slate
		marginBottom: 10,
		textAlign: 'center',
	},
	description: {
		fontSize: 15,
		color: '#475569', // Gray
		textAlign: 'center',
		lineHeight: 22,
		fontWeight: '500',
	},
	bottomContainer: {
		paddingHorizontal: 25,
		paddingBottom: 50, // Ensures safe spacing from the bottom home indicator
	},
	button: {
		backgroundColor: '#22A467',
		paddingVertical: 18,
		borderRadius: 30,
		alignItems: 'center',
		marginBottom: 25,
		shadowColor: '#22A467',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700',
	},
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		fontSize: 14,
		color: '#475569',
		fontWeight: '500',
	},
	loginLink: {
		fontSize: 14,
		color: '#22A467',
		fontWeight: '700',
	},
});