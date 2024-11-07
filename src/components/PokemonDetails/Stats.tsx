import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { PokedexContext } from '../../contexts/PokedexContext'
import Stat from './Stat';

const Stats = () => {
    const { currentPokemon } = useContext(PokedexContext);

    return (
        <>
            {currentPokemon?.stats?.map((stat: any) => <Stat key={stat.stat.name} statName={stat.stat.name} statValue={stat.base_stat} />)}
        </>
    )
}

export default Stats