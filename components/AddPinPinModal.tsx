import MapModal from './MapModal';
import { TextInput, View, Button } from 'react-native';
import { useState } from 'react';

type AddPinModalProps = {
	isVisible: boolean;
	title: string;
	onClose: () => void;
	onAddPin: (name: string, notes: string) => void;
};

type FoundPokemon = {
	name: string;
	notes: string;
};

export default function AddPinModal({
	isVisible,
	title,
	onClose,
	onAddPin,
}: AddPinModalProps) {
	const [foundPokemonData, setFoundPokemonData] =
		useState<FoundPokemon | null>(null);

	return (
		<MapModal isVisible={isVisible} title={title} onClose={onClose}>
			<View style={{ gap: 10 }}>
				<TextInput
					placeholder="Name of the pokemon"
					style={{
						borderWidth: 1,
						borderColor: '#d1d5db',
						borderRadius: 8,
						padding: 8,
					}}
					onChangeText={(text) =>
						setFoundPokemonData({
							...foundPokemonData,
							name: text,
						})
					}
				/>
				<TextInput
					placeholder="Additional notes"
					multiline={true}
					textAlignVertical="top"
					style={{
						height: 100,
						borderWidth: 1,
						borderColor: '#d1d5db',
						borderRadius: 8,
						padding: 8,
					}}
					onChangeText={(text) =>
						setFoundPokemonData({
							...foundPokemonData,
							notes: text,
						})
					}
				/>
				<Button
					title="Add Pin"
					onPress={() => {
						onAddPin(
							foundPokemonData?.name,
							foundPokemonData?.notes
						);
					}}
				/>
			</View>
		</MapModal>
	);
}
