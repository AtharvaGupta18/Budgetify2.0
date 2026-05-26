import * as React from 'react';
import { View, Text } from 'react-native'; 

export default function OneScreen () {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>One Screen</Text>
        </View>
    );
}