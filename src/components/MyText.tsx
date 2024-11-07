import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { PALETTE } from '../consts'

const MyText = ({ customStyle, children }: { customStyle?: object, children: string }) => {
    return (
        <Text style={[styles.text, customStyle]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: PALETTE.primary
    }
})

export default MyText