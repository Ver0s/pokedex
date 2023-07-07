import MapModal from './MapModal';
import { View, Text, Button } from 'react-native';
import type { MapPin } from './components.types';

type PinDetailsModalProps = {
	isVisible: boolean;
	title: string;
	onClose: () => void;
	onRemovePin: (pinId: string) => void;
	pinData: MapPin | null;
};

export default function PinDetailsModal({
	isVisible,
	title,
	onClose,
	pinData,
	onRemovePin,
}: PinDetailsModalProps) {
	if (!pinData) return null;

	return (
		<MapModal isVisible={isVisible} title={title} onClose={onClose}>
			<View style={{ marginBottom: 10, gap: 10 }}>
				<Text>Name: {pinData.name}</Text>
				<Text>Notes: {pinData.notes}</Text>
				<Text>Coordinates:</Text>
				<Text>
					{pinData.coords.latitude}, {pinData.coords.longitude}
				</Text>
			</View>
			<Button
				title="Remove pin"
				color="#dc2626"
				onPress={() => onRemovePin(pinData.id)}
			/>
		</MapModal>
	);
}
