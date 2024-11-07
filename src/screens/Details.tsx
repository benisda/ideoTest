import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { PokedexContext } from '../contexts/PokedexContext'
import H2 from '../components/H2';
import { capitalizeFirstLetter, pad } from '../utils';
import BackArrowSvg from '../assets/svgs/BackArrowSvg';
import { DEFALUT_SCREEN_H_PADDING } from '../consts';
import MyText from '../components/MyText';
import Tile from '../components/Tile';
import Forms from '../components/PokemonDetails/Forms';
import Description from '../components/PokemonDetails/Description';
import Types from '../components/PokemonDetails/Types';
import Stats from '../components/PokemonDetails/Stats';
import Abilities from '../components/PokemonDetails/Abilities';
import HorizontalCarouselItem from '../components/HorizontalCarouselItem';



const Details = ({ navigation }: any) => {
    const [selectedDetail, setSelectedDetail] = useState('forms');
    const pokedexContext = useContext(PokedexContext);
    const detailedPokemon = pokedexContext?.currentPokemon;
    const [tilePokemon, setTilePokemon] = useState<any>(pokedexContext.currentPokemon);
    const horizontalDetailsConfig = [
        { label: 'Illustrations', value: 'forms' },
        { label: 'Description', value: 'details' },
        { label: 'Types', value: 'types' },
        { label: 'Stats', value: 'stats' },
        { label: 'Abilities', value: 'abilities' },
    ]

    const changeImage = (form: any) => {
        setTilePokemon(form);
    }

    const detailsComponentTranlator: Record<string, JSX.Element> = {
        forms: <Forms changeImageCallback={changeImage} />,
        details: <Description />,
        types: <Types />,
        stats: <Stats />,
        abilities: <Abilities />
    };

    const getJapaneseName = () => {
        if (!detailedPokemon) return '';
        const japaneseName = detailedPokemon.names.find((name: any) => name.language.name === 'ja');
        return japaneseName.name;
    }
    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <View style={styles.firstRowPlaceholder} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackArrowSvg height={36} width={36} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <H2>{capitalizeFirstLetter(pokedexContext?.currentPokemon?.name ?? '')}</H2>
                    <MyText customStyle={{ fontSize: 16 }}>{getJapaneseName() ?? ''}</MyText>
                    <MyText customStyle={{ fontSize: 16 }}>{pad(pokedexContext?.currentPokemon?.id.toString() ?? '', 3)}</MyText>
                </View>
                <View style={styles.firstRowPlaceholder} />
            </View>
            {
                pokedexContext.currentPokemon &&
                <View style={styles.imgContainer}>
                    <Tile pokemon={tilePokemon} imgOnly={true} imgSize={250} />
                </View>
            }
            <FlatList
                data={horizontalDetailsConfig}
                contentContainerStyle={{ height: 50 }}
                renderItem={({ item }: any) => (
                    <HorizontalCarouselItem callback={() => setSelectedDetail(item.value)} text={item.label} selected={selectedDetail === item.value} />
                )}
                horizontal={true}
            />
            {detailsComponentTranlator[selectedDetail]}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: DEFALUT_SCREEN_H_PADDING,
        gap: 20
    },
    imgContainer: {
        height: 400,
        width: '100%',
        margin: 10,
        borderRadius: 25,
        overflow: 'hidden'
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    firstRowPlaceholder: {
        width: 50
    }
})

export default Details