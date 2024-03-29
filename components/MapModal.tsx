import { Modal, Text, View, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode } from 'react';

type MapModalProps = {
	isVisible: boolean;
	children: ReactNode;
	title: string;
	onClose: () => void;
};

export default function MapModal({
	isVisible,
	children,
	onClose,
	title,
}: MapModalProps) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<Pressable
				style={styles.overlay}
				onPress={(e) => e.target === e.currentTarget && onClose()}
			>
				<View style={styles.modalContent}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{title}</Text>
						<Pressable onPress={onClose}>
							<Ionicons name="close-outline" size={22} />
						</Pressable>
					</View>
					{children}
				</View>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 },
	modalContent: {
		width: '100%',
		backgroundColor: '#fff',
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		position: 'absolute',
		bottom: 0,
		padding: 16,
	},
	titleContainer: {
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
