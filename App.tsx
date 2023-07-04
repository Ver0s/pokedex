import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemonList from './components/FavoritePokemonList';
import PokemonMap from './components/PokemonMap';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-get-random-values';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Pokédex"
				component={PokemonList}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Ionicons name="list" size={24} />
						) : (
							<Ionicons name="list-outline" size={24} />
						),
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={FavoritePokemonList}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Ionicons name="bookmark" size={24} />
						) : (
							<Ionicons name="bookmark-outline" size={24} />
						),
				}}
			/>
			<Tab.Screen
				name="Map"
				component={PokemonMap}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Ionicons name="map" size={24} />
						) : (
							<Ionicons name="map-outline" size={24} />
						),
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="PokemonDetails"
					component={PokemonDetails}
					options={{
						title: 'Pokemon Details',
						headerBackTitle: 'Back',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
