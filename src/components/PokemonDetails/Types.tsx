import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { PokedexContext } from '../../contexts/PokedexContext'
import { fetchPokemonData, getData, storeData } from '../../utils';

const Types = () => {
    const { currentPokemon } = useContext(PokedexContext);
    const [typesImagesUrls, setTypesImagesUrls] = useState<string[]>([]);
    useEffect(() => {
        if (currentPokemon) {
            (async () => {
                const pkmnData = await fetchPokemonData(currentPokemon.id);
                if (pkmnData) {
                    const types = await getTypesDetails(pkmnData.types);
                    const typesImages = types.map((type: any) => type.sprites['generation-viii']['legends-arceus'].name_icon);
                    setTypesImagesUrls(typesImages);
                }
            })();
        }
    }, [currentPokemon]);
    const getTypesDetails = async (types: any) => {
        let res = [];
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            const cachedType = await getData(type.type.url);
            if (cachedType) {
                res.push(cachedType);
            } else {
                const response = await fetch(type.type.url);
                const data = await response.json();
                await storeData(type.type.url, data);
                res.push(data);
            }
        }
        return res;
    }
    return (
        <View style={styles.typesContainer}>
            {typesImagesUrls.map((url) => (
                <Image source={{ uri: url }} style={styles.typeImage} key={url} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    typesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    typeImage: {
        width: 100,
        height: 25
    }
})

export default Types