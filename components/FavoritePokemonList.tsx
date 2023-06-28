import {
	Text,
	View,
	FlatList,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import { getData } from '../utils/asyncStorage';
import { useIsFocused } from '@react-navigation/native';
import PokemonListItem from './PokemonListItem';

// async function getPokemonDataByNames(names: string[]) {
// 	try {
// 		const fetchedData: PokemonData[] = [];
// 		for (const name of names) {
// 			const response = await fetch(
// 				`https://pokeapi.co/api/v2/pokemon/${name}`
// 			);
// 			if (!response.ok) return;

// 			const json: PokemonData = await response.json();

// 			fetchedData.push(json);
// 		}
// 		return fetchedData;
// 	} catch (e) {
// 		throw e;
// 	}
// }

export default function FavoritePokemonList() {
	const [favoritePokemonNames, setFavoritePokemonNames] = useState<string[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
		async function getFavoritePokemonNames() {
			const names: string[] = await getData('FAVORITE_POKEMON');

			setFavoritePokemonNames(names);
			setIsLoading(false);
		}

		if (isFocused) {
			getFavoritePokemonNames();
		}
	}, [isFocused]);

	if (isLoading) return <ActivityIndicator size="large" />;

	return (
		<View style={styles.container}>
			{favoritePokemonNames.length === 0 ? (
				<Text>You have no favorite pokemons</Text>
			) : (
				<FlatList
					data={favoritePokemonNames}
					renderItem={({ item }) => (
						<PokemonListItem pokemonName={item} />
					)}
					keyExtractor={(item) => item}
					numColumns={3}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
