import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MyText from '../MyText';
import { capitalizeFirstLetter } from '../../utils';

type StatProps = {
    statName: string,
    statValue: number
}

const STAT_MAX = 255;

const Stat = ({ statName, statValue = 0 }: StatProps) => {
    const valuePercentage = (statValue / STAT_MAX) * 100;
    const colorTranslator = (value: number) => {
        if (value < 20) {
            return '#D37676';
        } else if (value < 30) {
            return '#EBC49F';
        } else {
            return '#B0C5A4';
        }
    }
    return (
        <View style={styles.container}>
            <MyText customStyle={{ fontSize: 16 }}>{capitalizeFirstLetter(statName)}</MyText>
            <View style={styles.barBackground}>
                <View style={[styles.bar, { width: `${valuePercentage}%`, backgroundColor: colorTranslator(valuePercentage) }]}></View>
                <MyText customStyle={{ position: 'absolute', right: 5 }}>{statValue.toString() ?? ''}</MyText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    barBackground: {
        height: 20,
        width: 200,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    bar: {
        height: '100%',
        backgroundColor: 'green'
    }
})

export default Stat