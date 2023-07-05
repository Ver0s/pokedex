import {
	Text,
	View,
	FlatList,
	ActivityIndicator,
	StyleSheet,
	Button,
} from 'react-native';
import { useState, useEffect } from 'react';
import { getData } from '../utils/asyncStorage';
import { useIsFocused } from '@react-navigation/native';
import PokemonListItem from './PokemonListItem';

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
		<View>
			{favoritePokemonNames.length === 0 ? (
				<Text style={styles.noFavoritesText}>
					You have no favorite pokemons.
				</Text>
			) : (
				<FlatList
					data={favoritePokemonNames}
					renderItem={({ item }) => (
						<PokemonListItem
							pokemonName={item}
							highlightFavorite={false}
						/>
					)}
					keyExtractor={(item) => item}
					numColumns={3}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	noFavoritesText: {
		textAlign: 'center',
		marginTop: 30,
	},
});
