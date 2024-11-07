import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const pad = (num: string, size: number) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export const extractIdFromUrl = (url: string) => {
    return parseInt(url.split('/')[6]);
}

export const fetchPokemonData = async (id: number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return await response.json();
    } catch (e) {
        Alert.alert('Error', 'An error occurred while fetching the data');
    }
}

export const fetchPokemonSpeciesData = async (id: number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        return await response.json();
    } catch (e) {
        Alert.alert('Error', 'An error occurred while fetching the data');
    }
}

export const storeData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getData = async (key: string,) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};