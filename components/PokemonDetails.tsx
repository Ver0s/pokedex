import { Image, View, StyleSheet, Button } from 'react-native';
import { addToFavorites, removeFromFavorites } from '../utils/asyncStorage';
import { isPokemonFavorite } from '../utils/asyncStorage';
import { useEffect, useState } from 'react';
import { capitaLizeFirstLetter } from '../utils/textUtils';

export default function PokemonDetails({ route, navigation }) {
	const [isFavorite, setIsFavorite] = useState(false);
	const { pokemonData } = route.params;

	useEffect(() => {
		navigation.setOptions({
			title: capitaLizeFirstLetter(pokemonData.name),
		});

		async function checkFavorite() {
			const bool = await isPokemonFavorite(pokemonData.name);

			setIsFavorite(bool);
		}

		checkFavorite();
	}, []);

	async function handleFavoritePress() {
		setIsFavorite(!isFavorite);

		if (isFavorite) {
			await removeFromFavorites(pokemonData.name);
		} else {
			await addToFavorites(pokemonData.name);
		}
	}

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: pokemonData?.sprites.other.home.front_default }}
				style={styles.image}
			/>
			<Button
				title={
					isFavorite ? 'Remove from favorites' : 'Add to favorites'
				}
				onPress={handleFavoritePress}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
	},
	image: {
		width: 200,
		height: 200,
	},
	pokemonName: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
