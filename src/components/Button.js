import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

export default function Button({ text, buttonSyle, onPress, textStyle }) {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={buttonSyle}
            >
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        </>
    )
}

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string,
    buttonSyle: PropTypes.any,
    textColor: PropTypes.any,
}