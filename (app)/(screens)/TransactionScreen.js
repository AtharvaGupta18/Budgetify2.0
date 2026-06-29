import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView, Alert, SectionList } from 'react-native';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flatlist } from 'react-native-gesture-handler';

let Theme;
export default class TransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isThemeLoaded: false,
            isTransactionsLoaded: false,
            date: new Date(),
            transactions: []
        };
    }

    async loadData() {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const db = getDatabase();
        const month = this.state.date.getMonth() + 1;
        const year = this.state.date.getFullYear();
        const day = this.state.date.getDate();

        const transactionsRef = ref(db, "users/" + uid + "/transactions");
        try {
            onValue(transactionsRef, (snapshot) => {
                const transactions = snapshot.val();
                this.setState({ transactions: transactions, isTransactionsLoaded: true });
            });
        } catch (error) {
            Alert.alert("Something went wrong while loading data. \n Please try again later.");
        }
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
        this.loadData();
    }

    renderTransaction = ({ item }) => {
        return (
            <ScrollView>
                <TouchableOpacity style={Theme === "light" ? styles.card : styles.cardDark}>
                    <View style={styles.left}>

                        <View style={[styles.iconCircle, { backgroundColor: item.type === "income" ? "#DDF6EA" : "#FDE6E6" }]}>
                            <MaterialIcons
                                name={item.category}
                                size={26}
                                color={item.type === 'income' ? "#0F8A50" : "#E45B5B"}
                            />
                        </View>

                        <View>
                            <Text style={Theme === "light" ? styles.transactionTitle : styles.transactionTitleDark}>{item.title}</Text>
                            <Text style={styles.note}>{item.note}</Text>
                        </View>
                    </View>

                    <Text style={[styles.amount, { color: item.type === "income" ? "#0F8A50" : "#E53935" }]}>
                        {item.type === "income" ? "+" : "-"} ₹
                        {item.amount.toLocaleString()}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    render() {
        if (!this.state.isThemeLoaded && !this.state.isTransactionsLoaded) {
            return (
                <SafeAreaView style={Theme === "light" ? styles.container : styles.containerDark}>
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
                    <View style={styles.header}>
                        <View>
                            <Text style={Theme === "light" ? styles.heading : styles.headingDark}>Transactions Screen</Text>
                            <Text style={Theme === "light" ? styles.subHeading : styles.subHeadingDark}>View your transaction logs</Text>
                        </View>
                    </View>

                    <View>
                        <SectionList
                            sections={this.state.transactions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderTransaction}
                            stickySectionHeadersEnabled={false}
                            renderSectionHeader={({ section }) => (
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "left",
                                    marginLeft: 30
                                }}>
                                    <MaterialIcons name="calendar-month" size={26} color={Theme==="light"?"#333":"#60a760"} />
                                    <Text style={Theme === "light" ? styles.section : styles.sectionDark}>
                                        {section.date}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    {/* BOTTOM NAVIGATION BAR */}
                    <View style={Theme === "light" ? styles.bottomTab : styles.bottomTabDark}>
                        <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name="home-outline" size={22} color="#95A5A6" />
                            <Text style={styles.tabText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Transactions')}>
                            <Ionicons name="swap-horizontal" size={22} color="#2BB673" />
                            <Text style={[styles.tabText], { color: '#2BB673', fontWeight: '600' }}>Transactions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => { this.props.navigation.navigate('Reports') }}>
                            <Ionicons name="bar-chart" size={22} color="#95A5A6" />
                            <Text style={styles.tabText}>Reports</Text>
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

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },

    headingDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F5F5F5',
    },

    subHeading: {
        fontSize: 15,
        color: '#888',
        marginTop: 2,
    },

    subHeadingDark: {
        fontSize: 15,
        color: '#A0A0A0',
        marginTop: 2,
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
        width: 95,
    },

    tabText: {
        fontSize: 10,
        color: '#95A5A6',
        marginTop: 4,
    },

    headerTitle: {
        fontSize: 30,
        fontWeight: "700",
    },

    section: {
        marginTop: 5,
        marginBottom: 12,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        elevation: 2
    },

    sectionDark: {
        marginTop: 5,
        marginBottom: 12,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: "700",
        color: "#60a760",
        elevation: 2
    },

    card: {
        marginHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderRadius: 18,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
    },

    cardDark: {
        marginHorizontal: 10,
        backgroundColor: "#0F172A",
        marginBottom: 12,
        borderRadius: 18,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
    },

    iconCircle: {
        width: 55,
        height: 55,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    transactionTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: '#1E293B'
    },

    transactionTitleDark: {
        fontSize: 17,
        fontWeight: "600",
        color: '#d6d3d3',
    },

    note: {
        color: "#777",
        marginTop: 4,
    },

    amount: {
        fontSize: 18,
        fontWeight: "700",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
    },
});