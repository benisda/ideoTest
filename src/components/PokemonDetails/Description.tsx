import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import MyText from '../MyText'
import { PokedexContext } from '../../contexts/PokedexContext'

const Description = () => {
    const pokedexContext = useContext(PokedexContext);
    const getLastDescription = () => {
        if (!pokedexContext.currentPokemon?.flavor_text_entries) return '';
        for (let i = pokedexContext.currentPokemon?.flavor_text_entries.length - 1; i >= 0; i--) {
            if (pokedexContext.currentPokemon?.flavor_text_entries[i].language.name === 'en') {
                return pokedexContext.currentPokemon?.flavor_text_entries[i].flavor_text
            }
        }
    }
    return (
        <MyText customStyle={styles.description}>
            {getLastDescription()}
        </MyText>
    )
}

const styles = StyleSheet.create({
    description: {
        fontSize: 16,
        textAlign: 'center',
    }
})

export default Description