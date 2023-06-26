import AsyncStorage from '@react-native-async-storage/async-storage';

type favoritePokemonArray = string[];

const FAVORITE_POKEMON = 'FAVORITE_POKEMON';

export async function addToFavorites(name: string) {
	if (await isPokemonInStorage(name)) return;

	try {
		const pokemonArray: favoritePokemonArray =
			(await getData(FAVORITE_POKEMON)) ?? [];

		pokemonArray.push(name);

		await AsyncStorage.setItem(
			FAVORITE_POKEMON,
			JSON.stringify(pokemonArray)
		);
	} catch (e) {
		throw e;
	}
}

export async function getData(key: 'FAVORITE_POKEMON') {
	try {
		const jsonValue = await AsyncStorage.getItem(key);

		return jsonValue !== null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		throw e;
	}
}

export async function clearStorage() {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		throw e;
	}
	console.log('Async storage cleared');
}

async function isPokemonInStorage(name: string) {
	const pokemonArray: favoritePokemonArray = await getData(FAVORITE_POKEMON);
	if (!pokemonArray) return false;

	return pokemonArray.some((pokemonName) => pokemonName === name);
}
