import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { PokedexContext } from '../../contexts/PokedexContext'
import Tile from '../Tile';
import { extractIdFromUrl } from '../../utils';

const Froms = ({ changeImageCallback }: any) => {
    const pokedexContext = useContext(PokedexContext);
    const allForms = useMemo(() => {
        if (!pokedexContext.currentPokemon) return [];
        return pokedexContext.currentPokemon.varieties.map((variety: any) => {
            return {
                id: extractIdFromUrl(variety.pokemon.url),
                name: variety.pokemon.name,
            }
        });
    }, [pokedexContext.currentPokemon]);
    const [selectedForm, setSelectedForm] = useState(allForms[0].id);
    const onPressHandler = (form: any) => {
        setSelectedForm(form.id);
        changeImageCallback(form);
    }
    return (
        <FlatList
            data={allForms}
            renderItem={({ item }) => {
                return <TouchableOpacity onPress={() => onPressHandler(item)} style={[styles.tileContainer, { opacity: selectedForm === item.id ? 1 : 0.5 }]}>
                    <Tile pokemon={item} imgOnly imgSize={100} />
                </TouchableOpacity>
            }
            }
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={{ padding: 10, gap: 10 }}
        />
    )
}

const styles = StyleSheet.create({
    tileContainer: {
        height: 150,
        width: 150,
        borderRadius: 15,
        overflow: 'hidden',
    }
})

export default Froms