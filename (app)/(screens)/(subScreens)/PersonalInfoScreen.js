import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';

let isDarkTheme;
export default class PersonalInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isThemeLoaded: false
        };
    }

    async componentDidMount() {
        // Fetch the user's theme preference from the database and set it in the state
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const db = getDatabase();
        const themeRef = await ref(db, "users/" + uid + "/theme");
        onValue(themeRef, (snapshot) => {
            if (snapshot.exists()) {
                const theme = snapshot.val();
                isDarkTheme = theme;
                this.setState({ isThemeLoaded: true });
            } else {
                Alert.alert("No theme preference found in database.");
            }
        });
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
        } else {
            return (
                <SafeAreaView style={{
                    flex: 1,
                    marginTop: StatusBar.currentHeight,
                    backgroundColor: isDarkTheme === "light" ? "#FAFAFA" : "#050C1C"
                }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: isDarkTheme === "light" ? "#050C1C" : "#FAFAFA"
                        }}>Personal Information</Text>
                    </View>
                </SafeAreaView >
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});