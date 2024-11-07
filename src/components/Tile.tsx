import { Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { capitalizeFirstLetter, pad } from '../utils'
import { BACKGROUND_BLUR_RADIUS, PALETTE } from '../consts'
import MyText from './MyText'
type TileProps = {
    pokemon: Pokemon
    imgOnly?: boolean
    imgSize?: number
}
const Tile = ({ pokemon, imgOnly = false, imgSize = 150 }: TileProps) => {
    return (
        <ImageBackground source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }} blurRadius={BACKGROUND_BLUR_RADIUS} style={styles.backgroundImg} >
            <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }} style={[styles.image, { height: imgSize, width: imgSize }]} />
            {
                !imgOnly &&
                <>
                    <MyText customStyle={styles.pkmnName}>
                        {capitalizeFirstLetter(pokemon.name)}
                    </MyText>
                    <MyText customStyle={styles.pkmnId}>
                        {pad(pokemon.id.toString(), 3)}
                    </MyText>
                </>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImg: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        margin: 10
    },
    pkmnName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pkmnId: {
        fontSize: 16,
    }
})

export default Tile