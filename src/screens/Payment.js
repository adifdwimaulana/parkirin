import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Image, Dimensions, SafeAreaView } from 'react-native';


export default class Payment extends React.Component {
    render() {
        return (
            <View>
                <Text>Payment</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}