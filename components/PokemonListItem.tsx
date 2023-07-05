import { memo, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
	StyleSheet,
	Text,
	Image,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import useFetch from '../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import type { PokemonData } from './components.types';
import { capitaLizeFirstLetter } from '../utils/textUtils';
import { isPokemonFavorite } from '../utils/asyncStorage';

type PokemonListItemProps = {
	pokemonName: string;
	highlightFavorite: boolean;
};

export default memo(function PokemonListItem({
	pokemonName,
	highlightFavorite,
}: PokemonListItemProps) {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

	const { data, isLoading, error } = useFetch<PokemonData>(url);
	const [isFavorite, setIsFavorite] = useState(false);
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			async function checkFavorite() {
				const isFav = await isPokemonFavorite(pokemonName);
				setIsFavorite(isFav);
			}

			if (highlightFavorite) {
				checkFavorite();
			}
		}, [pokemonName, highlightFavorite])
	);

	if (error) return <p>Error: {error}</p>;

	return (
		<Pressable
			onPress={() =>
				navigation.navigate('PokemonDetails', {
					pokemonData: data,
				})
			}
			style={[styles.card, isFavorite && styles.favorite]}
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
	favorite: {
		borderWidth: 3,
		borderColor: '#FCD34D',
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
