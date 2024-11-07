import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import SearchSvg from '../assets/svgs/SearchSvg'
import { PALETTE } from '../consts'

const MyTextInput = ({ onChange, value }: { onChange: (text: string) => void, value: string }) => {
    return (
        <View style={styles.container}>
            <SearchSvg />
            <TextInput
                style={styles.input}
                placeholder="Name or National Pokédex number"
                onChange={(v) => onChange(v.nativeEvent.text)}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9f2f3',
        padding: 15,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: PALETTE.primary,
    }
})

export default MyTextInput