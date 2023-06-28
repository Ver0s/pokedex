import { memo } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import useFetch from '../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import type { PokemonData } from './components.types';
import { capitaLizeFirstLetter } from '../utils/textUtils';

type PokemonListItemProps = {
	pokemonName: string;
};

export default memo(function PokemonListItem({
	pokemonName,
}: PokemonListItemProps) {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

	const { data, isLoading, error } = useFetch<PokemonData>(url);
	const navigation = useNavigation();

	if (error) return <p>There is an error: {error}</p>;

	return (
		<Pressable
			onPress={() =>
				navigation.navigate('PokemonDetails', {
					pokemonData: data,
				})
			}
			style={styles.card}
		>
			{isLoading ? (
				<ActivityIndicator
					size="small"
					style={{ width: '100%', height: '80%' }}
				/>
			) : (
				<Image
					source={{ uri: data?.sprites.other.home.front_default }}
					style={styles.image}
				/>
			)}
			<Text style={styles.pokemonName} numberOfLines={1}>
				{capitaLizeFirstLetter(data?.name)}
			</Text>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center',
		flexBasis: 100,
		flexGrow: 0,
		width: 100,
		height: 100,
		backgroundColor: '#e2e8f0',
		padding: 10,
		borderRadius: 12,
		margin: 10,
	},
	image: {
		width: '100%',
		height: '80%',
		resizeMode: 'contain',
	},
	pokemonName: {
		fontWeight: 'bold',
	},
});
