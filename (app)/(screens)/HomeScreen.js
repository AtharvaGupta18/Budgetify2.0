import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import {SafeAreaView} from 'react-native-safe-area-context';

let Theme;
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isThemeLoaded: false, 
            name: ''
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

        const nameRef = await ref(db, "users/" + uid + "/name");
        onValue(nameRef, (snapshot) => {
            if (snapshot.exists()) {
                const name = snapshot.val();
                this.setState({ name: name });
            } else {
                Alert.alert("No name found in database.");
            }
        });
    }

    render() {
        if (!this.state.isThemeLoaded && this.state.name !== '') {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0F8A50" />
                    </View>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: Theme === "light" ? "#FAFAFA" : "#050C1C", marginTop: - (StatusBar.currentHeight + 10)}}>
                    <StatusBar backgroundColor={Theme === "light" ? "#FAFAFA" : "#050C1C"} />

                    {/* HEADER SECTION */}
                    <View style={styles.header}>
                        <View>
                            <Text style={Theme === "light" ? styles.welcomeText : styles.welcomeTextDark}>Welcome, {this.state.name}</Text>
                            <Text style={Theme === "light" ? styles.subWelcomeText : styles.subWelcomeTextDark}>Good to see you again!</Text>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                        {/* BALANCE CARD */}
                        <View style={styles.balanceCard}>
                            <View style={styles.balanceHeader}>
                                <Text style={styles.balanceTitle}>Total Balance</Text>
                            </View>
                            <Text style={styles.balanceAmount}>₹ 24,750.00</Text>

                            <View style={styles.statsContainer}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Income</Text>
                                    <Text style={ styles.income}>₹ 40,000.00</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Expenses</Text>
                                    <Text style={styles.expenses}>₹ 15,250.00</Text>
                                </View>
                            </View>
                        </View>

                        {/* QUICK ACTIONS */}
                        <Text style={Theme === "light" ? styles.sectionTitle : styles.sectionTitleDark}>Quick Actions</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={Theme === "light" ? styles.actionButton : styles.actionButtonDark} onPress={() => this.props.navigation.navigate('AddIncome')}>
                                <View style={[styles.actionIconContainer, { backgroundColor: '#EBF7EE' }]}>
                                    <MaterialIcons name="move-to-inbox" size={24} color="#2BB673" />
                                </View>
                                <Text style={Theme === "light" ? styles.actionText : styles.actionTextDark}>Add Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Theme === "light" ? styles.actionButton : styles.actionButtonDark} onPress={() => this.props.navigation.navigate('AddExpense')}>
                                <View style={[styles.actionIconContainer, { backgroundColor: '#FCECEC' }]}>
                                    <Ionicons name="trash-bin" size={24} color="#E74C3C" />
                                </View>
                                <Text style={Theme === "light" ? styles.actionText : styles.actionTextDark}>Add Expense</Text>
                            </TouchableOpacity>
                        </View>

                        {/* RECENT TRANSACTIONS */}
                        <View style={styles.transactionsHeader}>
                            <Text style={Theme === "light" ? styles.sectionTitle : styles.sectionTitleDark}>Recent Transactions</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Transactions')}>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TRANSACTION LIST */}
                        <View style={Theme === "light" ? styles.transactionList : styles.transactionListDark}>
                            {/* Item 1 */}
                            <View style={styles.transactionItem}>
                                <View style={[styles.transIconContainer, { backgroundColor: '#EBF7EE' }]}>
                                    <Ionicons name="arrow-down" size={20} color="#2BB673" />
                                </View>
                                <View style={styles.transDetails}>
                                    <Text style={Theme === "light" ? styles.transTitle : styles.transTitleDark}>Salary</Text>
                                    <Text style={styles.transDate}>Today</Text>
                                </View>
                                <Text style={styles.transCredit}>+ ₹ 40,000</Text>
                            </View>

                            {/* Item 2 */}
                            <View style={styles.transactionItem}>
                                <View style={[styles.transIconContainer, { backgroundColor: '#FCECEC' }]}>
                                    <Ionicons name="arrow-up" size={20} color="#E74C3C" />
                                </View>
                                <View style={styles.transDetails}>
                                    <Text style={Theme === "light" ? styles.transTitle : styles.transTitleDark}>Groceries</Text>
                                    <Text style={styles.transDate}>Today</Text>
                                </View>
                                <Text style={styles.transDebit}>- ₹ 1,250</Text>
                            </View>

                            {/* Item 3 */}
                            <View style={styles.transactionItem}>
                                <View style={[styles.transIconContainer, { backgroundColor: '#FEF5EC' }]}>
                                    <FontAwesome5 name="hamburger" size={18} color="#E67E22" />
                                </View>
                                <View style={styles.transDetails}>
                                    <Text style={Theme === "light" ? styles.transTitle : styles.transTitleDark }>Food</Text>
                                    <Text style={styles.transDate}>Yesterday</Text>
                                </View>
                                <Text style={styles.transDebit}>- ₹ 350</Text>
                            </View>

                            {/* Item 4 */}
                            <View style={styles.transactionItem}>
                                <View style={[styles.transIconContainer, { backgroundColor: '#F0F3F4' }]}>
                                    <FontAwesome5 name="bus" size={18} color="#7F8C8D" />
                                </View>
                                <View style={styles.transDetails}>
                                    <Text style={Theme === "light" ? styles.transTitle : styles.transTitleDark}>Transport</Text>
                                    <Text style={styles.transDate}>Yesterday</Text>
                                </View>
                                <Text style={styles.transDebit}>- ₹ 120</Text>
                            </View>
                        </View>

                    </ScrollView>

                    {/* BOTTOM NAVIGATION BAR */}
                    <View style={Theme === "light" ? styles.bottomTab : styles.bottomTabDark}>
                        <TouchableOpacity style={styles.tabItem}>
                            <Ionicons name="home" size={22} color="#2BB673" />
                            <Text style={[styles.tabText, { color: '#2BB673', fontWeight: '600' }]}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Transactions')}>
                            <Ionicons name="swap-horizontal" size={22} color="#95A5A6" />
                            <Text style={styles.tabText}>Transactions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabItem} onPress={() => { this.props.navigation.navigate('Reports') }}>
                            <Ionicons name="bar-chart-outline" size={22} color="#95A5A6" />
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
        backgroundColor: '#FAFAFA',
        marginTop: StatusBar.currentHeight
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for bottom navigation
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
        marginTop: StatusBar.currentHeight,
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
    balanceCard: {
        backgroundColor: '#0F8A50',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#0F8A50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balanceTitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
    },
    balanceAmount: {
        color: '#8ae8ff',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: 'rgba(255,255,255,0.6)',
    },
    statBox: {
        flex: 1,
    },
    statLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 15,
        marginBottom: 2,
    },
    income: {
        color: '#89c206',
        fontSize: 20,
        fontWeight: '700'
    },
    expenses: {
        color: 'rgba(250,10,50,0.9)',
        fontSize: 20,
        fontWeight: '700'
    },
    statDivider: {
        width: 2,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 15,
    },
    sectionTitleDark: {
        fontSize: 16,
        fontWeight: '700',
        color: "#A0A0A0",
        marginBottom: 15,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    actionButton: {
        backgroundColor: "#FFF",
        width: '47%',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    actionButtonDark: {
        backgroundColor: "#0F172A",
        width: '47%',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    actionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    actionTextDark: {
        fontSize: 14,
        fontWeight: '600',
        color: '#A0A0A0',
    },
    transactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        color: '#2BB673',
        fontWeight: '600',
    },
    transactionList: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    transactionListDark: {
        backgroundColor: '#0F172A',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FA',
    },
    transIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transDetails: {
        flex: 1,
    },
    transTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2C3E50',
    },
    transTitleDark: {
        fontSize: 15,
        fontWeight: '600',
        color: '#A0A0A0',
    },
    transDate: {
        fontSize: 12,
        color: '#95A5A6',
        marginTop: 2,
    },
    transCredit: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2BB673',
    },
    transDebit: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E74C3C',
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
    }
});