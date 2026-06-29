import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Alert, FlatList } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { SafeAreaView } from 'react-native-safe-area-context';

let Theme;
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isThemeLoaded: false,
            name: '',
            itemNo: null,
            data: [],
            totalExpense: 0,
            totalIncome: 0,
            totalBalance: 0,
            isDataFound: false,
            isDataLoaded: false,
            isTotalExpenseLoaded: false,
            isTotalIncomeLoaded: false,
            isTotalBalanceLoaded: false
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
            }
        });

        //get item no
        let itemNo;
        const itemNoRef = await ref(db, "users/" + uid + "/itemNo");
        onValue(itemNoRef, (snapshot) => {
            if (snapshot.exists()) {
                itemNo = snapshot.val();
                this.setState({ itemNo: itemNo });
            } else {
                Alert.alert("An error occured");
            }
        });

        //get today's transaction data
        const dataRef = await ref(db, "users/" + uid + "/transactions/" + itemNo + "/data");
        onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                this.setState({ data: data, isDataFound: true, isDataLoaded: true });
            }
            else {
                this.setState({ isDataFound: false, isDataLoaded: true });
            }
        });

        const totalExpenseRef = await ref(db, "users/" + uid + "/totalExpenses");
        onValue(totalExpenseRef, (snapshot) => {
            if (snapshot.exists()) {
                const totalExpenses = snapshot.val();
                this.setState({ totalExpense: totalExpenses, isTotalExpenseLoaded: true });
            } else {
                set(totalExpenseRef, 0);
            }
        });

        const totalIncomeRef = await ref(db, "users/" + uid + "/totalIncome");
        onValue(totalIncomeRef, (snapshot) => {
            if (snapshot.exists()) {
                const totalIncomes = snapshot.val();
                this.setState({ totalIncome: totalIncomes, isTotalIncomeLoaded: true });
            } else {
                set(totalIncomeRef, 0);
            }
        });

        const totalBalanceRef = await ref(db, "users/" + uid + "/totalBalance");
        onValue(totalBalanceRef, (snapshot) => {
            if (snapshot.exists()) {
                const totalBalance = snapshot.val();
                this.setState({ totalBalance: totalBalance, isTotalBalanceLoaded: true });
            } else {
                set(totalBalanceRef, 0);
            }
        });
    }

    renderItem = ({ item }) => {
        return (
            <View style={Theme === "light" ? styles.itemContainer : styles.itemContainerDark}>
                <View style={styles.leftContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: item.type === "income" ? "#DDF6EA" : "#FDE6E6" }]}>
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

                <Text style={[styles.amount, { color: item.type === "income" ? "#0F8A50" : "#F44336" }]}>
                    {item.type === "income" ? "+" : "-"} ₹{" "}
                    {Number(item.amount).toLocaleString()}
                </Text>
            </View>
        );
    };

    render() {
        if (!this.state.isThemeLoaded && this.state.name !== '' && !this.state.isDataLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0F8A50" />
                    </View>
                </SafeAreaView>
            )
        } else if (!this.state.isDataFound && !this.state.isThemeLoaded && this.state.name !== '' && !this.state.isDataLoaded) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: Theme === "light" ? "#FAFAFA" : "#050C1C", marginTop: - (StatusBar.currentHeight + 10) }}>
                    <StatusBar backgroundColor={Theme === "light" ? "#FAFAFA" : "#050C1C"} />

                    {/* HEADER SECTION */}
                    <View style={styles.header}>
                        <View>
                            <Text style={Theme === "light" ? styles.welcomeText : styles.welcomeTextDark}>Welcome, {this.state.name}</Text>
                            <Text style={Theme === "light" ? styles.subWelcomeText : styles.subWelcomeTextDark}>Good to see you again!</Text>
                        </View>
                    </View>

                    <View style={styles.scrollContent}>

                        {/* BALANCE CARD */}
                        <View style={styles.balanceCard}>
                            <View style={styles.balanceHeader}>
                                <Text style={styles.balanceTitle}>Total Balance</Text>
                            </View>
                            <Text style={styles.balanceAmount}>₹ {this.state.totalBalance}</Text>

                            <View style={styles.statsContainer}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Income</Text>
                                    <Text style={styles.income}>₹ {this.state.totalIncome}</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Expenses</Text>
                                    <Text style={styles.expenses}>₹ {this.state.totalExpense}</Text>
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
                            <Text>Data Not found</Text>
                        </View>

                    </View>

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
        else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: Theme === "light" ? "#FAFAFA" : "#050C1C", marginTop: - (StatusBar.currentHeight + 10) }}>
                    <StatusBar backgroundColor={Theme === "light" ? "#FAFAFA" : "#050C1C"} />

                    <ScrollView>
                        {/* HEADER SECTION */}
                        <View style={styles.header}>
                            <View>
                                <Text style={Theme === "light" ? styles.welcomeText : styles.welcomeTextDark}>Welcome, {this.state.name}</Text>
                                <Text style={Theme === "light" ? styles.subWelcomeText : styles.subWelcomeTextDark}>Good to see you again!</Text>
                            </View>
                        </View>

                        <View style={styles.scrollContent}>

                            {/* BALANCE CARD */}
                            <View style={styles.balanceCard}>
                                <View style={styles.balanceHeader}>
                                    <Text style={styles.balanceTitle}>Total Balance</Text>
                                </View>
                                <Text style={styles.balanceAmount}>₹ {this.state.totalBalance}</Text>

                                <View style={styles.statsContainer}>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>Income</Text>
                                        <Text style={styles.income}>₹ {this.state.totalIncome}</Text>
                                    </View>
                                    <View style={styles.statDivider} />
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>Expenses</Text>
                                        <Text style={styles.expenses}>₹ {this.state.totalExpense}</Text>
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
                                <FlatList
                                    data={this.state.data}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={() => <View style={Theme==="light"?styles.separator:styles.separatorDark} />}
                                />
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

    listContent: {
        paddingVertical: 8,
    },

    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        backgroundColor: "#fff",
    },

    itemContainerDark: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        backgroundColor: "#0F172A",
    },

    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
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
        fontSize: 16,
        fontWeight: "700",
    },

    separator: {
        height: 1,
        backgroundColor: "#1E293B",
        marginLeft: 82,
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
    separator: {
        height: 1,
        backgroundColor: "#black"
    },
    separatorDark: {
        height: 1,
        backgroundColor: "white"
    },
});