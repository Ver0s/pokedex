import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_POKEMON = 'FAVORITE_POKEMON';
type allowedKeys = typeof FAVORITE_POKEMON;
type favoritePokemonArray = string[];

export async function addToFavorites(name: string) {
	if (await isPokemonFavorite(name)) return;

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

export async function removeFromFavorites(name: string) {
	const pokemonArray: favoritePokemonArray = await getData(FAVORITE_POKEMON);
	if (pokemonArray.length === 0 || pokemonArray === null) return;

	try {
		const removed = pokemonArray.filter(
			(pokemonName) => pokemonName !== name
		);

		await AsyncStorage.setItem(FAVORITE_POKEMON, JSON.stringify(removed));
	} catch (e) {
		throw e;
	}
}

export async function getData(key: allowedKeys) {
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

export async function isPokemonFavorite(name: string) {
	const pokemonArray: favoritePokemonArray = await getData(FAVORITE_POKEMON);
	if (!pokemonArray) return false;

	return pokemonArray.some((pokemonName) => pokemonName === name);
}
