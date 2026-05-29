import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class ReportsScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Transaction Screen</Text>
                </View>

                {/* BOTTOM NAVIGATION BAR */}
                <View style={styles.bottomTab}>
                    <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Home')}>
                        <Ionicons name="home-outline" size={22} color="#95A5A6"/>
                        <Text style={styles.tabText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Transactions')}>
                        <Ionicons name="swap-horizontal" size={22} color="#2BB673" />
                        <Text style={[styles.tabText], { color: '#2BB673', fontWeight: '600' }}>Transactions</Text>
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

const styles = StyleSheet.create({
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
        width: 95,
    },
    tabText: {
        fontSize: 10,
        color: '#95A5A6',
        marginTop: 4,
    },
});