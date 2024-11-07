import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { PALETTE } from '../consts'
import MyText from './MyText'

const H1 = ({ children }: { children: string }) => {
    return (
        <MyText customStyle={styles.title}>
            {children}
        </MyText>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    }
})

export default H1