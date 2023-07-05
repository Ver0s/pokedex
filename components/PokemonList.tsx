import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import PokemonListItem from '../components/PokemonListItem';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';
import { PokemonResult } from './components.types';

type PokemonPage = {
	results: PokemonResult[];
};

const LIMIT = 20;

export default function PokemonList() {
	const [page, setPage] = useState(0);

	const [pokemonList, setPokemonList] = useState<PokemonResult[]>([]);
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${
		page * 20
	}&limit=${LIMIT}`;

	const { data, isLoading, error } = useFetch<PokemonPage>(url);

	function handleLoadMore() {
		if (!isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	}

	useEffect(() => {
		if (data) {
			setPokemonList([...pokemonList, ...data.results]);
		}
	}, [data]);

	if (error) return <p>There has been an error: {error}</p>;

	return (
		<View style={styles.container}>
			{pokemonList.length === 0 ? (
				<ActivityIndicator size="large" />
			) : (
				<FlatList
					data={pokemonList}
					renderItem={({ item }) => (
						<PokemonListItem
							pokemonName={item.name}
							highlightFavorite={true}
						/>
					)}
					keyExtractor={(item) => item.name}
					onEndReachedThreshold={0.05}
					onEndReached={handleLoadMore}
					ListFooterComponent={
						isLoading ? <ActivityIndicator size="small" /> : null
					}
					numColumns={3}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
