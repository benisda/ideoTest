import { StyleSheet } from 'react-native'
import React from 'react'
import MyText from './MyText'

const H2 = ({ children }: { children: string }) => {
    return (
        <MyText customStyle={styles.title}>
            {children}
        </MyText>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default H2