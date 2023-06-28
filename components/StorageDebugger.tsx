import { Button, Text, View } from 'react-native';
import { getData, clearStorage } from '../utils/asyncStorage';

export default function StorageDebugger() {
	return (
		<View style={{ borderWidth: 2 }}>
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
