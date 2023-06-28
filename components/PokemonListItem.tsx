import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import useFetch from '../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import type { PokemonResult, PokemonData } from './components.types';

type PokemonListItemProps = {
	pokemonInfo: PokemonResult;
};

	pokemonName,
}: PokemonListItemProps) {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

	const { data, isLoading, error } = useFetch<PokemonData>(url);
	const navigation = useNavigation();

	if (error) return <p>There is an error: {error}</p>;

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('PokemonDetails', {
					pokemonData: data,
				})
			}
		>
			<View style={styles.container}>
				<Image
					source={{ uri: data?.sprites.other.home.front_default }}
					style={styles.image}
				/>

				<Text style={styles.pokemonName}>{data?.name}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		padding: 1,
	},
	image: {
		width: 100,
		height: 100,
	},
	pokemonName: {
		fontWeight: 'bold',
	},
});
