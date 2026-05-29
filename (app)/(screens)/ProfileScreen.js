import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
} from "react-native";
import {
    MaterialIcons,
    Feather,
    Ionicons,
} from "@expo/vector-icons";

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.heading}>Profile</Text>

                    {/* Profile Card */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileRow}>
                            <Image
                                source={{
                                    uri: "https://i.pravatar.cc/300",
                                }}
                                style={styles.avatar}
                            />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.name}>Atharva Gupta</Text>
                                <Text style={styles.email}>
                                    atharva1808@gmail.com
                                </Text>

                                <View style={styles.badge}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.badgeText}>
                                        Smart Saver
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.listButton}>
                                <Feather name="list" size={18} color="#111" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Account Overview */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                            Account Overview
                        </Text>

                        <View style={styles.overviewContainer}>
                            <View style={styles.item}>
                                <View style={[styles.iconCircle, { backgroundColor: "#E8F7EF" }]}>
                                    <Ionicons name="wallet-outline" size={24} color="#0F8A50" />
                                </View>

                                <Text style={styles.label}>Balance</Text>
                                <Text style={styles.greenAmount}>₹24,750</Text>
                            </View>

                            <View style={styles.item}>
                                <View style={[styles.iconCircle, { backgroundColor: "#E8F7EF" }]}>
                                    <Ionicons name="arrow-down" size={24} color="#0F8A50" />
                                </View>

                                <Text style={styles.label}>Income</Text>
                                <Text style={styles.greenAmount}>₹40,000</Text>
                            </View>

                            <View style={styles.item}>
                                <View style={[styles.iconCircle, { backgroundColor: "#FFF0F0" }]}>
                                    <Ionicons name="arrow-up" size={24} color="#FF5C5C" />
                                </View>

                                <Text style={styles.label}>Expenses</Text>
                                <Text style={styles.redAmount}>₹15,250</Text>
                            </View>

                            <View style={styles.item}>
                                <View style={[styles.iconCircle, { backgroundColor: "#EEF2FF" }]}>
                                    <Feather name="bar-chart-2" size={22} color="#5B7FFF" />
                                </View>

                                <Text style={styles.label}>Transactions</Text>
                                <Text style={styles.blueAmount}>128</Text>
                            </View>
                        </View>
                    </View>

                    {/* Options */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                            Profile Options
                        </Text>

                        <TouchableOpacity style={styles.option} onPress={() => { this.props.navigation.navigate("PersonalInfo") }}>
                            <View style={styles.optionLeft}>
                                <Ionicons name="person-outline" size={24} color="#0F8A50"/>
                                <View>
                                    <Text style={styles.optionTitle}>Personal Information</Text>
                                    <Text style={styles.optionSubtitle}>Update your personal details</Text>
                                </View>
                            </View>
                            <Feather name="chevron-right" size={22} color="#888"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={() => { this.props.navigation.navigate("ForgotPassword") }}>
                            <View style={styles.optionLeft}>
                                <Ionicons name="shield-checkmark-outline" size={24} color="#0F8A50"/>
                                <View>
                                    <Text style={styles.optionTitle}>Security</Text>
                                    <Text style={styles.optionSubtitle}>Change your password and secure your account</Text>
                                </View>
                            </View>
                            <Feather name="chevron-right" size={22} color="#888"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={() => { this.props.navigation.navigate("Theme") }}>
                            <View style={styles.optionLeft}>
                                <Ionicons name="color-palette-outline" size={24} color="#0F8A50"/>
                                <View>
                                    <Text style={styles.optionTitle}>Theme</Text>
                                    <Text style={styles.optionSubtitle}>Change app appearance</Text>
                                </View>
                            </View>
                            <Feather name="chevron-right" size={22} color="#888"/>
                        </TouchableOpacity>
                    </View>

                    {/* Logout */}
                    <TouchableOpacity style={styles.logoutButton} onPress={()=>{this.logout()}}>
                        <MaterialIcons
                            name="logout"
                            size={24}
                            color="#FF5A5A"
                        />

                        <Text style={styles.logoutText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* BOTTOM NAVIGATION BAR */}
                <View style={styles.bottomTab}>
                    <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Home')}>
                        <Ionicons name="home-outline" size={22} color="#95A5A6" />
                        <Text style={styles.tabText}>Home</Text>
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
                        <Ionicons name="person" size={22} color="#2BB673" />
                        <Text style={[styles.tabText], { color: '#2BB673', fontWeight: '600' }}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for bottom navigation
    },
    heading: {
        fontSize: 34,
        fontWeight: "600",
        marginBottom: 20,
        color: "#111827",
    },

    profileCard: {
        backgroundColor: "#0F8A50",
        borderRadius: 28,
        padding: 20,
        marginBottom: 20,
    },

    profileRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 15,
    },

    name: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FAFAFA",
    },

    email: {
        color: "#E8FFF4",
        marginTop: 4,
        fontSize: 14,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.15)",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
    },

    badgeText: {
        color: "#fff",
        marginLeft: 6,
        fontWeight: "600",
    },

    listButton: {
        backgroundColor: "#fff",
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 18,
        marginBottom: 18,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 18,
        color: "#111827",
    },

    overviewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    item: {
        alignItems: "center",
        flex: 1,
    },

    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    label: {
        fontSize: 14,
        color: "#666",
    },

    greenAmount: {
        color: "#0F8A50",
        fontWeight: "700",
        marginTop: 4,
    },

    redAmount: {
        color: "#FF5C5C",
        fontWeight: "700",
        marginTop: 4,
    },

    blueAmount: {
        color: "#5B7FFF",
        fontWeight: "700",
        marginTop: 4,
    },

    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1",
    },

    optionLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },

    optionTitle: {
        fontSize: 17,
        fontWeight: "600",
    },

    optionSubtitle: {
        color: "#888",
        marginTop: 3,
    },

    logoutButton: {
        backgroundColor: "#fff",
        borderRadius: 24,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
        gap: 8,
    },

    logoutText: {
        color: "#FF5A5A",
        fontSize: 20,
        fontWeight: "600",
    },
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        marginTop: StatusBar.currentHeight
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