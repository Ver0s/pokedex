import MapView, { LongPressEvent, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

type Marker = {
	latitude: number;
	longitude: number;
};

// I can probably replace index when mapping and add
// a specific pokemon to the markers object

export default function PokemonMap() {
	const [markers, setMarkers] = useState<Marker[]>([]);

	function handleLongPress(e: LongPressEvent) {
		const markerCoords = e.nativeEvent.coordinate;
		setMarkers([...markers, markerCoords]);
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} onLongPress={handleLongPress}>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						coordinate={marker}
						onPress={() => console.log('dupa')}
					/>
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
