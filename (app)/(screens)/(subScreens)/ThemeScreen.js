import React, { Component } from "react";
import { View, Switch, Alert, SafeAreaView, StatusBar } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

let isDarkTheme = false;

export default class ThemeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDarkTheme: false,
			uid: null
		};
	}

	async componentDidMount() {
		//get uid
		const auth = getAuth();
		const uid = await auth.currentUser.uid;
		await this.setState({ uid: uid });
		
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
		this.setState({ isDarkTheme });
		this.updateThemeInDatabase(isDarkTheme);
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: this.state.isDarkTheme ? "#050C1C" : "#FAFAFA", marginTop: StatusBar.currentHeight }}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Switch
						value={this.state.isDarkTheme}
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