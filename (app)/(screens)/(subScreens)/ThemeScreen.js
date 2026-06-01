import React, { Component } from "react";
import { View, Switch, Alert, StatusBar, ActivityIndicator } from "react-native";
import { getDatabase, ref, set, onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import {SafeAreaView} from 'react-native-safe-area-context';

let Theme, isDarkTheme=false;

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
				if(Theme === "dark") {
					isDarkTheme = true;
				}else{
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
				<SafeAreaView style={{ flex: 1, backgroundColor: Theme === "dark" ? "#050C1C" : "#FAFAFA"}}>
					<StatusBar backgroundColor={Theme === "dark" ? "#050C1C" : "#FAFAFA"} />
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							marginTop: StatusBar.currentHeight,
						}}
					>
						<Switch
							value={isDarkTheme}
							onValueChange={this.toggleTheme}
							trackColor={{
								false: "#D1D5DB",
								true: "#0F8A50",
							}}
						/>
					</View>
				</SafeAreaView>
			);
		}
	}
}