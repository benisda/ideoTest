import { useContext, useEffect, useRef, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import Tile from "../components/Tile";
import { DEFALUT_SCREEN_H_PADDING } from "../consts";
import H1 from "../components/H1";
import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import { PokedexContext } from "../contexts/PokedexContext";
import PokedexTile from "../components/PokedexTile";
import { extractIdFromUrl, fetchPokemonData, fetchPokemonSpeciesData } from "../utils";

const LIST_GAP = DEFALUT_SCREEN_H_PADDING;
const BULK_SIZE = 20;

const Home = ({ navigation }: any) => {
    const [page, setPage] = useState(1);
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [search, setSearch] = useState('')
    const pokedexContext = useContext(PokedexContext);
    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
        initPokedex();
    }, [])
    const proccessPokemons = (rawPokemons: any[]) => {
        return rawPokemons.map((pokemon: any) => {
            return {
                id: extractIdFromUrl(pokemon.url),
                name: pokemon.name
            }
        })
    }

    const fetchPokemons = async (offset: number) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${BULK_SIZE}&offset=${offset * BULK_SIZE}`)
        const data = await response.json()
        return proccessPokemons(data.results)
    }

    const initPokedex = async () => {
        setPokemons(await fetchPokemons(0))
        setPage(1);
    }

    const loadNextPage = async () => {
        setPokemons([...pokemons, ...(await fetchPokemons(page))])
        setPage(page + 1)
    }

    const handleSearch = async (search: string) => {
        flatListRef.current?.scrollToOffset({ animated: false, offset: 0 })
        setPage(0);
        setSearch(search);
        if (search === '') {
            initPokedex();
            return;
        }
        let res = [];
        for (let i = 0; i < pokedexContext.pokemonList.length; i++) {
            if (pokedexContext.pokemonList[i].name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || pokedexContext.pokemonList[i].id.toString().includes(search)) {
                res.push(pokedexContext.pokemonList[i])
            }
        }
        setPokemons(res);
    }

    const handleEndReached = () => {
        if (search === '') {
            loadNextPage();
        }
    }

    const tilePressHandler = async (pokemon: Pokemon) => {
        const data = await fetchPokemonData(pokemon.id);
        const sData = await fetchPokemonSpeciesData(pokemon.id);
        if (data && sData) {
            pokedexContext?.setCurrentPokemon?.({
                ...data,
                ...sData
            })
            navigation.navigate('Details')
        }
    }
    return (
        <View style={styles.container}>
            <H1>
                Pokédex
            </H1>
            <MyText customStyle={{ fontSize: 16 }}>
                Select a Pokémon by its name or using it's National Pokédex number.
            </MyText>
            <MyTextInput
                value={search}
                onChange={handleSearch}
            />
            <FlatList
                ref={flatListRef}
                data={pokemons}
                renderItem={({ item }) => <PokedexTile pokemon={item} onPress={() => tilePressHandler(item)} />}
                numColumns={2}
                extraData={pokemons}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                contentContainerStyle={{ gap: LIST_GAP }}
                columnWrapperStyle={{ gap: LIST_GAP }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: DEFALUT_SCREEN_H_PADDING,
        gap: 15
    }
})
export default Home