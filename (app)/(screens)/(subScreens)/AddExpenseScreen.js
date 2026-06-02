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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";

let Theme;
export default class AddExpenseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: "",
            category: "Groceries",
            note: "",
            date: new Date(),
            isThemeLoaded: false,
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


    getCategoryIcon() {
        switch (this.state.category) {
            case "Groceries":
                return "shopping-cart";

            case "Food":
                return "restaurant";

            case "Transport":
                return "directions-car";

            case "Rent":
                return "home";

            case "Health":
                return "favorite";

            case "Entertainment":
                return "movie";

            case "Utilities":
                return "electric-bolt";

            default:
                return "payments";
        }
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
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
                        <Text style={Theme === "light" ? styles.header : styles.headerDark}>Add Expense</Text>
                        <View style={styles.iconContainer}>
                            <MaterialIcons
                                name={this.getCategoryIcon()}
                                size={55}
                                color="#E45B5B"
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
                                <Picker.Item label="Groceries" value="Groceries" />
                                <Picker.Item label="Food" value="Food" />
                                <Picker.Item label="Transport" value="Transport" />
                                <Picker.Item label="Rent" value="Rent" />
                                <Picker.Item label="Health" value="Health" />
                                <Picker.Item
                                    label="Entertainment"
                                    value="Entertainment"
                                />
                                <Picker.Item label="Utilities" value="Utilities" />
                            </Picker>
                        </View>

                        <Text style={Theme === "light" ? styles.label : styles.labelDark}>Title</Text>
                        <TextInput
                            style={Theme === "light" ? styles.input : styles.inputDark}
                            placeholder="Expenditure Title"
                            value={this.state.title}
                            onChangeText={(title) => this.setState({ title })}
                        />

                        <Text style={Theme === "light" ? styles.label : styles.labelDark}>Amount</Text>
                        <TextInput
                            style={Theme === "light" ? styles.input : styles.inputDark}
                            placeholder="1250"
                            keyboardType="numeric"
                            value={this.state.amount}
                            onChangeText={(amount) => this.setState({ amount })}
                        />

                        <Text style={Theme === "light" ? styles.label : styles.labelDark}>Note (Optional)</Text>
                        <TextInput
                            style={Theme === "light" ? styles.input : styles.inputDark}
                            placeholder="Monthly groceries"
                            value={this.state.note}
                            onChangeText={(note) => this.setState({ note })}
                        />

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Add Expense</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
        backgroundColor: "#FDEAEA",
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
        marginTop: 10,
    },
    labelDark: {
        fontSize: 16,
        fontWeight: '700',
        color: "#A0A0A0",
        marginBottom: 5,
        marginTop: 10,
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
		backgroundColor: '#b0bea0',
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
        backgroundColor:"#b0bea0"
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
        marginTop: 20,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "550",
    },
});