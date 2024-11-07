import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Tile from './Tile'
type TileProps = {
    pokemon: Pokemon
    onPress: () => void
}
const PokedexTile = ({ pokemon, onPress }: TileProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Tile pokemon={pokemon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 250,
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 15,
        overflow: 'hidden'
    }
})

export default PokedexTile