import React, { Component } from "react";
import { View, Switch, Alert, StatusBar, ActivityIndicator, Text, StyleSheet } from "react-native";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from "@expo/vector-icons";

let Theme, isDarkTheme = false;

export default class ThemeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isThemeLoaded: false,
			uid: null
		};
	}

	async componentDidMount() {
		//get uid
		const auth = getAuth();
		const uid = await auth.currentUser.uid;
		await this.setState({ uid: uid });

		// Fetch the user's theme preference from the database and set it in the state
		const db = getDatabase();
		const themeRef = await ref(db, "users/" + uid + "/theme");
		onValue(themeRef, (snapshot) => {
			if (snapshot.exists()) {
				const theme = snapshot.val();
				Theme = theme;
				if (Theme === "dark") {
					isDarkTheme = true;
				} else {
					isDarkTheme = false;
				}
				this.setState({ isThemeLoaded: true });
			} else {
				Alert.alert("No theme preference found in database.");
			}
		});
	}

	async updateThemeInDatabase(isDark) {
		const db = getDatabase();
		const themeRef = ref(db, "users/" + this.state.uid + "/theme");
		try {
			await set(themeRef, isDark ? "dark" : "light");
		} catch (error) {
			Alert.alert("Error updating theme in database:", error.message);
		}
	}

	toggleTheme = () => {
		isDarkTheme = !isDarkTheme;
		this.updateThemeInDatabase(isDarkTheme);
	};

	render() {
		if (!this.state.isThemeLoaded && !Theme) {
			return (
				<SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA", marginTop: StatusBar.currentHeight }}>
					<ActivityIndicator size="large" color="#0F8A50" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
				</SafeAreaView>
			);
		} else {
			return (
				<SafeAreaView style={{ flex: 1, backgroundColor: Theme === "dark" ? "#050C1C" : "#FAFAFA" }}>
					<StatusBar backgroundColor={Theme === "dark" ? "#050C1C" : "#FAFAFA"} />

					<View style={styles.header}>
						<View>
							<Text style={Theme === "light" ? styles.welcomeText : styles.welcomeTextDark}>Theme </Text>
							<Text style={Theme === "light" ? styles.subWelcomeText : styles.subWelcomeTextDark}>Change the appearance of your app!</Text>
						</View>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: 'flex-start',
							marginTop: StatusBar.currentHeight
						}}
					>
						<Text style={{ marginLeft: 30, color: Theme === "light" ? "black" : "white", fontSize: 26 }}>Change Mode</Text>
						<View style={{flexDirection: "row"}}>
							<View style={{marginTop:10}}>
								<MaterialIcons
								name={Theme === "light" ? "sunny" : "nights-stay"}
								size={26}
								color={Theme==="light"? "black":"white"}
							/>
							</View>
							<Switch
								style={{ marginLeft:10,marginRight: 40 }}
								value={isDarkTheme}
								onValueChange={this.toggleTheme}
								trackColor={{
									false: "#D1D5DB",
									true: "#0F8A50",
								}}
							/>
						</View>
					</View>
				</SafeAreaView>
			);
		}
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 15,
		paddingBottom: 20
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	welcomeTextDark: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#F5F5F5',
	},
	subWelcomeText: {
		fontSize: 15,
		color: '#888',
		marginTop: 2,
	},
	subWelcomeTextDark: {
		fontSize: 15,
		color: '#A0A0A0',
		marginTop: 2,
	},
})