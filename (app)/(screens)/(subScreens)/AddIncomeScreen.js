import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";

let Theme;
export default class AddIncomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: "",
            category: "payments",
            note: "",
            date: new Date(),
            uid: '',
            itemNo: 0,
            itemNoDaily: null,
            totalIncome: 0,
            totalBalance: 0,
            isThemeLoaded: false,
            isItemNoLoaded: false,
            isItemNoDailyLoaded: false,
            isTotalIncomeLoaded: false,
            isTotalBalanceLoaded: false
        };
    }

    async componentDidMount() {
        // Fetch the user's theme preference from the database and set it in the state
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        this.setState({ uid: uid });
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

        const month = this.state.date.getMonth() + 1;
        const year = this.state.date.getFullYear();
        const day = this.state.date.getDate();

        const itemNoRef = await ref(db, "users/" + uid + "/itemNo");
        onValue(itemNoRef, (snapshot) => {
            if (snapshot.exists()) {
                const itemNo = snapshot.val();
                this.setState({ itemNo: itemNo, isItemNoLoaded: true });
            }
            else {
                Alert.alert("Something went wrong");
            }
        });

        const itemNoDailyRef = await ref(db, "users/" + uid + "/itemNoDaily");
        onValue(itemNoDailyRef, (snapshot) => {
            if (snapshot.exists()) {
                const itemNoDaily = snapshot.val();
                this.setState({ itemNoDaily: itemNoDaily, isItemNoDailyLoaded: true });
            }
            else {
                Alert.alert("Something went wrong");
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

    getCategoryIcon() {
        switch (this.state.category) {
            case "Pocket Money":
                return "account-balance-wallet";

            case "Business":
                return "business";

            case "Win":
                return "celebration";

            case "Gift":
                return "card-giftcard";

            case "Investments":
                return "auto-graph";

            case "Rent":
                return "house";

            case "Scholarship":
                return "school";

            case "Free Lance":
                return "workspace-premium";

            case "Refund":
                return "refresh";

            case "Other":
                return "attach-money";
            default:
                return "payments";
        }
    }

    async addIncome() {
        if (this.state.title !== "" && this.state.category !== "" && parseFloat(this.state.amount) > 0) {
            // Logic to add Income to the database
            const uid = this.state.uid;
            const month = this.state.date.getMonth() + 1;
            const year = this.state.date.getFullYear();
            const day = this.state.date.getDate();
            const db = getDatabase();

            const incomesDataRef = await ref(db, "users/" + uid + "/transactions" + "/" + this.state.itemNo + "/data/" + this.state.itemNoDaily);
            try {
                set(incomesDataRef, {
                    category: this.state.category,
                    title: this.state.title,
                    amount: parseFloat(this.state.amount),
                    note: this.state.note,
                    type: "income",
                });

                const itemNoDailyRef = await ref(db, "users/" + uid + "/itemNoDaily");
                set(itemNoDailyRef, this.state.itemNoDaily + 1);

                const totalIncomeRef = await ref(db, "users/" + uid + "/totalIncome");
                set(totalIncomeRef, this.state.totalIncome + parseFloat(this.state.amount));

                const totalBalanceRef = await ref(db, "users/" + uid + "/totalBalance");
                set(totalBalanceRef, this.state.totalBalance + parseFloat(this.state.amount));

                Alert.alert("Income added successfully!");
            }
            catch (error) {
                Alert.alert("Error adding Income \n", error.message);
            }
        }
        else {
            Alert.alert("Please fill in all the required fields!!!.");
        }
    }

    render() {
        if (!this.state.isThemeLoaded && !this.state.isItemNoLoaded && !this.state.isItemNoDailyLoaded && !this.state.isTotalIncomeLoaded) {
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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
                            <Text style={Theme === "light" ? styles.header : styles.headerDark}>Add Income</Text>
                            <View style={styles.iconContainer}>
                                <MaterialIcons
                                    name={this.getCategoryIcon()}
                                    size={55}
                                    color="#0F8A50"
                                />
                            </View>

                            <Text style={Theme === "light" ? styles.label : styles.labelDark}>Category</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={this.state.category}
                                    onValueChange={(category) =>
                                        this.setState({ category })
                                    }
                                >
                                    <Picker.Item label="Payments" value="payments" />
                                    <Picker.Item label="Pocket Money" value="Pocket Money" />
                                    <Picker.Item label="Business" value="Business" />
                                    <Picker.Item label="Rewards" value="Win" />
                                    <Picker.Item label="Gift" value="Gift" />
                                    <Picker.Item label="Investments / Interests" value="Investments" />
                                    <Picker.Item label="Property Rent" value="Rent" />
                                    <Picker.Item label="Scholarship" value="Scholarship" />
                                    <Picker.Item label="Free Lancing" value="Free Lance" />
                                    <Picker.Item label="Refund" value="Refund" />
                                    <Picker.Item label="Other" value="Other" />

                                </Picker>
                            </View>

                            <Text style={Theme === "light" ? styles.label : styles.labelDark}>Title</Text>
                            <TextInput
                                style={Theme === "light" ? styles.input : styles.inputDark}
                                placeholder="Income Title"
                                placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                            />

                            <Text style={Theme === "light" ? styles.label : styles.labelDark}>Amount</Text>
                            <TextInput
                                style={Theme === "light" ? styles.input : styles.inputDark}
                                placeholder="Amount"
                                placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                keyboardType="numeric"
                                value={this.state.amount}
                                onChangeText={(amount) => this.setState({ amount })}
                            />

                            <Text style={Theme === "light" ? styles.label : styles.labelDark}>Note (Optional)</Text>
                            <TextInput
                                style={Theme === "light" ? styles.input : styles.inputDark}
                                placeholder="Add a note for your reference"
                                placeholderTextColor={Theme === "dark" ? "#A0A0A0" : "#5A5A5A"}
                                value={this.state.note}
                                onChangeText={(note) => this.setState({ note })}
                            />

                            <TouchableOpacity style={styles.button} onPress={() => this.addIncome()}>
                                <Text style={styles.buttonText}>Add Income</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA"
    },
    containerDark: {
        flex: 1,
        backgroundColor: "#050C1C"
    },
    header: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        color: '#2C3E50',
        marginBottom: 30,
    },
    headerDark: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        color: '#A0A0A0',
        marginBottom: 30,
    },

    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#DDF6EA",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 30,
    },

    label: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 5,
        marginTop: 18,
    },
    labelDark: {
        fontSize: 16,
        fontWeight: '700',
        color: "#A0A0A0",
        marginBottom: 5,
        marginTop: 18,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 54,
        fontSize: 16,
        color: '#0F172A',
    },
    inputDark: {
        backgroundColor: '#0F172A',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 54,
        fontSize: 16,
        color: '#A0A0A0',
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#8895b4",
    },

    button: {
        height: 55,
        backgroundColor: "#22A467",
        shadowColor: "#22A467",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "550",
    },
});