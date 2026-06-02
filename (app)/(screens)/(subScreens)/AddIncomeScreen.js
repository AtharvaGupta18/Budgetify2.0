import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

let Theme;
export default class AddIncomeScreen extends React.Component {
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
                Theme = theme;
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#2BB673" />
                    </View>
                </SafeAreaView>
            );
        }
        else {
            return (
                <SafeAreaView style={Theme === "light" ? styles.container : styles.containerDark}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={Theme === "light" ? styles.heading : styles.headingDark}>Add Income Screen</Text>
                        </View>
                    </ScrollView>

                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#050C1C'
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 100, // Space for bottom navigation
    },
    heading: {
        marginTop: StatusBar.currentHeight,
        fontSize: 32,
        fontWeight: "600",
        marginBottom: 20,
        color: "#111827",
    },
    headingDark: {
        marginTop: StatusBar.currentHeight,
        fontSize: 32,
        fontWeight: "600",
        marginBottom: 20,
        color: "#FAFAFA",
    }
});