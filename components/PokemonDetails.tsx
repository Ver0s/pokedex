import { Text, Image, View, StyleSheet, Button } from 'react-native';
import { addToFavorites, getData, clearStorage } from '../utils/asyncStorage';

export default function PokemonDetails({ route }) {
	const { pokemonData } = route.params;

	return (
		<View style={styles.container}>
			<Text>{pokemonData.name}</Text>
			<Image
				source={{ uri: pokemonData?.sprites.other.home.front_default }}
				style={styles.image}
			/>
			<Button
				title="Add To Favorites"
				onPress={async () => {
					addToFavorites(pokemonData.name);
				}}
			/>
			<Button
				title="Log storage"
				onPress={async () => {
					const storage = await getData('FAVORITE_POKEMON');
					console.log(storage);
				}}
			/>
			<Button
				title="Clear storage"
				onPress={async () => {
					clearStorage();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: 200,
		height: 200,
	},
});
