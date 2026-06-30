import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

let Theme;
export default class ReportsScreen extends React.Component {
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
                    <StatusBar backgroundColor={Theme === "light" ? "#FAFAFA" : "#050C1C"} />
                    
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <View style={{ flex: 1, paddingLeft: 10,alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={Theme === "light" ? styles.heading : styles.headingDark}>Reports </Text>
                        </View>
                    </ScrollView>

                    {/* BOTTOM NAVIGATION BAR */}
                    <View style={Theme === "light" ? styles.bottomTab : styles.bottomTabDark}>
                        <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name="home-outline" size={22} color="#95A5A6" />
                            <Text style={styles.tabText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Transactions')}>
                            <Ionicons name="swap-horizontal" size={22} color="#95A5A6" />
                            <Text style={styles.tabText}>Transactions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => { this.props.navigation.navigate('Reports') }}>
                            <Ionicons name="bar-chart" size={22} color="#2BB673" />
                            <Text style={[styles.tabText], { color: '#2BB673', fontWeight: '600' }}>Reports</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => { this.props.navigation.navigate('Profile') }}>
                            <Ionicons name="person-outline" size={22} color="#95A5A6" />
                            <Text style={styles.tabText}>Profile</Text>
                        </TouchableOpacity>
                    </View>

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
        fontSize: 32,
        fontWeight: "600",
        marginBottom: 20,
        color: "#111827",
    },
    headingDark: {
        fontSize: 32,
        fontWeight: "600",
        marginBottom: 20,
        color: "#FAFAFA",
    },
    bottomTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingBottom: 10,
    },
    bottomTabDark: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: '#050C1C',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingBottom: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
    },
    tabText: {
        fontSize: 10,
        color: '#95A5A6',
        marginTop: 4,
    },
});