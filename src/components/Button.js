import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button({ text, buttonSyle, onPress, textColor }) {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={buttonSyle}
            >
                <Text style={textColor}>{text}</Text>
            </TouchableOpacity>
        </>
    )
}

Button.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    text: React.PropTypes.string,
    buttonSyle: React.PropTypes.any,
    textColor: React.PropTypes.any,
}