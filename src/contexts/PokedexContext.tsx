import { createContext, useEffect, useState } from "react";

type PokedexContextType = {
    currentPokemon?: any;
    setCurrentPokemon?: (pokemon: Pokemon) => void;
    pokemonList: Pokemon[];
}

export const PokedexContext = createContext<PokedexContextType>({
    pokemonList: []
});

const PokedexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | undefined>(undefined);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    useEffect(() => {
        (async () => {
            let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
            let data = await response.json();
            setPokemonList(data.results.map((pokemon: { name: string }, index: number) => ({ id: index + 1, name: pokemon.name })));
        })();
    }, []);
    return <PokedexContext.Provider value={{ currentPokemon, setCurrentPokemon, pokemonList }}>{children}</PokedexContext.Provider>;
};

export default PokedexProvider;