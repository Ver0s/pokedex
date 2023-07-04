import MapView, { LongPressEvent, Marker } from 'react-native-maps';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import AddPinModal from './AddPinPinModal';
import PinDetailsModal from './PinDetailsModal';
import type { MapPin } from './components.types';

export default function PokemonMap() {
	const [pins, setPins] = useState<MapPin[]>([]);
	const [currentPin, setCurrentPin] = useState<MapPin | null>(null);

	// Think about combining these two states into one object
	const [isAddPinModalVisible, setIsAddPinModalVisible] = useState(false);
	const [isPinDetailsModalVisible, setIsPinDetailsModalVisible] =
		useState(false);

	function handleLongPress(e: LongPressEvent) {
		const { coordinate } = e.nativeEvent;

		setIsAddPinModalVisible(true);
		setCurrentPin({
			id: uuidv4(),
			name: '',
			notes: '',
			coords: { ...coordinate },
		});
	}

	function handleCloseModal() {
		setIsAddPinModalVisible(false);
		setIsPinDetailsModalVisible(false);
	}

	function handlePinPress(pinId: string) {
		const pin = pins.find((pin) => pin.id === pinId);
		if (!pin) {
			throw new Error('Pin not found!');
		}
		setCurrentPin(pin);
		setIsPinDetailsModalVisible(true);
	}

	function handleAddPin(name: string, notes: string) {
		if (!currentPin) {
			throw new Error('Current marker is not set!');
		}

		const updatedPin = {
			...currentPin,
			name: name,
			notes: notes,
			coords: { ...currentPin.coords },
		};

		setPins([...pins, updatedPin]);
		setIsAddPinModalVisible(false);
	}

	function handleRemovePin(pinId: string) {
		const updatedPins = pins.filter((pin) => pin.id !== pinId);
		setPins(updatedPins);
		setIsPinDetailsModalVisible(false);
	}

	return (
		<View style={styles.container}>
			<AddPinModal
				isVisible={isAddPinModalVisible}
				onClose={handleCloseModal}
				title="Add pin for found pokemon"
				onAddPin={handleAddPin}
			/>
			<PinDetailsModal
				isVisible={isPinDetailsModalVisible}
				onClose={handleCloseModal}
				title="Pin details"
				pinData={currentPin}
				onRemovePin={handleRemovePin}
			/>
			<MapView style={styles.map} onLongPress={handleLongPress}>
				{pins.map((pin) => (
					<Marker
						key={pin.id}
						coordinate={pin.coords}
						onPress={() => handlePinPress(pin.id)}
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
