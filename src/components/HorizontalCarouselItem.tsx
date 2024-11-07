import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MyText from './MyText'

type Props = {
    callback: () => void
    text: string
    selected?: boolean
}

const HorizontalCarouselItem = ({ callback, text, selected }: Props) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.container}>
            <MyText customStyle={[styles.text, selected && { fontWeight: 'bold' }]}>{text}</MyText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: 50,
    },
    text: {
        fontSize: 24,
    }
})

export default HorizontalCarouselItem